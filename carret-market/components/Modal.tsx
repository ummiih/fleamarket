"use client"

import axios from "axios";


interface ModalProps {
    isShowing: boolean;
}
const Modal:React.FC<ModalProps> = ({isShowing}) => {
    // function setThumbnail(event) {
    //     for (var image of event.target.files) {
    //         var reader = new FileReader();
    //
    //         reader.onload = function(event) {
    //             var img = document.createElement("img");
    //             img.setAttribute("src", event.target.result);
    //             document.querySelector("div#image_container").appendChild(img);
    //         };
    //
    //         reader.readAsDataURL(image);
    // }


    return (
        <>
        {isShowing &&
            <div className={"fixed z-20"}>
            <div className={"absolute mx-72"}>
            <div className={"w-[700px] h-[500px] border bg-white rounded-xl"}>
                {/*데이터 전송*/}
                <form
                    onSubmit={(e: any) => {
                        e.preventDefault();
                        const formData = new FormData();
                        var json = {
                            title: e.target.title.value,
                            content: e.target.content.value,
                            price: parseInt(e.target.price.value)
                        }
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
                            }).then((res) => {
                            //TODO: toast로 성공 보내기

                        }).catch((error) => {
                            alert("데이터 전송 실패")
                            //TODO: toast로 실패 보내기
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
                           multiple
                           required
                        ></input>
                    <button type={"submit"}>전송</button>
                </form>
            </div>
            </div>
            </div>
}
        </>

)

}
export default Modal