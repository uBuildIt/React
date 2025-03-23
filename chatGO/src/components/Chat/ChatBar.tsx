import {MoreVertical} from 'react-feather';

interface ChatBarProps {
    groupName?: string
    groupImage?: string
}

const ChatBar = ({groupImage, groupName}: ChatBarProps) => {
    return (
        <div className="bg-teal-800 p-3 flex items-center justify-between z-50">
            <div className="flex items-center">
                {groupImage ? (
                    <img src={groupImage} alt="Group" className="rounded-full w-8 h-8 mr-3 object-cover"/>
                ) : (
                    <div className="rounded-full bg-white w-8 h-8 mr-3 flex items-center justify-center">
            <span className="text-green-600 font-semibold">
              {groupName ? groupName.charAt(0).toUpperCase() : 'H'}
            </span>
                    </div>
                )}
                <h2 className="text-lg font-semibold text-white">
                    {groupName ? groupName : 'Hidden Chat'}
                </h2>
            </div>

            <button className="text-white hover:text-green-200">
                <MoreVertical className="h-6 w-6"/>
            </button>
        </div>
    );
};

export default ChatBar;