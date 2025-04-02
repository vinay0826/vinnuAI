import { useState } from 'react';
import { ChatMessage } from './types/chat';
import { sendMessage } from './api/chat';
import './chatpage.css';

export function Chatpage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessage(input);
      const assistantMessage: ChatMessage = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const renderTextWithCode = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      const isCode = line.includes(';') || line.includes('{') || line.includes('}') || line.match(/^\s*(int|char|float|double)/);
      return (
        <p key={index} className="chat-message-paragraph">
          {isCode ? <code>{line}</code> : line}
        </p>
      );
    });
  };

  return (
    <div className="chat-app">
       <h1 className="title">
          <span>V</span>
          <span>I</span>
          <span>N</span>
          <span>N</span>
          <span>U</span>
          <span className="text-highlight">AI</span>
        </h1>
      
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`chat-message ${msg.role === 'user' ? 'chat-user-message' : 'chat-assistant-message'}`}
          >
            {renderTextWithCode(msg.content)}
          </div>
        ))}
        {isLoading && <div className="chat-loading">vinnuAI thinking might take 30s</div>}
        {error && <div className="chat-error">{error}</div>}
      </div>

      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="chat-input-field"
        />
        <button type="submit" disabled={isLoading} className="chat-send-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chatpage;