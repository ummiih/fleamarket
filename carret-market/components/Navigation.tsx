"use client"

import {usePathname, useRouter} from "next/navigation";
import {useMemo} from "react";
import NavigationItem from "@/components/NavigationItem";
import Image from "next/image";
import LoginButton from "@/components/LoginButton";
import SearchInput from "@/components/SearchInput";
import Button from "@/components/Button";

interface NavigationProps {
    children: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({children}) => {
    const pathname = usePathname();
    const router = useRouter()

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
            <div className="w-full h-[60px] ">
                <div className={"flex justify-between items-center mx-20"}>
                    <div className={"flex gap-x-8 p-4"}>

                        {routes.map((route) => (
                            <NavigationItem key={route.label} {...route}></NavigationItem>
                        ))}
                    </div>
                    <div className={"flex gap-x-4 items-center"}>
                    <Button onClick={searchOnClick}>검색하기</Button>
                    <LoginButton></LoginButton>
                    </div>
                </div>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
        </div>
    )
}
export default Navigation;