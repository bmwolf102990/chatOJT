import React, {useState} from "react"
import Message from "../messaging/Message"

const UserInput = () => {
    const [input, setInput] = useState("")
    const [userText, setUserText] = useState("")
    const [chat, setChat]=useState(false)

    const handleClick = () => {
        setUserText(input)
        setInput("")
        setChat(true)
    }


    return (
        <>
        <div>
           
            {chat && <Message text={userText}/> }
            
            <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} />

            <button type="submit" value="submit" onClick={handleClick}>Submit</button>
        </div>
        
        </>
    )
}

export default UserInput