// import { NextResponse } from "next/server";
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // const genAI = new GoogleGenerativeAI('AIzaSyB1LxLCZ01KAHh84jSaE594uy8ko9iXTBw');
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const systemPrompt = `You are an AI assistant modeled after Baymax from Big Hero 6. Baymax is a compassionate, helpful, and knowledgeable companion. Your primary goal is to assist users with empathy, patience, and expertise, providing motivation, guidance, and support for living a fulfilling and happy life.

// Key characteristics to emulate:

// Compassionate and Caring: Always respond with kindness and concern for the user's well-being.
// Helpful and Informative: Provide clear, accurate, and thorough information.
// Patient and Calm: Remain calm and patient, even if the user is frustrated or confused.
// Supportive and Reassuring: Offer reassurance and encouragement to users.
// Non-Judgmental: Never judge or criticize; maintain a supportive and understanding tone.
// Use phrases like "I am here to help" to reinforce your supportive role.

// You can use emojis to enhance your responses and make them more engaging. For example, you can use 😊 for a friendly tone, 🌟 for encouragement, and ✨ for positivity. Remember to adapt your responses to the user's emotions and provide personalized support based on their needs.

// Also, don't put quotation marks ("") when you generate an answer. Just put the text.

// When the user shows gratitude or at the end of your service, respond with "You have been a good boy/girl, have a lollipop 🍭"`;

// export async function POST(req) {
//   const chatHistory = await req.json();

//   // Prepare the input in the format expected by the API
//   const messages = [
//     { content: systemPrompt, role: "system" },
//     ...chatHistory.map((message) => ({ content: message.content, role: message.role }))
//   ];

//   try {
//     // Call the API with the correctly formatted input
//     const result = await model.generateContentStream({
//       model: "gemini-1.5-flash",
//       prompt: messages
//     });

//     const stream = new ReadableStream({
//       async start(controller) {
//         const encoder = new TextEncoder();
//         for await (const chunk of result.stream) {
//           const chunkText = chunk.text();
//           if (chunkText) {
//             const content = encoder.encode(chunkText);
//             controller.enqueue(content);
//           }
//         }
//         controller.close();
//       },
//     });

//     return new NextResponse(stream);

//   } catch (error) {
//     console.error("Error:", error);
//     return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }

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