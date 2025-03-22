import {createWebsocket} from "../../routes/websocket.tsx";
import {useEffect, useRef, useState} from "react";
import ChatHistory from "./ChatHistory.tsx";
import ChatInput from "./ChatInput.tsx";
import {Message} from "../../utilities/props.tsx";

const ChatComponent = () => {
    const socketRef = useRef<WebSocket | null>(null);
    const [history, setHistory] = useState<Message[]>([]);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        socketRef.current = createWebsocket({
            url: "ws://localhost:8080/ws-chat",
            onMessage : onMessage,onOpen : onOpen,onClose : onClose,onError : onError});

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                setIsConnected(false);
            }
        };
    }, []);

    const onMessage = (data: string) => {
        console.log("OnMessage", data);
        const msg = JSON.parse(data);
        setHistory(prevHistory => [...prevHistory, msg]);
        console.log(data);
    }
    const onOpen = () => {
        setIsConnected(true);
        console.log("onOpen");
    }
    const onClose = () => {
        setIsConnected(false);
        console.log("onClose");
    }
    const onError = (e: Event) => {
        setIsConnected(false);
        console.error(e);
    }

    const onSendMessage = (msg: Message) => {
        setHistory(prevHistory => [...prevHistory, msg]);
    }


    return (
        <>
            <ChatHistory history={history}/>
            {isConnected ?
                <ChatInput socket={socketRef.current} onSendMessage={onSendMessage} /> :
                <p>Connecting to chat server...</p>
            }
        </>
    );
}

export default ChatComponent;