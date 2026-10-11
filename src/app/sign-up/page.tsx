"use client"
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = () => {
const onSubmit = async(e:React.SubmitEvent<HTMLElement>)=>{
     e.preventDefault()
     const formData = new FormData(e.target)
     const user = Object.fromEntries(formData.entries()) as {name:string, email:string,password:string , confirmPassword:string}
     
     const {data , error} = await authClient.signUp.email({
          ...user,
          callbackURL:"/"
     })
if(data){
  toast.success("সাইন ইন সফল হয়েছে। ")
  console.log(data)
  redirect("/")
}
if(error){
    console.log(error)
     toast.error("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।")
}
}
 const handelGoogleSignUP = async () => {
   await authClient.signIn.social({
    provider: "google",
  });

 toast.error("Google দিয়ে লগইন করা যায়নি!");
};

const handelGitHubSignIn = async () => {
 await authClient.signIn.social({
    provider: "github",
  });

   toast.error("GitHub দিয়ে লগইন করা যায়নি!");
};

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <form onSubmit={onSubmit}  className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              autoComplete="name"
              required
              className="input input-bordered w-full"
            />
          </div>

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

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="আবার পাসওয়ার্ড লিখুন"
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
          <button onClick={handelGoogleSignUP}
            className="btn btn-outline  border-gray-300"
          >
            <FcGoogle />
            Google দিয়ে চালিয়ে যান

          </button>

          <button onClick={handelGitHubSignIn}
            className="btn btn-outline  border-gray-300"
          >
           <FaGithub />
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          অ্যাকাউন্ট আছে?
          <Link href="/sign-in" className="font-semibold text-green-700 hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUpPage;
