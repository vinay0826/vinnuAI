import { ChatResponse } from '../types/chat';

export async function sendMessage(message: string): Promise<string> {
  try {
    const response = await fetch('https://backend.nalagatlavinay26.workers.dev/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: ChatResponse = await response.json();

    if (!data.success || !data.response) {
      throw new Error(data.error || 'No response received');
    }

    return data.response;
  } catch (error) {
    throw new Error(`Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}