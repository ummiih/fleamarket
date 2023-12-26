interface ReceiveProps {
    chat: any
}
const Receive:React.FC<ReceiveProps> = ({chat}) => {
    return (
        <div className="
        bg-neutral-200
        text-black
        p-2
        rounded-full
        w-fit
        "
        >
            {chat.message}
        </div>
    )
}
export default Receive