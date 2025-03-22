
export interface ChatInputProps {
    socket?: WebSocket
}
export interface Message{
    Id?: string;
    Text: string;
    Timestamp?: string;
    Incoming? : boolean;
}
