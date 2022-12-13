import React from 'react';
import { Navigate,useLocation,Outlet } from 'react-router-dom';
import { isAuthenticated } from './Authentication';

const ProtectedRoute = ({ element: Component, ...rest }) => {
let location = useLocation()
  return (
    isAuthenticated()?
    <Outlet/>:
    <Navigate to='/business' state={{from:location,loginmodal:true }} replace/>
  );
};

export default ProtectedRoute;
