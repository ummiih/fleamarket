"use client"

import {usePathname, useRouter} from "next/navigation";
import React, {useMemo} from "react";
import NavigationItem from "@/components/NavigationItem";
import Image from "next/image";
import LoginButton from "@/components/LoginButton";
import SearchInput from "@/components/SearchInput";
import Button from "@/components/Button";
import {useRecoilState} from "recoil";
import {modalState} from "@/app/recoil/atom";
import Modal from "@/components/Modal";
import {IoSearch} from "react-icons/io5";

interface NavigationProps {
    children: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({children}) => {
    const pathname = usePathname();
    const router = useRouter()
    const [open, setOpen] = useRecoilState(modalState)

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
            },
            {
                label: "동네업체",
                href: "/nearby-stores",
                active: pathname === "/nearby-stores"
            },
            {
                label: "알바",
                href: "/jobs",
                active: pathname === "/jobs"

            },
            {
                label: "부동산 직거래",
                href: "/realty",
                active: pathname === "/realty"
            },
            {
                label: "중고차 직거래",
                href: "/car",
                active: pathname === "/car"
            },

        ], [pathname]
    )
    const searchOnClick = ()=> {
        router.push("/search")
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
                    <div className={"flex gap-x-4 items-center"}>
                    <Button onClick={searchOnClick} className={"flex items-center gap-x-1"}>
                        <IoSearch size={20} />검색하기</Button>
                    <LoginButton></LoginButton>
                    </div>
                </div>
            </div>
            <main className="">{children}</main>
        </div>
    )
}
export default Navigation;