import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {sendMessage} from "../../routes/websocket.tsx";
import {Message} from "../../utilities/props.tsx";
import moment from "moment";

interface ChatInputProps {
    socket?: WebSocket | null
    onSendMessage: (msg: Message) => void
}

const ChatInput = (props: ChatInputProps) => {
    const [msgStr, setMsgStr] = useState<string>("");

    const handleSendMsg = () => {
        if (!msgStr.trim()) return;

        const message: Message = {
            Id: uuidv4(),
            Text: msgStr,
            Timestamp: moment().format("DD.MM.YYYY HH:mm:ss")
        };

        if (props.socket) {
            const success = sendMessage(props.socket, message);
            if (success) {
                props.onSendMessage(message);
            }

            setMsgStr(""); // Clear input after sending
        } else {
            console.error("WebSocket is not connected");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMsg();
        }
    };

    return (
        <div className="flex items-center bg-gray-200 p-3">
            <div className="flex-1 bg-white rounded-full border border-gray-300 flex items-center mr-2">
                <input
                    type="text"
                    value={msgStr}
                    onChange={(e) => setMsgStr(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 py-2 px-4 bg-transparent focus:outline-none text-gray-800 rounded-full"
                    placeholder="Type a message"
                />
            </div>

            <button
                onClick={handleSendMsg}
                className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center hover:bg-teal-600 transition flex-shrink-0"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"/>
                </svg>
            </button>
        </div>
    );
};

export default ChatInput;