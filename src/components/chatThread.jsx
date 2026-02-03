import { User } from "lucide-react";
import ReactMarkdown from "react-markdown";

const Message = ({ role, parts }) => {
  // ✅ Extract text from AI SDK 5.0 parts array
  const textContent =
    parts
      ?.filter((part) => part.type === "text")
      ?.map((part) => part.text)
      ?.join("") || "";

  return (
    <div className="message-wrapper">
      {role === "user" ? (
        <div className="user-avatar">
          <User className="user-avatar-icon" strokeWidth={1.5} />
        </div>
      ) : (
        <div className="ai-avatar">AI</div>
      )}
      <div className="message-content-wrapper">
        <span className="message-send">
          {role === "user" ? "you" : "AI Assistant"}
        </span>
        <div
          className={`message-content ${
            role === "user" ? "user-message-bg" : "ai-message-bg"
          }`}
        >
          <div className="markdown-content">
            <ReactMarkdown>{textContent}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatThread = ({ messages, status, chatThreadRef }) => {
  const welcomeMessage = {
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "👋 Hello! I'm Miss Bloopy, your AI assistant. How can I help you?",
      },
    ],
  };

  return (
    <div ref={chatThreadRef} className="message-container">
      {messages.length === 0 ? (
        <Message {...welcomeMessage} />
      ) : (
        messages.map((message) => <Message key={message.id} {...message} />)
      )}

      {status === "streaming" && ( // ✅ FIXED: "submitted" → "streaming"
        <div className="thinking-row">
          <div className="ai-avatar">AI</div>
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatThread;
