import {createWebsocket} from "../../routes/websocket.tsx";
import {useEffect, useRef, useState} from "react";
import ChatHistory from "./ChatHistory.tsx";
import ChatInput from "./ChatInput.tsx";
import {Message} from "../../utilities/props.tsx";
import ChatBar from "./ChatBar.tsx";

const ChatComponent = () => {
    const socketRef = useRef<WebSocket | null>(null);
    const [history, setHistory] = useState<Message[]>([]);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [systemMessage, setSystemMessage] = useState<string | null>(null);

    useEffect(() => {
        socketRef.current = createWebsocket({
            url: import.meta.env.VITE_CHATGO_WEBSOCKET_URL,
            onMessage: onMessage,
            onOpen: onOpen,
            onClose: onClose,
            onError: onError
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                setIsConnected(false);
            }
        };
    }, []);

    const onMessage = (data: string) => {
        const msg = JSON.parse(data);
        if (!msg.system_message) {
            setSystemMessage(null)
            setHistory(prevHistory => [...prevHistory, msg]);
        }
        setSystemMessage(msg.text);
    }

    const onOpen = () => {
        setIsConnected(true);
        console.log("onOpen");
    }

    const onClose = () => {
        setIsConnected(false);
        setSystemMessage(null)
        console.log("onClose");
    }

    const onError = (e: Event) => {
        setIsConnected(false);
        console.error(e);
    }

    const onSendMessage = (msg: Message) => {
        setSystemMessage(null)
        setHistory(prevHistory => [...prevHistory, msg]);
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col w-full max-w-2xl h-5/6 mx-auto rounded-lg overflow-hidden shadow-xl bg-white">
                <ChatBar />
                <p className="text-xs text-gray-500 italic text-center">{systemMessage}</p>
                <ChatHistory history={history}/>
                {isConnected ?
                    <ChatInput socket={socketRef.current} onSendMessage={onSendMessage}/> :
                    <div className="p-4 bg-gray-100 text-center">
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
                            <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                            <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                            <span className="text-gray-600 ml-2">Connecting to chat server...</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default ChatComponent;