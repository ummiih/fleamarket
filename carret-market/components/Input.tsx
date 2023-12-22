import { forwardRef } from 'react';
interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>{}
const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    type,
    disabled,
    ...props
},ref) => {
    return (
        <input
            className={className}
            type={type}
            disabled={disabled}
            ref={ref}
            {...props}>
        </input>
    )
});

Input.displayName = "Input";
export default Input