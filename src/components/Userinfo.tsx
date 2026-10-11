
"use client";

import { authClient } from "@/lib/auth-client";
import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Userinfo = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);

 
  const getUserName = (): string => {
    const name = user?.name;

    if (typeof name === "string" && name.trim()) {
      return name;
    }

    if (typeof name === "object" && name !== null) {
      const objectName = (name as { name?: unknown }).name;

      if (typeof objectName === "string" && objectName.trim()) {
        return objectName;
      }
    }

   
    if (user?.email) {
      return user.email.split("@")[0];
    }

    return "User";
  };

  const userName = getUserName();

 
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdown.current &&
        !dropdown.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  
const handleSignOut = async () => {
 await authClient.signOut();


  setIsOpen(false);
  toast.success("সফলভাবে সাইন আউট হয়েছে!");
  router.push("/");
};

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <span className="loading loading-spinner loading-sm" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-5">
      {user ? (
        <div className="relative" ref={dropdown}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className="btn btn-ghost flex items-center gap-2 rounded-md px-3 py-2"
          >
            {/* Profile Avatar */}
            <div className="avatar">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-green-600 text-sm font-bold text-white">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={userName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>
                    {userName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {/* User Name */}
            <span className="max-w-32 truncate text-sm font-bold">
              {userName}
            </span>

            <span className="text-xs text-gray-400">▾</span>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 z-50 mt-2 w-64 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
              <div className="border-b border-gray-200 px-4 py-4">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {userName}
                </p>

                <p className="mt-1 truncate text-xs text-gray-500">
                  {user.email}
                </p>
              </div>

              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-blue-50"
              >
                <FaUser className="text-base text-blue-600" />
                <span>আমার প্রোফাইল</span>
              </Link>

              <button
                type="button"
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
          <Link
            href="/sign-in"
            className="rounded-md px-4 py-3 font-semibold transition-colors hover:bg-gray-200"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="rounded-md bg-green-700 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-800"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default Userinfo;
