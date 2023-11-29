"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { UserAuth } from '@/app/context/authContext';
import GoogleIcon from '@mui/icons-material/Google';
import PersonIcon from '@mui/icons-material/Person';

const Page = () => {
  const { user, googleSignIn, anonymouslySignIn } = UserAuth();
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.error(err);
    }
  };

  const signInAnonymously = async () => {
    try {
      await anonymouslySignIn();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      const redirectUrl = localStorage.getItem('redirectUrl');
      if (redirectUrl) {
        router.push(redirectUrl);
        localStorage.removeItem('redirectUrl');
      } else {
        router.push('/');
      }
    }
  }, [user, router]);

  return (
    <dialog id="authModal" className={"modal modal-open"}>
      <div className="space-y-4 text-center modal-box">
        <h3 className="text-lg font-bold ">Login / Register</h3>
        <p>Login / Register to make a story!</p>
        <div><button className="btn btn-outline" onClick={signInWithGoogle}><GoogleIcon/>Google Sign-In</button></div>
        <div><button className="btn btn-outline" onClick={signInAnonymously}><PersonIcon/>Anonymous Sign-In</button></div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={() => router.back()}>Back</button>
          </form>
        </div>
      </div>
    </dialog>
  )
};

export default Page;
