#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function usage() {
  console.log('Usage: node scripts/generate-tiktok-video.js <baseVideo> <image> <output> [tailSeconds] [fadeSeconds]');
  console.log('');
  console.log('Example:');
  console.log('  node scripts/generate-tiktok-video.js media/base.mp4 media/donor_wall.jpg media/tiktok_output.mp4 3 1');
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length < 3) {
  usage();
}

const baseVideo = args[0];
const imagePath = args[1];
const outputVideo = args[2];
const tailSeconds = args[3] ? Number(args[3]) : 3;
const fadeSeconds = args[4] ? Number(args[4]) : 1;

if (!fs.existsSync(baseVideo)) {
  console.error(`Base video not found: ${baseVideo}`);
  process.exit(1);
}

if (!fs.existsSync(imagePath)) {
  console.error(`Image not found: ${imagePath}`);
  process.exit(1);
}

function runCapture(cmd) {
  try {
    return execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();
  } catch (err) {
    console.error('Error running command:', cmd);
    console.error(err.stderr ? err.stderr.toString() : err.message);
    process.exit(1);
  }
}

function run(cmd) {
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (err) {
    console.error('Error running command:', cmd);
    process.exit(err.status || 1);
  }
}

// Get base video duration (in seconds, float)
const durationStr = runCapture(
  `ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "${baseVideo}"`
);
const baseDuration = parseFloat(durationStr);
if (!Number.isFinite(baseDuration)) {
  console.error('Could not determine base video duration.');
  process.exit(1);
}

const fade = Math.max(0.1, fadeSeconds);
const tail = Math.max(fade, tailSeconds);
const offset = Math.max(0, baseDuration - fade);

const outDir = path.dirname(outputVideo);
if (outDir && outDir !== '.' && !fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const tailVideo = path.join(outDir || '.', '_donor_tail_tmp.mp4');

console.log(`Base duration: ${baseDuration.toFixed(2)}s, tail: ${tail}s, fade: ${fade}s, offset: ${offset.toFixed(2)}s`);

// 1) Create tail video from image
const tailCmd =
  `ffmpeg -y -loop 1 -i "${imagePath}" ` +
  `-t ${tail} -r 30 ` +
  `-vf "scale=1080:1920:force_original_aspect_ratio=cover,format=yuv420p" ` +
  `-c:v libx264 -pix_fmt yuv420p "${tailVideo}"`;

run(tailCmd);

// 2) Crossfade base video into tail
const mergeCmd =
  `ffmpeg -y -i "${baseVideo}" -i "${tailVideo}" ` +
  `-filter_complex ` +
  `"[0:v]scale=1080:1920:force_original_aspect_ratio=decrease,` +
  `pad=1080:1920:(1080-iw)/2:(1920-ih)/2:black,setsar=1[v0]; ` +
  `[1:v]scale=1080:1920:force_original_aspect_ratio=cover,setsar=1[v1]; ` +
  `[v0][v1]xfade=transition=fade:duration=${fade}:offset=${offset}[v]" ` +
  `-map "[v]" -map 0:a? ` +
  `-c:v libx264 -c:a aac -pix_fmt yuv420p -shortest "${outputVideo}"`;

run(mergeCmd);

try {
  if (fs.existsSync(tailVideo)) {
    fs.unlinkSync(tailVideo);
  }
} catch (err) {
  // ignore cleanup errors
}

console.log('Done. TikTok video created at:', outputVideo);