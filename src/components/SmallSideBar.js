import { FaTimes } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"

import Wrapper from "../assets/wrappers/SmallSidebar"
import { toggleSideBar } from "../features/user/userSlice"
import Logo from "./Logo"
import NavLinks from "./NavLinks"

const SmallSideBar = () => {
  const dispatch = useDispatch()
  const { isSideBarOpen } = useSelector((store) => store.user)

  const toggle = () => {
    dispatch(toggleSideBar())
  }
  return (
    <Wrapper>
      <div
        className={
          isSideBarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSideBar={toggle} />
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSideBar
