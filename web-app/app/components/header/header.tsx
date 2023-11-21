"use client";
import { UserAuth } from '@/app/context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/sharp-solid-svg-icons';
import Link from 'next/link';
import React, { useEffect } from 'react'

const Header = () => {
  const { user, logOut } = UserAuth();

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    };
    checkAuthentication();
  }, [user]);

  const disconnect = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="flex justify-end p-2 cursor-pointer">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className=" btn-secondary btn"><FontAwesomeIcon icon={faGear} style={{ color: "#ffffff" }} size="xl" /></label>
          <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li>
              {!user ? <Link href={"/login"}>Login / Registrer</Link> : (
                <Link href={"/"} onClick={disconnect}>Se déconnecter</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>

  )
}

export default Header;
