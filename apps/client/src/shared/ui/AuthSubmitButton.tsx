import { FC } from "react"

interface IProps {
    className?: string
}


export const AuthSubmitButton: FC<IProps> = ({className}) => {

    return (
        <button type="submit" className={`border border-black px-[25px] py-2 ${className}`}>
            Submit
        </button>
    )
}