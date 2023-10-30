import React, {useState} from "react"
import "./chatbot.css"
import CK from "./CK.png"
import Joey from "./joey.jpg"

const Chatbot = ({updateUser, setLoginUser}) => {


  const logout = () => {
    localStorage.removeItem('MyUser'); // Remove user data from localStorage
   setLoginUser(null)// Reset the user state to null
  };
const API_KEY = process.env.REACT_APP_OPEN_API_KEY;
const [isTyping, setIsTyping] = useState(false);

const [messages, setMessages] = useState([
//   {
//   role: "system",
//   content:
//   "Hi, I am Chatty Kathy. What do you want to talk about?",
//   },
 

    // ...

  ]);

  const response = async () =>{
    await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
      
        messages: [...messages, { "role": "user", "content": "This is a test!" }],
        temperature: 0.7,
      }),
    }
  )};
  const handleSendMessage = (messageContent) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: messageContent },
    ]);
  //invoke chatData
    chatData(messageContent);
    setIsTyping(true)
  };
  const chatData = async (userMessage) => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [...messages, { role: "user", content: userMessage }],
            temperature: 0.7,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Oops! Something went wrong while processing your request.");
      }
  
      const responseData = await response.json();
      setIsTyping(false)
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: responseData.choices[0].message.content,
        },
      ]);
    } catch (error) {
      console.error("Error while fetching chat data:", error);
      setIsTyping(false)
    }
  };
  return (
    <div className="chat-container">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.role === "user" ? "user" : "assistant"}`}
        >
          {message.role === "user" && (
            <div className="avatar user-avatar">
              <img src={Joey
            } alt="User Avatar" />
            </div>
          )}
          <div
            className={`message-bubble ${
              message.role === "assistant" ? "assistant-bubble" : ""
            }`}
          >
               <p>{message.content}</p>
          </div>
          
          {message.role === "assistant" && !isTyping && (
            <div className="avatar assistant-avatar-outside">
              <img src={CK} alt="Assistant Avatar" />
              </div>
            
          )}
        </div>
      ))}
      {isTyping && (
        <div className="message assistant-bubble">
          <p>Chatty Kathy is typing...</p>
        </div>
      )}
     <div className="input-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.target.input.value;
            if (input.trim() !== "") {
              handleSendMessage(input, "user");
              e.target.reset();
            }
          }}
          aria-label="Chat Input Form"
        >
          <input type="text" name="input" placeholder="Type your message..." /
          <button type="submit" className="btn btn-secondary">Send</button>
        </form>
      </div>

      <button type="button" onClick={logout}>Logout</button>
      
    </div>
  );
};

export default Chatbot;