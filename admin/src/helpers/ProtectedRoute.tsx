import React, { useEffect } from 'react';
import { Admin } from '../features/admin/adminModel';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getAdminByCookieMain } from '../features/admin/adminAPI';
import { adminSelector, adminStatusSelector, Status } from '../features/admin/adminSlice';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const admin = useAppSelector(adminSelector) as Admin | null;
  const adminStatus = useAppSelector(adminStatusSelector);
  
  useEffect(() => {
    if (!admin) {
      dispatch(getAdminByCookieMain());
    }
  }, [admin, dispatch]);

  if (adminStatus === Status.LOADING) {
    // Add a loading indicator 
    return <div>Loading...</div>;
  }

  if (adminStatus === Status.IDLE && !admin) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
