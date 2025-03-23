import {Message} from "../../utilities/props.tsx";

interface ChatHistoryProps {
    history?: Message[]
}

const ChatHistory = (props: ChatHistoryProps) => {
    return (
        <div className="p-4 rounded-lg bg-gray-100 max-w-md mx-auto h-96 flex flex-col">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 px-3 py-2 bg-teal-600 text-white rounded-t-lg">Chat History</h2>
            <div className="flex-1 overflow-y-auto p-3 bg-[url('https://i.pinimg.com/originals/ab/ab/60/abab60f06ab52fa973e035fdc233439b.jpg')] bg-repeat">
                {props?.history && props.history.map((msg: Message, index: number) => {
                    const isIncoming = msg.Incoming; // Check if the message is incoming
                    return (
                        <div key={msg.Id || index}
                             className={`mb-3 p-2 rounded-lg max-w-xs ${isIncoming ? 'bg-gray-200 border-gray-300' : 'bg-teal-600 text-white border-teal-700'} shadow-sm relative`}
                             style={{
                                 borderRadius: '8px',
                                 position: 'relative',
                                 marginLeft: !isIncoming ? '1rem' : 'auto', // Incoming messages on the right, outgoing on the left
                                 marginRight: !isIncoming ? 'auto' : '1rem', // Outgoing messages have margin on the left
                             }}>
                            <p className="text-gray-800 mb-1">{msg.Text}</p>
                            <small className="text-gray-500 text-xs block text-right">
                                {msg.Timestamp}
                            </small>
                        </div>
                    )
                })}
            </div>
        </div>

    );
}

export default ChatHistory;