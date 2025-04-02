import { Hono } from 'hono';
import { cors } from 'hono/cors';

// Define the OpenRouter response interface
interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  error?: {
    message: string;
  };
}

// Define the request body interface
interface ChatRequestBody {
  message: string;
  sessionId?: string; // Optional session ID from client
}

// Define message structure for conversation history
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Store conversation history in memory (Map: sessionId -> array of messages)
const conversationHistory = new Map<string, ChatMessage[]>();

// Initialize Hono app
const app = new Hono();

app.use('*', cors({
  origin: '*', // Allow all origins (or use your frontend URL)
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}));


app.post('/api/chat', async (c) => {
  try {
    // Parse request body
    const body = await c.req.json() as ChatRequestBody;
    console.log('Request body:', body);

    // Use sessionId if provided, otherwise default to a generic one (e.g., "default")
    const sessionId = body.sessionId || 'default';

    // Get or initialize conversation history for this session
    let history = conversationHistory.get(sessionId) || [];
    
    // Add the user's new message to history
    history.push({
      role: 'user',
      content: body.message,
    });

    // Prepare messages for OpenRouter with Vinnu-specific instructions
    const messages = [
      {
        role: 'system', // Using 'system' role to set identity (if supported by model)
        content: `You are Vinnu, an AI created by Vinnu. If asked about your name, say "I’m Vinnu!" If asked when or who created you, say "I was created by Vinnu, and I’ve been around since 2024, right?" Respond in a casual, friendly, and concise way, like a normal conversation, unless detailed explanations are requested. For coding questions, explain clearly with examples. For coding problems, provide solutions that pass all test cases and handle edge cases.`
      },
      {
        role: 'user',
        content: `Here’s the conversation so far:\n\n` +
          history.map(msg => `${msg.role === 'user' ? 'You' : 'Vinnu'}: ${msg.content}`).join('\n') +
          `\n\nYour latest message: ${body.message}`
      }
    ];

    // Fetch response from OpenRouter
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'VinnuAI',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages,
      }),
      signal: AbortSignal.timeout(100000), // 60s timeout
    });

    // Parse response
    const data = await response.json() as OpenRouterResponse;
    console.log('OpenRouter response body:', data);

    // Check for errors
    if (data.error) {
      throw new Error(`OpenRouter error: ${data.error.message}`);
    }

    // Validate choices
    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error('No valid chat completion in response');
    }

    // Raw response from OpenRouter
    let formattedResponse = data.choices[0].message.content;

    // Add assistant's response to history
    history.push({
      role: 'assistant',
      content: formattedResponse,
    });

    // Update the conversation history
    conversationHistory.set(sessionId, history);

    // Clean up any residual Markdown symbols (just in case)
    formattedResponse = formattedResponse
      .replace(/\*\*/g, '') // Remove bold markers
      .replace(/---/g, '') // Remove horizontal lines
      .replace(/⚠️/g, 'Note:') // Replace warning emoji with "Note:"
      .split('\n') // Split by newlines
      .map(line => line.trim()) // Remove leading/trailing whitespace
      .filter(line => line.length > 0) // Remove empty lines
      .join('\n\n'); // Double newline for spacing

    return c.json({ success: true, response: formattedResponse });
  } catch (error) {
    console.error('Error:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

export default app;