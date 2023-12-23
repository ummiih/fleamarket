"use client"

import axios from "axios";
import {useCallback, useEffect, useRef, useState} from "react";
import usePostTokenRefresher from "@/hooks/usePostTokenRefresher";
import {useRouter} from "next/navigation";
import {sendRequest} from "@/hooks/funcs";

import {IoClose} from "react-icons/io5";
import {FiPlus} from "react-icons/fi";
import {useRecoilState} from "recoil";
import {modalState} from "@/app/recoil/atom";


interface ModalProps {
    isShowing: boolean;
}

const Modal: React.FC<ModalProps> = ({isShowing}) => {
    const [imgFiles, setImgFiles] = useState<string[]>([]);
    const imgRef = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<File[]>([]);
    const router = useRouter();
    const textRef = useRef();
    const globalURL = "http://112.186.245.109:8080/api/v1/trade-posts"
    const [open, setOpen] = useRecoilState(modalState)

    //textarea태그 자동 높이 조절
    const handleResizeHeight = useCallback(() => {
        textRef.current.style.height = textRef.current.scrollHeight + "px";
    }, []);

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
                <div className={"absolute z-50 m-5"}>
                    <div className={"absolute mx-72"}>
                        <div className={"relative w-[700px] border bg-white rounded-xl "}>
                            <div className={"flex m-8 gap-x-60"}>
                                {/*닫기 버튼*/}
                                <button onClick={() => setOpen(!open)}>
                                    <IoClose size={30}/>
                                </button>
                                <div className={"text-2xl font-semibold"}>게시글 작성</div>
                            </div>
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
                                <div className={"flex flex-col gap-y-5 mx-10 my-5"}>
                                    <div className={"flex flex-col"}>
                                        <label className={"text-lg font-semibold"}>제목</label>
                                        <input className={"bg-neutral-100 rounded p-2"}
                                               id="title"
                                               name="title"
                                        ></input>
                                    </div>
                                    <div className={"flex flex-col gap-y-1"}>
                                        <label className={"text-lg font-semibold"}>내용</label>
                                        <textarea className={"bg-neutral-100 rounded p-2 h-40"}
                                                  ref={textRef}
                                                  id="content"
                                                  name="content"
                                                  onInput={handleResizeHeight}
                                        ></textarea>
                                    </div>
                                    <div className={"flex flex-col gap-y-1"}>
                                        <label className={"text-lg font-semibold"}>가격</label>
                                        <input className={"bg-neutral-100 rounded p-2"}
                                               id="price"
                                               name="price"
                                        ></input>
                                    </div>
                                    <div className={"flex flex-col gap-y-1"}>
                                        <span className={"text-lg font-semibold"}>파일 업로드</span>
                                        <input type={"file"}
                                               accept={"image/*"}
                                               id="image"
                                               name="image"
                                               ref={imgRef}
                                               onChange={saveImgFile}
                                               multiple
                                               required
                                               style={{display: "none"}}
                                        ></input>

                                        <div className={"flex items-center mt-2"}>
                                            <label id={"image"} htmlFor="image">
                                                <FiPlus size={20}
                                                        className={"text-white p-2 w-[40px] h-[40px] bg-black rounded-full cursor-pointer mr-2 hover:scale-105 transition hover:opacity-70"}/></label>

                                            <div className={"flex gap-x-2 rounded-2xl items-center overflow-x-scroll"}>

                                                {
                                                    imgFiles.map((img, i) => <img key={i} src={img} alt={img}
                                                                                  className={"w-[80px] h-[80px]"}></img>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <button type={"submit"}
                                            className={"mt-10 bottom-0 right-10 left-10 p-2 bg-[#FE6F0F] text-xl text-white font-semibold rounded-full hover:opacity-80 transition"}>완료
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            }
        </>

    )

}
export default Modal