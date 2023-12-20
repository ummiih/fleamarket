"use client"

import axios from "axios";
import {useEffect, useRef, useState} from "react";


interface ModalProps {
    isShowing: boolean;
}
const Modal:React.FC<ModalProps> = ({isShowing}) => {
    const [imgFiles, setImgFiles] = useState<string[]>([]);
    const imgRef = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<File[]>([]);

    //이미지 업로드 input의 onChange
    const saveImgFile = async () => {
        const files = imgRef.current.files
        const copyImgFile = [...imgFiles]
        const copyFileList = [...fileList]

        for (let i = 0; i < files.length; i++){
            let reader = new FileReader();
            reader.readAsDataURL(files[i])
            reader.onloadend = () => {
                copyImgFile.push(reader.result)
                setImgFiles(copyImgFile)
            }
        }

        for (let i = 0; i< files.length;i++){
            copyFileList.push(files[i])
            setFileList(copyFileList)
        }
    }

    useEffect(() => {
        console.log(imgFiles)
        console.log(fileList)
    }, [imgFiles, fileList]);

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
                        const formData = new FormData();
                        var json = {
                            title: e.target.title.value,
                            content: e.target.content.value,
                            price: parseInt(e.target.price.value)
                        }
                        formData.append('request', new Blob([JSON.stringify(json)], {
                            type: "application/json"
                        }))


                        // const uploadFiles = Array.prototype.slice.call(e.currentTarget.image.files); // 파일선택창에서 선택한 파일들
                        //
                        //
                        // uploadFiles.forEach((uploadFile) => {
                        //     setFileList([...fileList, uploadFile])
                        // });
                        //
                        // console.log(fileList)

                        fileList.forEach((file) => {
                            formData.append("files", file);
                        });

                        axios.post("http://112.186.245.109:8080/api/v1/trade-posts"
                            , formData
                            , {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            }).then((res) => {
                            //TODO: toast로 성공 보내기

                        }).catch((error) => {
                            alert("데이터 전송 실패")
                            //TODO: toast로 실패 보내기
                        })
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
                    imgFiles.map((img,i) => <img key={i} src={img} alt={img} className={"w-[50px] h-[50px]"}></img>)
                }
            </div>
            </div>
            </div>
}
        </>

)

}
export default Modal