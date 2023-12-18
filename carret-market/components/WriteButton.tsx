"use client"

import { FiPlus } from "react-icons/fi";
import {useState} from "react";
import {useRecoilState} from "recoil";
import {modalState} from "@/app/recoil/fleamarket/atom";
interface WriteButtonProps {
    isOpen: boolean;
}
const WriteButton:React.FC<WriteButtonProps> = ({isOpen}) => {

        return(
            <button className={"bg-[#FE6F0F] p-3 rounded-full"}>
                <FiPlus size={50} className={"text-white"}/>
            </button>
        )
    }

export default WriteButton;