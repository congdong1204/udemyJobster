import { useSelector } from "react-redux"

import NavLinks from "./NavLinks"
import Logo from "../components/Logo"
import Wrapper from "../assets/wrappers/BigSidebar"

const BigSideBar = () => {
  const { isSideBarOpen } = useSelector((store) => store.user)

  return (
    <Wrapper>
      <div
        className={
          isSideBarOpen ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSideBar
