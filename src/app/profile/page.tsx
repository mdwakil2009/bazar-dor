
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

const handleNameUpdate = async (
  e: React.FormEvent<HTMLFormElement>
) => {
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
  } {
    setIsUpdating(false);
  }
};


  const handleSignOut = async () => {
    await authClient.signOut();

      toast.success("সাইন আউট সফল হয়েছে!");
     router.push("/");
    
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0]">
        <span className="loading loading-spinner loading-lg text-green-700" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f0f5f0]">
        <p>প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।</p>
        <a href="/sign-in" className="btn btn-success text-white">
          সাইন ইন
        </a>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 text-[#17231c]">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-xl font-bold sm:text-4xl">
          আমার প্রোফাইল
        </h1>

        <p className="mt-1 text-lg text-gray-600">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        <section className="mt-8 flex flex-col justify-between gap-5 rounded-3xl border border-gray-200 bg-[#fbfdfb] p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
          <div className="flex min-w-0 items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-green-700 text-3xl font-bold text-white">
              {user.image ? (
                <img
                  src={user.image}
                  alt={
                    typeof user.name === "string"
                      ? user.name
                      : "Profile"
                  }
                  className="h-full w-full object-cover"
                />
              ) : (
                typeof user.name === "string" && user.name.trim()
                  ? user.name.trim().charAt(0).toUpperCase()
                  : "U"
              )}
            </div>

            <div className="min-w-0">
              <h2 className=" text-2xl font-bold">
                {typeof user.name === "string"
                  ? user.name
                  : "ব্যবহারকারী"}
              </h2>

              <p className="mt-1 break-all text-gray-600">
                {user.email}
              </p>

              <p className="mt-2 text-sm font-medium text-green-700">
                আমার প্রোফাইল
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="btn btn-outline btn-error shrink-0 rounded-xl px-5"
          >
            ↩ সাইন আউট
          </button>
        </section>

        <section className="mt-8 rounded-3xl border border-gray-200 bg-[#fbfdfb] p-6 sm:p-8">
          <h2 className="text-2xl font-bold">তথ্য</h2>

          <form onSubmit={handleNameUpdate} className="mt-5 w-full">
            <label htmlFor="name" className="mb-2 block text-lg">
            নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered h-14 w-full rounded-xl bg-transparent text-lg"
              disabled={isUpdating}
              required
            />

            <button
              type="submit"
              disabled={isUpdating}
              className="btn btn-success mt-4 h-14 w-full rounded-xl text-lg text-white shadow-md"
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
