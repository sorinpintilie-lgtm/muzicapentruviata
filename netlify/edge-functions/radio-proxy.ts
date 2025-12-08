export default async (request: Request) => {
  try {
    const streamUrl = 'http://89.238.227.6:8344/;stream/1'

    const response = await fetch(streamUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'audio/mpeg, audio/*',
      },
    })

    if (!response.ok) {
      return new Response('Stream unavailable', { status: 503 })
    }

    return new Response(response.body, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    return new Response('Error connecting to stream', { status: 503 })
  }
}

export const config = { path: '/api/radio-proxy' }