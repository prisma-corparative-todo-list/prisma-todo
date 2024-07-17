import { Header } from "../../widgets/Header"
import { Container, useAuthStore } from '../../shared';
import { GeneralSidebar } from "../../widgets/Sidebar";
import { Outlet } from "react-router-dom";

export const Layout = () => {

    const { isAuth } = useAuthStore()

    return (
      <div>
        <Header />
        <div className={"flex"}>
          {
            isAuth && (
              <GeneralSidebar/>
            )
          }
          <Container>
            <Outlet />
          </Container>
        </div>
      </div>
    );
}
