"use client"

import axios from "axios";
import {useEffect, useRef, useState} from "react";
import usePostTokenRefresher from "@/hooks/usePostTokenRefresher";
import {useRouter} from "next/navigation";
import {sendRequest} from "@/hooks/funcs";


interface ModalProps {
    isShowing: boolean;
}

const Modal: React.FC<ModalProps> = ({isShowing}) => {
    const [imgFiles, setImgFiles] = useState<string[]>([]);
    const imgRef = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<File[]>([]);
    const router = useRouter();

    const globalURL = "http://112.186.245.109:8080/api/v1/trade-posts"

    //이미지 업로드 input의 onChange
    const saveImgFile = async () => {
        const files = imgRef.current.files
        const copyImgFile = [...imgFiles]
        const copyFileList = [...fileList]

        // 이미지 미리 보기 코드
        for (let i = 0; i < files.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(files[i])
            reader.onloadend = () => {
                copyImgFile.push(reader.result)
                setImgFiles(copyImgFile)
            }
        }

        // 이미지 업로드 코드
        for (let i = 0; i < files.length; i++) {
            copyFileList.push(files[i])
            setFileList(copyFileList)
        }
    }

    const fetchData = async (formData) => {
        try {
            // 액세스 토큰을 헤더에 담아 요청 보내기
            const response = await sendRequest({
                headers: {
                    'Access-Token': localStorage.getItem('accessToken')
                },
                method: 'POST',
                data: formData,
                url: '/api/v1/trade-posts',
            });

            // 성공적인 응답 처리
            console.log('데이터:', response.data);
            alert("성공")

        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
            alert("오류")
        }
    };

    return (
        <>
            {isShowing &&
                <div className={"fixed z-20"}>
                    <div className={"absolute mx-72"}>
                        <div className={"w-[700px] h-[500px] border bg-white rounded-xl"}>
                            {/*데이터 전송*/}
                            <form
                                onSubmit={(e: any) => {
                                    e.preventDefault()
                                    {/*json 형식으로 title, content, price 전달*/
                                    }
                                    const formData = new FormData();
                                    const json = {
                                        title: e.target.title.value,
                                        content: e.target.content.value,
                                        price: parseInt(e.target.price.value)
                                    }
                                    formData.append('request', new Blob([JSON.stringify(json)], {
                                        type: "application/json"
                                    }))

                                    {/*forData 형식으로 이미지 전달*/
                                    }
                                    console.log(fileList)
                                    fileList.forEach((file) => {
                                        formData.append("files", file);
                                    });

                                    fetchData(formData)
                                }}>
                                <div className={"grid"}>
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
                                           ref={imgRef}
                                           onChange={saveImgFile}
                                           multiple
                                           required
                                    ></input>
                                </div>
                                <button type={"submit"}>전송</button>
                            </form>
                            {
                                imgFiles.map((img, i) => <img key={i} src={img} alt={img}
                                                              className={"w-[50px] h-[50px]"}></img>)
                            }
                        </div>
                    </div>
                </div>
            }
        </>

)

}
export default Modal