import { Message } from "../../hook/useMessages";
import "./MessageBox.scss";

const MessageBox = ({ message }: { message: Message }) => {
    return <li className="messageBox">
        <img className="avatar" src={message.photoUrl} alt="profile image" />
        <h3>{message.displayName}</h3>
        <p>{message.text}</p>
    </li>;
}

export default MessageBox;