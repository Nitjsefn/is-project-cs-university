import { redirect, useNavigate } from "react-router-dom"
import { loginReq } from "../api/api"
import { useState } from "react";
//import type Context from "../support/Context";

//export default function Login(props: {ctx: Context}) {
export default function Login(props: {setToken: (t: string) => void}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errEn, setErrEn] = useState(false);

    const navigate = useNavigate();

    const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrEn(false);
        try {
            const res = await loginReq({username: username, password: password});
            if(res.status >= 200 && res.status < 300) {
                props.setToken(res.data.token);
                navigate("/overview");
                return;
            }
            setErrEn(true);
        }
        catch (e){
            console.log(e);
            //alert("Cannot connect to the server");
            setErrEn(true);
        }
    }
    return (
        <div>
            <form onSubmit={submit}>
                <label htmlFor="username_input">Username:</label>
                <input id="username_input" placeholder="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <br/>
                <label htmlFor="password_input">Password:</label>
                <input id="password_input" placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Log In</button>
            </form>
            <div style={errEn ? {display: "block"} : {display: "none"}}>
                <span>Provided credentials are incorrect</span>
            </div>
        </div>
    )
}
