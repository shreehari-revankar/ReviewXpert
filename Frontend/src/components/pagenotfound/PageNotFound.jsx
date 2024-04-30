import { useEffect } from "react";

function PageNotFound() {
  useEffect(() => {
    document.title = "Sahayata 24X7 | Page Not Found";
  });

  return (
    <>
      <section className="flex items-center h-screen p-16 bg-gray-50 ">
        <div className="container flex flex-col items-center ">
          <div className="flex flex-col gap-6 max-w-md text-center">
            <h2 className="font-extrabold text-9xl text-gray-600">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-3xl text-gray-400">
              Sorry, we couldn&rsquo;t find this page.
            </p>
            <a
              href="/"
              className="px-8 py-4 text-xl font-semibold rounded bg-orange-500 text-gray-50 hover:text-gray-200"
            >
              Back to homepage
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default PageNotFound;
