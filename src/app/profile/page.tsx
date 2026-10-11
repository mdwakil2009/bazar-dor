
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const router = useRouter();

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleNameUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newName = name.trim();

    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: newName,
      });

      if (error) {
        console.error("Update error:", error);
        return;
      }

      toast.success("নাম সফলভাবে আপডেট হয়েছে!");

      setName("");
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();

    toast.success("সাইন আউট সফল হয়েছে!");
    router.push("/");
  };

  const userName =
    typeof user?.name === "string"
      ? user.name
      : user?.email?.split("@")[0] || "ব্যবহারকারী";

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0]">
        <span className="loading loading-spinner loading-lg text-green-700" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f0f5f0] px-4">
        <p className="text-center text-sm sm:text-base">
          প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
        </p>

        <a href="/sign-in" className="btn btn-success text-white">
          সাইন ইন
        </a>
      </main>
    );
  }

  return (
    <main className="min-h-screen  px-3 py-6 text-[#17231c] sm:px-5 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
          আমার প্রোফাইল
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        <section className="mt-6 flex flex-col gap-5 rounded-2xl border border-gray-200 bg-[#fbfdfb] p-4 shadow-sm sm:mt-8 sm:rounded-3xl sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
          <div className="flex min-w-0 items-center gap-3 sm:gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-green-700 text-2xl font-bold text-white sm:h-20 sm:w-20 sm:rounded-2xl sm:text-3xl">
              {user.image ? (
                <img
                  src={user.image}
                  alt={typeof user.name === "string" ? user.name : "Profile"}
                  className="h-full w-full object-cover"
                />
              ) : typeof user.name === "string" && user.name.trim() ? (
                user.name.trim().charAt(0).toUpperCase()
              ) : (
                "U"
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className=" whitespace-normal text-lg font-bold sm:text-xl lg:text-2xl">
                {userName}
              </h2>

              <p className="mt-1 break-all text-xs text-gray-600 sm:text-sm">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="btn btn-outline btn-error w-full rounded-xl sm:w-auto sm:self-start lg:self-auto"
          >
            ↩ সাইন আউট
          </button>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-[#fbfdfb] p-4 sm:mt-8 sm:rounded-3xl sm:p-6 lg:p-8">
          <h2 className="text-xl font-bold sm:text-2xl">তথ্য</h2>

          <form onSubmit={handleNameUpdate} className="mt-5 w-full">
            <label htmlFor="name" className="mb-2 block text-sm sm:text-base">
              নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="আপনার নাম লিখুন!"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered h-12 w-full rounded-xl bg-transparent text-base sm:h-14 sm:text-lg"
              disabled={isUpdating}
              required
            />

            <button
              type="submit"
              disabled={isUpdating}
              className="btn btn-success mt-4 h-12 w-full rounded-xl text-base text-white shadow-md sm:h-14 sm:text-lg"
            >
              {isUpdating ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  আপডেট হচ্ছে...
                </>
              ) : (
                "নাম আপডেট করুন"
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
