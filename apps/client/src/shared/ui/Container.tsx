import { FC, PropsWithChildren } from "react";

export const Container:FC<PropsWithChildren> = ({ children }) => { 
    return (
        <div className='w-full px-4'>{children}</div>
    )
}
