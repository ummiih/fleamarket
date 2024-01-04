'use client'

import {IoClose} from "react-icons/io5";
import React, {useEffect, useState} from "react";
import {useRecoilState} from "recoil";

import {articleUrls, deleteUrls, formFiles, previewImageFiles} from "@/app/recoil/atom";

interface DeleteButtonProps {
    //imgFiles(현재)과 imageUrls(과거)의 인덱스
    i: number;
    //imgFiles에서 사용되는지, imageUrls에서 사용되는지 판별
    type: string;
}
const DeleteButton: React.FC<DeleteButtonProps> = ({i, type}) => {
    //fetchData에서 imageURL 담는 state
    const [imageUrls, setImageUrls] = useRecoilState<[]>(articleUrls)
    const [deleteImageUrls, setDeleteImageUrls] = useRecoilState(deleteUrls)
    //이미지 미리보기
    const [imgFiles, setImgFiles] = useRecoilState<string[]>(previewImageFiles);
    // 파일 업로드
    const [fileList, setFileList] = useRecoilState<File[]>(formFiles);

    //미리보기에서 X버튼 클릭했을 때 삭제되도록 하는 함수
    const deletePreviewImage = () => {
        const copyImgFiles = [...imgFiles] // 미리보기 imageUrl
        const copyFileList = [...fileList] // formData를 세팅할 fileList
        const copyImageUrls = [...imageUrls] // 과거에서 삭제할 경우

        if (type === 'imageUrls') {
            setImageUrls(copyImageUrls.filter(imageUrl => imageUrl != imageUrls[i]))
        }

        if (type === 'imgFiles') {
            console.log("필터된 URl리스트",copyImgFiles.filter(imageUrl => imageUrl != imgFiles[i]))
            setImgFiles(copyImgFiles.filter(imageUrl => imageUrl != imgFiles[i]))

            console.log("formData에 들어갈 Url 리스트", copyFileList.filter(imageUrl => imageUrl != fileList[i]))
            setFileList(copyFileList.filter(file => file != fileList[i]))
        }

    }

    //진짜 삭제할 수 있도록 deleteImageUrls을 세팅하는 함수
    const deleteImageData = () => {
        const copy = [...deleteImageUrls];
        const imgFilesCopy = [...imgFiles]
        const imageUrlsCopy = [...imageUrls]
        // 과거 URL중에서 삭제한 URL이 이미 삭제 리스트 안에 포함되어 있지 않으면 deleteImageUrls에 추가
        if (type === 'imageUrls' && !copy.includes(imageUrlsCopy[i])) {
            copy.push(imageUrlsCopy[i]);
            console.log("과거 imageUrls에서 추가된 copy", copy)
            setDeleteImageUrls(copy);
        }

        if (type === 'imgFiles' && !copy.includes(imgFilesCopy[i])) {
            copy.push(imgFilesCopy[i]);
            console.log("현재 imgFiles에서 추가된 copy", copy)
            setDeleteImageUrls(copy);
        }
    }

    useEffect(() => {

    }, [imgFiles]);

    return (
        <div>
            <button
                className="absolute bg-red-600 rounded-full p-1"
                type={"button"}
                onClick={()=> {
                    deletePreviewImage()
                    deleteImageData()
                }}
            >
                <IoClose className="text-white " size={12} />
            </button>
        </div>
    )
}
export default DeleteButton;
