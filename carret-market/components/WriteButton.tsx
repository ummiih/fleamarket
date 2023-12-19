"use client"

import {useState} from "react";
import { FiPlus } from "react-icons/fi";
import useModal from "@/hooks/useModal";

interface WriteButtonProps {
    isShowing: boolean;
    onChange: () => void;
}
const WriteButton:React.FC<WriteButtonProps> = ({isShowing, onChange}) => {

        return(
            <button className={"bg-[#FE6F0F] p-3 rounded-full"} onClick={onChange}>
                <FiPlus size={50} className={"text-white"}/>
            </button>
        )
    }

export default WriteButton;