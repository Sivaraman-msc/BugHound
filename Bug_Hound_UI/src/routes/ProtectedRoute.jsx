import { Navigate, Outlet } from "react-router-dom"
import UseAuth from "../hooks/useAuth"

export const Protectedroute = () => {
    const { user, loading } = UseAuth()

    if (loading) {
        return <div>Loading...</div>
    }

    return user ? <Outlet /> : <Navigate to='/' />
}