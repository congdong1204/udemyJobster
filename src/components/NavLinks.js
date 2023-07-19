import { NavLink } from "react-router-dom"
import links from "../utils/links"

const NavLinks = ({ toggleSideBar }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { icon, id, path, text } = link
        return (
          <NavLink
            key={id}
            to={path}
            className={({ isActive }) => {
              return isActive ? "nav-link active" : "nav-link"
            }}
            onClick={toggleSideBar}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}

export default NavLinks
