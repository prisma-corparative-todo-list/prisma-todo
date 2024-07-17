import { useRefreshTokens } from "../../../shared"
import { SigninForm } from "../../../features/signin"


export const SigninPage = () => {

    const { tokens } = useRefreshTokens()

    return (
        <div className="">
            <SigninForm/>
        </div>
    )
}