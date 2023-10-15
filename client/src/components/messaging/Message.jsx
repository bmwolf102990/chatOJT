import React from "react"
import "./message.css"




const Message = ({text}) => {
    return (
        <div className="chat-text">{text}</div>
    );
};

export default Message


