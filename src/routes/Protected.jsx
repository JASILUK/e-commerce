import React, { useContext } from 'react'
import { globelcontext } from '../context/userConetxt'
import { Navigate,Outlet  } from 'react-router-dom'

function Protected({children}) {
    const { user, loading } = useContext(globelcontext);

    if (loading) return <p>Loading...</p>;

    if (!user) return <Navigate to="/login"  replace />;
    if( children ){
        return children
    }
    return <Outlet/>;
}


export default Protected