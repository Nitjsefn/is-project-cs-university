import { redirect } from "react-router-dom"
import { loginReq } from "../api/api"
import { useState } from "react";
import type Context from "../support/Context";

export default function Login(props: {ctx: Context}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errEn, setErrEn] = useState(false);

    const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrEn(false);
        try {
            const res = await loginReq({username: username, password: password});
            console.log("test");
            if(res.status == 200) {
                props.ctx.setAuthToken(res.data.token);
                redirect("/overview");
                return;
            }
            setErrEn(true);
        }
        catch {
            alert("Cannot connect to the server");
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
