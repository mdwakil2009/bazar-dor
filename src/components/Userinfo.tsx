
"use client";

import { authClient } from "@/lib/auth-client";
import { useState, useEffect, useRef } from "react";
import { FaUser,  } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Userinfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Sign out
  const handleSignOut = async () => {
     await authClient.signOut();
  };

  return (
    <div className="flex items-center gap-5">
      {user ? (
        <div className="relative" ref={dropdownRef}>
          
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className="btn btn-ghost flex items-center gap-2 rounded-md px-3 py-2"
          >
            <div className="avatar">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-green-600 text-sm font-bold text-white">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>
                    {user.email?.[0]?.toUpperCase() ||
                      user.name?.[0]?.toUpperCase() ||
                      "U"}
                  </span>
                )}
              </div>
            </div>

            <span className="max-w-28 truncate text-sm font-bold">
              {user.name || user.email}
            </span>

            <span className="text-xs text-gray-400">▾</span>
          </button>

          {isOpen && (
            <div className="absolute right-0 z-50 mt-2 w-64 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
            
              <div className="border-b border-gray-200 px-4 py-4">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {user.name || "ব্যবহারকারী"}
                </p>

                <p className="mt-1 truncate text-xs text-gray-500">
                  {user.email}
                </p>
              </div>

       
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/profile");
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 transition-colors hover:bg-blue-50"
              >
                <FaUser className="text-base text-blue-600" />
                <span>আমার প্রোফাইল</span>
              </button>

              
              <button  type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 border-t border-gray-100 px-4 py-3 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
              >
              
                <span>↩ সাইন আউট</span>
              </button>
            </div>
          )}
        </div>
      ) : (
      
        <div className="flex items-center gap-2">
          <Link href={'/sign-in'}><button
            className="rounded-md px-4 py-3 font-semibold transition-colors hover:bg-gray-200">
            সাইন ইন
          </button></Link>

          <Link href={'/sign-up'}><button
            className="rounded-md bg-green-700 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-800">
            সাইন আপ
          </button></Link>
        </div>
      )}
    </div>
  );
};

export default Userinfo;
