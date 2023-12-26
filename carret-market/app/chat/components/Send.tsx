interface SendProps {
    chat: any
}
const Send:React.FC<SendProps> = ({chat}) => {
    return (
        <div className="
        bg-[#FE6F0F]
        text-white
        p-2
        rounded-full
        w-fit
        right-0
        "
        >
            {chat.message}
        </div>
    )
}
export default Send;