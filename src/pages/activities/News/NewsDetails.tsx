import { useFetchDataJSON } from "@/hooks/fetchdata";

interface NewsItem {
  title: string;
  image: string;
  date: string;
  description: string;
}

interface BlogItem {
  title: string;
  image: string;
}

interface NewsData {
  title: string;
  date: string;
  image: string;
  description: string;
  recentNews: NewsItem[];
  recentBlogs: BlogItem[];
}

export default function NewsPage() {
  const { loading, data, error } = useFetchDataJSON<NewsData>({
    path: "pages/activities/news/details.json",
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );

  if (error || !data)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600">{error || "Failed to load news."}</p>
      </div>
    );

  const { title, date, description, recentNews, recentBlogs } = data;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header placeholder */}
      <header className="w-full">{/* <Header /> */}</header>

      <main className="flex justify-center px-4 py-8">
        <div className="w-full max-w-[1080px]">
          <div className="grid lg:grid-cols-[3fr_.2fr_1fr] gap-8">
            {/* LEFT CONTENT */}
            <article className="prose max-w-none">
              <div className="overflow-hidden rounded-md">
                <img
                  src={data.image || "src/assets/dummy/image1.png"}
                  alt={title}
                  className="w-full object-cover max-h-[430px] h-full"
                />
              </div>

              <h1 className="mt-4 text-2xl font-extrabold text-left text-black">
                {title}
              </h1>
              <hr className="my-4 border-t border-gray-300" />

              <div className="flex items-center text-sm font-medium text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span>{date}</span>
              </div>

              <hr className="my-4 border-t border-gray-300" />

              <div className="text-base leading-relaxed text-justify">
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </div>

              <hr className="my-6 border-t border-gray-300" />

              <div className="mb-4 text-sm font-semibold text-[#002855] flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M13 7l5 5-5 5M6 7l5 5-5 5" />
                </svg>
                <span>YOU MIGHT ALSO LIKE</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentNews.map((i, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-md shadow-sm overflow-hidden"
                  >
                    <a
                      href={`/news/${index + 1}`}
                      className="block overflow-hidden"
                    >
                      <img
                        src={i.image}
                        alt={i.title}
                        className="w-full object-cover h-[140px] group-hover:scale-[1.05] transition-transform duration-500"
                      />
                    </a>
                    <div className="p-3">
                      <a
                        href={`/news/${index + 1}`}
                        className="text-sm font-semibold text-gray-900 hover:text-[#00629B]"
                      >
                        {i.title}
                      </a>
                      <p className="mt-2 text-xs text-gray-700 flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                        <span>{i.date}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* VERTICAL LINE */}
            <div className="hidden lg:block border-l border-gray-300" />

            {/* RIGHT SIDEBAR */}
            <aside className="pt-2">
              <div className="mb-2 text-lg font-normal text-gray-500">
                Recent Blogs
              </div>
              <hr className="mb-4 border-t border-gray-300" />

              <div className="space-y-4">
                {recentBlogs.map((b, index) => (
                  <div key={index}>
                    <a
                      href={`/blog/${index + 1}`}
                      className="flex items-center gap-2 text-sm text-gray-900 hover:text-[#00629B]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                      <span>{b.title}</span>
                    </a>
                    <hr className="mt-2 border-t border-gray-200" />
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <footer className="w-full">{/* <Footer /> */}</footer>
    </div>
  );
}
