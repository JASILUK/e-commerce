import React, { useContext } from 'react'
import { globelcontext } from '../context/userConetxt'
import { Navigate, Outlet } from 'react-router-dom'

function SellerProtected() {
    const { user, loading } = useContext(globelcontext);

    if (loading) {
        return <p>loading</p>;
    }

    // If no user → redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If not seller → block
    if (user?.role !== "SELLER") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default SellerProtected;
