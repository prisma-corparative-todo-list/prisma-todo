import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { PAGE_URLS } from "./constants";


export function isAuth(Component: React.ComponentType<any>) {
  return (props: any) => {
    
    const navigate = useNavigate();

    // const { checkingAdminIsLoading,checkingAdminIsSuccess } = useCheckAuth()
    
    // useEffect(() => {
    //   if(!checkingAdminIsLoading && !checkingAdminIsSuccess){
    //     navigate(`/${PAGE_URLS.SIGNIN}`)
    //   }
    // },[checkingAdminIsSuccess])

    return <Component {...props} />;
  };
}