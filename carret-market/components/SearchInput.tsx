"use client"
import {useEffect, useState} from "react";
import Input from "@/components/Input";
import {useRouter} from "next/navigation";
import qs from "query-string";
import useDebounce from "@/hooks/useDebounce";
import { IoSearch } from "react-icons/io5";
import axios from "axios";

const SearchInput = () => {
    const router = useRouter()
    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(value, 500)


    useEffect(() => {
        const query = {
            keyword: debouncedValue,
        }

        const url = qs.stringifyUrl({
            url:'/search',
            query: query
        });

        router.push(url)
    }, [debouncedValue, router]);

    return (
        <div>
            <Input className={"p-3 bg-neutral-100 w-full rounded-full text-lg"}
                placeholder={"검색어를 입력하시오"}
                   value={value}
                   onChange={(e)=>setValue(e.target.value)}>
            </Input>
        </div>
    )
}
export default SearchInput;