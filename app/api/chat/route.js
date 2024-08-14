import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI('AIzaSyB1LxLCZ01KAHh84jSaE594uy8ko9iXTBw');

export async function POST(req) {
  try {
    const { message } = await req.json();

    // Initialize a chat model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Start a chat session
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    // Send the message to Gemini and get the response
    const result = await chat.sendMessage(message);
    const response = result.response;

    // Return the response
    return new Response(JSON.stringify({ message: response.text() }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process the request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
