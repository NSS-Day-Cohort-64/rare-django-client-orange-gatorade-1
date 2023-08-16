import { AdminNav } from "./AdminNav"
import { UserNav } from "./UserNav"

export const NavBar = ({ token, setToken, isAdmin }) => {
  
  let displayNav = <></>

  if (isAdmin) {
    displayNav = <AdminNav token={token} setToken={setToken} isAdmin={isAdmin} />
  } else {
    displayNav = <UserNav token={token} setToken={setToken} isAdmin={isAdmin} />
  }
  return displayNav
}
