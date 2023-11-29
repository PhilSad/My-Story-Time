"use client";
import { UserAuth } from '@/app/context/authContext';
import Link from 'next/link';
import React, { useEffect } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import { useStore } from '@/app/store/root.store';

const Header = () => {
  const { user, logOut } = UserAuth();
  const { storyStore } = useStore();

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    };
    checkAuthentication();
  }, [user]);

  const disconnect = async () => {
    try {
      await logOut();
      await storyStore.reset();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="flex justify-end p-2 cursor-pointer">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn-secondary btn"><SettingsIcon sx={{ color: "white" }} /></label>
          <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li>
              {!user ? <Link href={"/login"}>Login / Registrer</Link> : (
                <Link href={"/"} onClick={disconnect}>Logout</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>

  )
}

export default Header;
