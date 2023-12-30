import Image from "next/image";

interface ReceiveProps {
    chat: any
}
const Receive:React.FC<ReceiveProps> = ({chat}) => {
    return (
        <div className="flex gap-x-2 items-center  float-left mx-6">
            <div className="">
                <Image src={"/profile_default.png"} width={34} height={34}
                       className={"rounded-full"}/>
            </div>
            <div className="flex items-end gap-x-1">
                <div className="
                bg-neutral-200
                text-black
                p-2
                rounded-br-full
                rounded-tr-full
                rounded-bl-full
                w-fit
                my-1
                text-[14px]
                "
                >
                    {chat.message}
                </div>
                <div className="text-[11px] text-end mb-1">오전 5:27</div>
            </div>
        </div>
    )
}
export default Receive