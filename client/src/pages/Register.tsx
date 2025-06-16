import { redirect, useNavigate } from "react-router-dom"
import { loginReq, registerReq } from "../api/api"
import { useState } from "react";
//import type Context from "../support/Context";

//export default function Register(props: {ctx: Context}) {
export default function Register(props: {setToken: (t: string) => void}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errEn, setErrEn] = useState(false);
    const navigate = useNavigate();

    const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrEn(false);
        try {
            let res = await registerReq({username: username, password: password});
            console.log(res);
            if(res.status >= 200 && res.status < 300) {
                res = await loginReq({username: username, password: password});
                console.log(res);
                if(res.status >= 200 && res.status < 300) {
                    props.setToken(res.data.token);
                    navigate("/overview");
                    return;
                }
                navigate("/login");
                return;
            }
            setErrEn(true);
        }
        catch {
            //alert("Cannot connect to the server");
            setErrEn(true);
        }
    }

    return (
        <div>
            <h3>Register</h3>
            <form onSubmit={submit}>
                <label htmlFor="username_input">Username:</label>
                <input id="username_input" placeholder="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <br/>
                <label htmlFor="password_input">Password:</label>
                <input id="password_input" placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <br />
                <button type="submit">Register</button>
            </form>
            <div style={errEn ? {display: "block"} : {display: "none"}}>
                <span>Provided credentials are incorrect</span>
            </div>
        </div>
    )
}
