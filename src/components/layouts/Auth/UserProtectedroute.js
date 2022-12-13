import React from 'react';
import { Navigate,useLocation,Outlet } from 'react-router-dom';
import { isAuthenticated } from './Authentication';

const UserProtectedroute = ({ element: Component, ...rest }) => {
let location = useLocation()
  return (
    isAuthenticated()?
    <Outlet/>:
    <Navigate to='/' state={{from:location,loginmodal:true }} replace/>
  );
};

export default UserProtectedroute;
