"use client"

import {usePathname} from "next/navigation";
import {useMemo} from "react";
import NavigationItem from "@/components/NavigationItem";
import Image from "next/image";
import LoginButton from "@/components/LoginButton";

interface NavigationProps {
    children: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({children}) => {
    const pathname = usePathname();

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

    return (
        <div>
            <div className="w-full h-[60px] flex">
                <div className={"flex gap-x-8 p-4 mx-20"}>

                    {routes.map((route) => (
                        <NavigationItem key={route.label} {...route}></NavigationItem>
                    ))}
                </div>
                <LoginButton></LoginButton>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
        </div>
    )
}
export default Navigation;