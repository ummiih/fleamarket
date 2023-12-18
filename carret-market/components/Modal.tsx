"use client"
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
const Modal = () => {
    const router = useRouter();
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    {/*테스트용*/}
    const formData = new FormData();
    // formData.append('file',file)
    // formData.append('movie', new Blob([JSON.stringify(movie)], {
    //     type: "application/json"
    // }))


    return (
        <div className={"flex justify-center"}>
            <div className={"w-[600px] h-[500px] border"}>
                <form
                onSubmit={(e:any) => {
                    e.preventDefault();
                    const formData = new FormData();
                    var json = {
                        title: e.target.title.value,
                        content: e.target.content.value,
                        price: parseInt(e.target.price.value)}
                    formData.append('request', new Blob([JSON.stringify(json)], {
                        type: "application/json"
                    }))
                    const fileList: File[] = []; // 업로드한 파일들을 저장하는 배열

                    const uploadFiles = Array.prototype.slice.call(e.currentTarget.image.files); // 파일선택창에서 선택한 파일들

                    uploadFiles.forEach((uploadFile) => {
                        fileList.push(uploadFile);
                    });

                    console.log(fileList)
                    fileList.forEach((file) => {
                        formData.append("files", file);
                    });

                    axios.post("http://112.186.245.109:8080/api/v1/trade-posts"
                        , formData
                        , {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }).then((res)=>{
                        console.log(res.data);
                        // router.push("/fleamarket");
                        // return;
                    }).catch((error)=>{
                        console.log(error)
                        alert("데이터 전송 실패")
                    })
                }}>
                    <input className={"border"}
                           placeholder={"제목"}
                           id="title"
                           name="title"
                    ></input>
                    <input className={"border"}
                           placeholder={"게시글"}
                           id="content"
                           name="content"
                           ></input>
                    <input className={"border"}
                           placeholder={"가격"}
                           id="price"
                           name="price"
                           ></input>
                    <input type={"file"}
                           accept={"image/*"}
                           id="image"
                           name="image"
                           multiple></input>
                    <button type={"submit"}>전송</button>
                </form>
            </div>
        </div>
    )
}
export default Modal