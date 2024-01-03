"use client"

import { FaPen } from "react-icons/fa";

interface WriteButtonProps {
    isShowing: boolean;
    onChange: () => void;
}
const WriteButton:React.FC<WriteButtonProps> = ({isShowing, onChange}) => {

        return(
            <button className={"bg-[#FE6F0F] p-5 rounded-full hover:scale-110 transition"} onClick={onChange}>
                <FaPen size={30} className={"text-white"}/>
            </button>
        )
    }

export default WriteButton;
