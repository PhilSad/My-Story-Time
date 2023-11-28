"use client";
import React from 'react'
import withAuth from '@/app/components/protectedRoute/protectedRoute';

const page = () => {
  return (
    <div className="flex flex-row min-h-screen bg-cover bg-night font-agbalumo">
      My stories</div>
  )
}

export default withAuth(page);
