//import type Context from "../support/Context";

export default function Overview(props: {token: string}) {
    if(props.token.length <= 0)
        return (
            <div>
                <span>You are not logged in. To view data you have to be logged in</span>
            </div>
        );
    return (
        <div>
            {props.token}
        </div>
    );
}
