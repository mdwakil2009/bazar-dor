
const Loading = () => {
  return (
    <main className="min-h-screen w-full bg-[#f0f5f0] px-3 py-5 sm:px-4 sm:py-8 md:px-6">
      <div className="mx-auto w-full max-w-6xl animate-pulse">
        
        <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-white p-3 sm:gap-4 sm:p-5 md:p-6">
          <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-200 sm:h-16 sm:w-16 md:h-20 md:w-20" />

          <div className="min-w-0 flex-1 space-y-3">
            <div className="h-5 w-32 max-w-full rounded bg-gray-200 sm:h-6 sm:w-48" />
            <div className="h-4 w-40 max-w-full rounded bg-gray-200 sm:w-64" />
          </div>
        </div>

      
        <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4 lg:mt-8 lg:grid-cols-3 lg:gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="min-w-0 rounded-2xl bg-white p-3 sm:p-4 md:p-5">
              <div className="h-32 rounded-xl bg-gray-200 sm:h-36 md:h-40" />
              <div className="mt-4 h-5 w-3/4 max-w-full rounded bg-gray-200" />
              <div className="mt-3 h-4 w-1/2 max-w-full rounded bg-gray-200" />
              <div className="mt-4 h-8 rounded-lg bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Loading;
