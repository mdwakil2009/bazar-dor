"use client"
import { authClient } from "@/lib/auth-client";
import { github } from "better-auth";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignInPage = () => {
const toastShown = useRef(false);

useEffect(() => {
  if (
    new URLSearchParams(window.location.search).get("required") === "signin" &&
    !toastShown.current
  ) {
    toastShown.current = true;
    toast.error("আগে সাইন ইন করুন!");
     id: "signin-required" 
  }
}, []);
  const onSubmit = async(e:React.SubmitEvent<HTMLElement>)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const user = Object.fromEntries(formData.entries()) as {email:string , password:string}
    
    const {data, error} = await authClient.signIn.email({
      ...user,
      callbackURL:"/"
    })
    if(data){
      console.log(data)
      toast.success("সাইন ইন সফল হয়েছে। ")
    }
    if(error){
      console.log(error)
      toast.error("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।")
    }
 
  }

  const handelGoogleSignIn= async()=>{
  await authClient.signIn.social({
      provider:"google"
    })
  }
  const handelGitHubSignIn=async()=>{
    await authClient.signIn.social({
      provider:"github"
    })
  }
  return (
    <div className="min-h-screen  px-4 py-12">
     <main className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              autoComplete="new-password"
              minLength={8}
              required
              className="input input-bordered w-full"
            />
          </div>

          <button type="submit" className="btn btn-success w-full text-white">
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className=" flex gap-4 space-y-3">
          <button onClick={handelGoogleSignIn} className="btn btn-outline  border-gray-300">
            <FcGoogle />
            Google দিয়ে চালিয়ে যান
          </button>

          <button onClick={ handelGitHubSignIn}  className="btn btn-outline  border-gray-300">
            <FaGithub />
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?  
          <Link href="/sign-up" className="font-semibold text-green-700 hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </main>
   <Link href={"/"}><p className= "  mt-4 flex justify-center items-center hover:underline text-gray-500">← হোম পেজে ফিরে যান</p></Link>
   </div>
     
  );
};

export default SignInPage;
