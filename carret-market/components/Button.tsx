import {forwardRef} from "react";
import {twMerge} from "tailwind-merge"

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>{

}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
                                                               className,
                                                               children,
                                                               disabled, onClick,
                                                               type = "button",
                                                               ...prop
                                                           }, ref)=>{
    return(
        <button
            type={type}
            className={twMerge(
                `
            rounded-full 
            bg-[#FE6F0F]
            border
            border-transparent
            px-3
            py-2
            disabled:cursor-not-allowed 
            disabled:opacity-50
            text-white
            font-bold
            hover:opacity-75
            transition
          `,
                disabled && 'opacity-75 cursor-not-allowed',
                className
            )}
            disabled={disabled}
            ref={ref}
            {...prop}
            onClick={onClick}
        >
            {children}
        </button>
    )
})

Button.displayName = "Button";

export default Button;