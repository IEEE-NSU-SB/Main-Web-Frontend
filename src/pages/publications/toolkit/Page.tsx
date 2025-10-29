import Wave from "@/components/Wave";

import { useFetchDataAPI } from "@/hooks/fetchdata";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Skeleton from "@/components/Skeleton";
import FadeIn from "@/components/ui/FadeIn";

type Toolkit = {
  title: string;
  img: string;
  colors: string[];
  file: string;
};

const Pages = () => {
  const { loading, data, error, refetch } = useFetchDataAPI<Toolkit[]>({
    apiUrl: "main_website/get_toolkit/",
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
                <div className="w-[295px] bg-ieee-white rounded-lg shadow-lg p-6 flex flex-col text-center border hover:shadow-xl transition-all duration-300 h-full">
                  <img
                    src={toolkit.img}
                    alt={toolkit.title}
                    className="h-20 mx-auto mb-4 object-contain"
                  />
                  <h4 className="text-lg font-semibold">{toolkit.title}</h4>

                  <div
                    className={`${
                      toolkit.title === "IEEE NSU SB Logo (Rectangular)"
                        ? "mt-4"
                        : "mt-10"
                    }`}
                  >
                    <p className="font-semibold mb-2">Color codes</p>
                    <ul className="flex flex-wrap justify-start gap-4 mb-6 ml-13">
                      {toolkit.colors.map((colorStr, i) => {
                        const normalize = (str: string) =>
                          str
                            .replace(/\u00A0/g, " ")
                            .replace(/&nbsp;/g, " ")
                            .trim();

                        const [name, hex] = colorStr
                          .split(":")
                          .map((v) => normalize(v));

                        return (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span
                              className="w-8 h-4 rounded border"
                              style={{ backgroundColor: hex }}
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
                    className="mt-auto px-6 py-2 hover:bg-ieee-darkblue-90 hover:text-white border border-ieee-darkblue-75 rounded-sm bg-transparent text-ieee-darkblue-75 transition-colors cursor-pointer"
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
