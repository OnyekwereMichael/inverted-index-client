import { Navigate, Outlet } from "react-router-dom"
const AuthLayout = () => {
  const isLoggedin = false
  return (
    <>
        {isLoggedin ? (
          <Navigate to={'/'}/>
        ): (
          <>
                <Outlet />
           </>
        )}
    </>
  )
}

export default AuthLayout
