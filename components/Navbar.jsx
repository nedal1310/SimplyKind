"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  if (status === "loading") return null;
  // if(session) {
  //   return <>
  //     Signed in as {session.user.email} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }
  return (
    <div className="bg-primary text-white flex flex-wrap justify-between items-center px-6 py-3">
      <Link
        href="/"
        className="flex items-center gap-2 text-2xl font-bold cursor-pointer"
      >
        <Image src="/favicon.ico" alt="logo" width={40} height={40} />
        SimplyKind
      </Link>
      <ul className="flex gap-10  text-base">
        {/* <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Login</li> */}
      </ul>
      <div className="flex gap-4">
        {session && (
          <>
            {/* Dashboard Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                onBlur={() => {
                  setTimeout(() => {
                    setOpen(false);
                  }, 100);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-white
            bg-[linear-gradient(135deg,var(--color-accent),var(--color-secondary))]
            transition-all duration-300 hover:scale-105 hover:shadow-lg hover:brightness-110 hover:cursor-pointer"
              >
                Dashboard
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                >
                  <g strokeWidth="0"></g>
                  <g strokeLinecap="round" strokeLinejoin="round"></g>
                  <g>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                      className="fill-current"
                    />
                  </g>
                </svg>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 bg-primary/90 border rounded-2xl shadow-lg w-44 z-10">
                  <ul className="p-2 text-sm border border-white rounded-2xl">
                      <li>
                      <Link
                        href="/"
                        className="block p-2 hover:bg-secondary hover:font-bold rounded hover:border hover:border-white"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/Dashboard"
                        className="block p-2 hover:bg-secondary hover:font-bold rounded hover:border hover:border-white"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/donate"
                        className="block p-2 hover:bg-secondary hover:font-bold rounded hover:border hover:border-white"
                      >
                        Donate
                      </Link>
                    </li>
                  

                    <li>
                      <button
                        onClick={() => {
                          const confirmLogout = window.confirm(
                            "Are you sure you want to sign out?"
                          );

                          if (confirmLogout) {
                            signOut();
                          }
                        }}
                        className="w-full text-left p-2 hover:bg-secondary hover:font-bold rounded hover:border hover:border-white hover:cursor-pointer"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
        {!session && (
          <Link href="/login">
            <button
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-white
      bg-[linear-gradient(135deg,var(--color-accent),var(--color-secondary))]
      transition-all duration-300
      hover:scale-105 hover:shadow-lg hover:brightness-110 hover:cursor-pointer"
            >
              Login
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
