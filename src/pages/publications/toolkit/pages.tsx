import Wave from "@/components/wave";

import { useFetchDataJSON } from "@/hooks/fetchdata";
import ErrorMessage from "@/components/ui/error-msg";
import Skeleton from "@/components/skeleton";
import FadeIn from "@/components/ui/fade-in";

type Toolkit = {
  title: string;
  img: string;
  colors: string[];
  file: string;
};

const Pages = () => {
  const { loading, data, error, refetch } = useFetchDataJSON<Toolkit[]>({
    path: "pages/publications/toolkit/data/toolkit.json",
  });

  const toolkit: Toolkit[] = data ?? [];

  console.log("Fetched data:", toolkit);
  return (
    <>
      <Wave title="Toolkit" />
      <section className="max-w-[1080px] mx-auto px-0 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            <Skeleton className="h-85 w-70" />
            <Skeleton className="h-85 w-70" />
            <Skeleton className="h-85 w-70" />
            <Skeleton className="h-85 w-70" />
            <Skeleton className="h-85 w-70" />
            <Skeleton className="h-85 w-70" />
          </div>
        ) : error ? (
          <ErrorMessage message={"Failed to load stats"} onRetry={refetch} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {toolkit.map((toolkit, index) => (
              <FadeIn key={index}>
                <div className="w-[295px] bg-white rounded-2xl shadow-lg p-6 flex flex-col text-center border hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full">
                  <img
                    src={toolkit.img}
                    alt={toolkit.title}
                    className="h-20 mx-auto mb-4 object-contain"
                  />
                  <h4 className="text-lg font-bold">{toolkit.title}</h4>

                  <div
                    className={`${
                      toolkit.title === "IEEE NSU SB Logo (Rectangular)"
                        ? "mt-4"
                        : "mt-10"
                    }`}
                  >
                    <p className="font-semibold mb-2">Color codes</p>
                    <ul className="flex flex-wrap justify-center gap-4 mb-6">
                      {toolkit.colors.map((colors, i) => {
                        const [name, hex] = colors.split(":");
                        return (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span
                              className="w-4 h-4 rounded-full border shadow-sm"
                              style={{ backgroundColor: hex.trim() }}
                            ></span>
                            <span>
                              {name}: {hex}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <a
                    href={toolkit.file}
                    download
                    className="mt-auto px-6 py-2 bg-blue-900 text-white border border-blue-900 rounded-md hover:bg-transparent hover:text-blue-900 transition-colors"
                  >
                    Download PNG
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Pages;
