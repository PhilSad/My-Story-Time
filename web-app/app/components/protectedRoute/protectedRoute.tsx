"use client";
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'
import { UserAuth } from '../../context/authContext'
import { usePathname } from 'next/navigation'


const withAuth = (Component: any) => {
  return function IsAuth(props: any) {
    const pathname = usePathname();

    const { user, loading } = UserAuth();

    useEffect(() => {
      if (!loading && !user) {
        localStorage.setItem('redirectUrl', pathname);
        redirect("/login");
      }
    }, [loading, pathname, user]);

    if (!user) {
      return null;
    }
    return <Component {...props} />;
  }
}

export default withAuth;
