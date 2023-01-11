import { useCallback, useContext, useEffect, useState } from "react";
import { collection, doc, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { AuthContext } from "../lib/context";

export type Message = {
    text: string;
    uid: string;
    displayName?: string;
    photoUrl?: string;
    id?: string;
}

const COLLECTION_NAME = "messages";
const messagesRef = collection(db, COLLECTION_NAME);

const useMessages = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [sending, setSending] = useState(false);
    const { user } = useContext(AuthContext);

    const sendMessage = useCallback((text: string) => {
        if (!user) {
            return;
        }
        
        setSending(true);
        setDoc(doc(messagesRef), {
            text,
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL,
            createAt: serverTimestamp()
        }).catch((e) => alert(e.message)).finally(() => setSending(false));
    }, [user]);

    useEffect(() => {
        const q = query(messagesRef, orderBy("createAt", "desc"), limit(20));
        const unsub = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => {
                const data = doc.data();
                const message: Message = {
                    text: data.text,
                    uid: data.uid,
                    photoUrl: data.photoUrl,
                    displayName: data.displayName,
                    id: doc.id
                }
                return message;
            }));
        });

        return unsub;
    }, []);

    return { messages, sending, sendMessage };
}

export default useMessages;