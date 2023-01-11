import { User } from "firebase/auth";
import { memo, useCallback, useContext, useState } from "react";
import useMessages, { Message } from "../../hook/useMessages";
import { AuthContext } from "../../lib/context";
import MessageBox from "../MessageBox";

import "./Chat.scss";

const SendMessage = memo(({ sendMessage, sending }: { sendMessage(message: string): void, sending: boolean, user: User }) => {
    const [messageValue, setMessageValue] = useState("");

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMessage(messageValue);
        setMessageValue("");
    }, [sendMessage, messageValue]);

    return <form onSubmit={onSubmit}>
        <input type={"text"} placeholder="Message..." value={messageValue} onChange={(e) => setMessageValue(e.target.value)} />
        <button disabled={sending || !messageValue.length} type="submit">SEND</button>
    </form>;
});

const Chat = () => {
    const { user } = useContext(AuthContext);
    const { messages, sendMessage, sending } = useMessages();

    return user && <div className="chat">
        <p className="userName">{user.displayName}</p>
        <ul className="messageList">
            {
                messages.map(message => {
                    return <MessageBox key={message.id} message={message} />
                })
            }
        </ul>
        <SendMessage sendMessage={sendMessage} sending={sending} user={user} />
    </div>;
}

export default memo(Chat);