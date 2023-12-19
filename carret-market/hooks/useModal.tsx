import {useState} from "react";
interface ModalProps {
    isShowing: boolean;
    toggle: () => void;
}

const useModal = (): ModalProps => {
    const [isShowing, setIsShowing] = useState(false);

    const toggle = () => setIsShowing((prev) => !prev);

    return {
        isShowing,
        toggle,
    };
};

export default useModal;