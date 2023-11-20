"use client";
import withAuth from '@/app/components/protectedRoute/protectedRoute';
import React from 'react'
import createNewStroy from '@/app/firestore/firestore';

function Page() {

  const addUser = () => {
    createNewStroy();
  }
  return (
    <div>
      <div className='btn' onClick={addUser}></div>
    </div>
  )
};
export default withAuth(Page);
