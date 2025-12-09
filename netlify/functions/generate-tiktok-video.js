const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const execAsync = promisify(exec);

/**
 * Netlify Function: generate-tiktok-video
 *
 * POST /.netlify/functions/generate-tiktok-video
 * Body (JSON):
 * {
 *   "imageData": "data:image/jpeg;base64,...",  // required
 *   "donorName": "Name Surname",               // optional (used for filename)
 *   "baseVideoUrl": "https://...",             // optional, or use env BASE_VIDEO_URL
 *   "tailSeconds": 3,                          // optional, default 3
 *   "fadeSeconds": 1,                          // optional, default 1
 *   "introSeconds": 8                          // optional, default 8 (white intro)
 * }
 *
 * Response:
 * - 200 video/mp4 binary, with Content-Disposition attachment
 */
exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }

    let payload;
    try {
      payload = JSON.parse(event.body || '{}');
    } catch (e) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid JSON body' })
      };
    }

    const { imageData, donorName, baseVideoUrl, tailSeconds, fadeSeconds } = payload;

    if (!imageData) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'imageData (data URL) is required' })
      };
    }

    const BASE_VIDEO_URL = baseVideoUrl || process.env.BASE_VIDEO_URL;
    const introSec = Number.isFinite(introSeconds) ? introSeconds : 8;
    const tailSec = Number.isFinite(tailSeconds) ? tailSeconds : 3;
    const fadeSec = Number.isFinite(fadeSeconds) ? fadeSeconds : 1;

    // If no base video, generate a white intro
    const useWhiteIntro = !BASE_VIDEO_URL;

    // Decode data URL
    const match = imageData.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!match) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid imageData format. Expected data URL.' })
      };
    }

    const mimeType = match[1]; // e.g. image/jpeg
    const base64Data = match[2];

    const ext = mimeType === 'image/png' ? 'png' : 'jpg';
    const safeName =
      (donorName || 'donor')
        .normalize('NFKD')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '_')
        .toLowerCase() || 'donor';

    // Use /tmp in serverless environment
    const tmpDir = '/tmp';
    const imagePath = path.join(tmpDir, `${safeName}_frame.${ext}`);
    const baseVideoPath = path.join(tmpDir, 'base_video.mp4');
    const tailVideoPath = path.join(tmpDir, `${safeName}_tail.mp4`);
    const outPath = path.join(tmpDir, `${safeName}_tiktok.mp4`);

    // Write image file
    fs.writeFileSync(imagePath, Buffer.from(base64Data, 'base64'));

    // Download base video
    const fetchImpl = (typeof fetch !== 'undefined') ? fetch : null;
    if (!fetchImpl) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'fetch is not available in this runtime' })
      };
    }

    const baseRes = await fetchImpl(BASE_VIDEO_URL);
    if (!baseRes.ok) {
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'Failed to download baseVideoUrl',
          status: baseRes.status,
          statusText: baseRes.statusText
        })
      };
    }

    const baseBuf = Buffer.from(await baseRes.arrayBuffer());
    fs.writeFileSync(baseVideoPath, baseBuf);

    // Read base duration using ffprobe
    const durationCmd = `ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "${baseVideoPath}"`;
    const { stdout: durationOut } = await execAsync(durationCmd);
    const baseDuration = parseFloat(durationOut.trim());
    if (!Number.isFinite(baseDuration)) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Could not determine base video duration via ffprobe' })
      };
    }

    const fade = Math.max(0.2, fadeSec);
    const tail = Math.max(fade, tailSec);
    const offset = Math.max(0, baseDuration - fade);

    // 1) Create tail video from image
    const tailCmd =
      `ffmpeg -y -loop 1 -i "${imagePath}" ` +
      `-t ${tail} -r 30 ` +
      `-vf "scale=1080:1920:force_original_aspect_ratio=cover,format=yuv420p" ` +
      `-c:v libx264 -pix_fmt yuv420p "${tailVideoPath}"`;

    await execAsync(tailCmd);

    // 2) Crossfade base video into tail
    const mergeCmd =
      `ffmpeg -y -i "${baseVideoPath}" -i "${tailVideoPath}" ` +
      `-filter_complex ` +
      `"[0:v]scale=1080:1920:force_original_aspect_ratio=decrease,` +
      `pad=1080:1920:(1080-iw)/2:(1920-ih)/2:black,setsar=1[v0]; ` +
      `[1:v]scale=1080:1920:force_original_aspect_ratio=cover,setsar=1[v1]; ` +
      `[v0][v1]xfade=transition=fade:duration=${fade}:offset=${offset.toFixed(2)}[v]" ` +
      `-map "[v]" -map 0:a? ` +
      `-c:v libx264 -c:a aac -pix_fmt yuv420p -shortest "${outPath}"`;

    await execAsync(mergeCmd);

    const outBuf = fs.readFileSync(outPath);
    const fileName = `${safeName}_muzica_pentru_viata.mp4`;

    // Cleanup (best-effort)
    try {
      [imagePath, baseVideoPath, tailVideoPath].forEach((p) => {
        if (fs.existsSync(p)) fs.unlinkSync(p);
      });
    } catch (_e) {
      // ignore cleanup errors
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="${fileName}"`
      },
      body: outBuf.toString('base64'),
      isBase64Encoded: true
    };
  } catch (err) {
    console.error('generate-tiktok-video error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error', details: String(err.message || err) })
    };
  }
};