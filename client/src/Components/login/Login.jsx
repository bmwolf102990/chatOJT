import React, {useState} from "react"
import "./login.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = ({setLoginUser}) => {

    const history = useNavigate()

    const [ user, setUser] = useState({
        email:"",
        password:""
    })
    const updateUser = (user) => {
        localStorage.setItem("MyUser", JSON.stringify(user))
        setLoginUser(user)
      }
    
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:5000/login", user)
        .then(res => {
            alert(res.data.message)
            updateUser(res.data.user)
            history("/")
        })
    }

    return (
        <div className="login-container">
        <div className="login">
           
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => history("/register")}>Register</div>
        </div>
        </div>
    )
}

export default Login