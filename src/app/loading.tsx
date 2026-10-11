

const Loading = () => {
  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8">
      <div className="mx-auto max-w-6xl animate-pulse">
        {/* Category skeleton */}
        <div className="flex items-center gap-4 rounded-2xl bg-white p-6">
          <div className="h-20 w-20 rounded-xl bg-gray-200" />

          <div className="flex-1 space-y-3">
            <div className="h-6 w-48 rounded bg-gray-200" />
            <div className="h-4 w-64 max-w-full rounded bg-gray-200" />
          </div>
        </div>

        {/* Products skeleton */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-2xl bg-white p-5">
              <div className="h-40 rounded-xl bg-gray-200" />
              <div className="mt-4 h-5 w-3/4 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />
              <div className="mt-4 h-8 rounded-lg bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Loading;