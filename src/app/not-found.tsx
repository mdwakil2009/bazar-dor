
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] w-full flex-col items-center justify-center px-4 py-8 text-center sm:px-6 sm:py-12">
      <h1 className="text-6xl font-extrabold text-green-600 sm:text-7xl md:text-8xl">
        404
      </h1>

      <h2 className="mt-4 max-w-full text-xl font-bold text-gray-800 sm:text-2xl">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
      </p>

      <Link
        href="/"
        className="btn btn-success mt-6 min-h-11 max-w-full px-4 text-sm text-white sm:px-6 sm:text-base"
      >
        হোম পেজে ফিরে যান ➜
      </Link>
    </main>
  );
}
