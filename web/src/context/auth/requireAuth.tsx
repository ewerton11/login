import Login from "pages/login"
import Register from "pages/register"
import { useContext } from "react"
import { AuthContext } from "./authContext"

type Props = {
  children: JSX.Element
}

export const RequireAuth = ({ children }: Props) => {
  const auth = useContext(AuthContext)
  if (auth?.data === null) {
    return <Login />
  }
  return children
}
