"use client"

import {usePathname, useRouter} from "next/navigation";
import React, {useMemo, useState} from "react";
import NavigationItem from "@/components/NavigationItem";
import LoginButton from "@/components/LoginButton";
import Button from "@/components/Button";
import {useRecoilState} from "recoil";
import {modalState} from "@/app/recoil/atom";
import Modal from "@/components/Modal";
import {IoSearch} from "react-icons/io5";
import { PiChatCircleBold } from "react-icons/pi";
import MyPageButton from "@/components/MyPageButton";
import ProfileModal from "@/components/ProfileModal";
interface NavigationProps {
    children: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({children}) => {
    const pathname = usePathname();
    const router = useRouter()
    const [open, setOpen] = useRecoilState(modalState)
    const [openProfileModal, setOpenProfileModal] = useState(false);
    const userId = localStorage.getItem("userId")

    const routes = useMemo(
        () => [
            {
                label: "강황",
                href: "/",
                active: true
            },
            {
                label: "중고거래",
                href: "/fleamarket",
                active: pathname === "/fleamarket"
            }
        ], [pathname]
    )
    const searchOnClick = ()=> {
        router.push("/search")
    }

    const chatOnClick = ()=> {
        router.push("/chat")
    }

    return (
        <div>
            {open ? ( <Modal isShowing={open}></Modal>) : <div></div>}
            <div className="w-full h-[60px] shadow-lg shadow-neutral-100">
                <div className={"flex justify-between items-center mx-20"}>
                    <div className={"flex gap-x-8 p-4"}>

                        {routes.map((route) => (
                            <NavigationItem key={route.label} {...route}></NavigationItem>
                        ))}
                    </div>
                    <div className={"flex gap-x-3 items-center"}>

                    <Button onClick={searchOnClick} className={"flex items-center gap-x-1"}>
                        <IoSearch size={20} />검색하기</Button>
                        <Button onClick={chatOnClick} className={"flex items-center gap-x-2"}>
                            <PiChatCircleBold size={18} />
                            채팅하기</Button>
                        <LoginButton />
                        {
                            userId ? <MyPageButton onClick={() => setOpenProfileModal(!openProfileModal)} /> : <LoginButton />
                        }
                    </div>
                </div>
            </div>
            { openProfileModal && (<ProfileModal />) }
            <main className="">{children}</main>
        </div>
    )
}
export default Navigation;
