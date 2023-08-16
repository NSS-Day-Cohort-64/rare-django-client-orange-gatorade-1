import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"


export const Rare = () => {
  const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
  const [isRareAdmin, setIsAdminState] = useState(localStorage.getItem('auth_token'))

  const setToken = (newToken) => {
    localStorage.setItem('auth_token', newToken)
    setTokenState(newToken)
  }

  const setIsRareAdmin = (isStaff) => {
    localStorage.setItem('rare_admin', isStaff)
    setIsAdminState(isStaff)
  }

  return <>
    <NavBar token={token} setToken={setToken} isAdmin={isRareAdmin} setAdmin={setIsRareAdmin} />
    <ApplicationViews token={token} setToken={setToken} isAdmin={isRareAdmin} setAdmin={setIsRareAdmin} />
  </>
}
