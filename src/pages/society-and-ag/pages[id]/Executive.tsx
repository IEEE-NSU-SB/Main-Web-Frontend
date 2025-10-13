import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { FaEnvelope, FaFacebook, FaLinkedin } from "react-icons/fa";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";

const ExecutiveBodySection = () => {
  const { loading, data: members, error, refetch } = useFetchDataJSON({
    path: "pages/society-and-ag/data/members.json",
  });

  const defaultImage =
    "https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740&q=80";

  return (
    <section className="max-w-[1080px] mx-auto py-2 pb-16">
      <SectionHeading title="Our Executive Body" widthClass="w-72" />

      {loading ? (
        <div className="flex flex-wrap justify-center items-center mt-26 gap-x-8 gap-y-17 max-w-[1020px]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-[220px] bg-white rounded-xl shadow-md text-center pt-14 pb-5 px-6"
            >
              <Skeleton className="h-40 w-40 rounded-[500px] m-auto" />
              <div className="space-y-3 mt-10">
                <Skeleton className="h-4 w-8/12 mx-auto" />
                <Skeleton className="h-3 w-6/12 mx-auto" />
                <div className="flex justify-center gap-4 pt-4">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <ErrorMessage message="Failed to load members" onRetry={refetch} />
      ) : (
        <div className="flex flex-wrap justify-center items-center mt-26 gap-x-8 gap-y-17 px-5 max-w-[1080px]">
          {members.map((member: any, index: number) => (
            <FadeIn key={index}>
              <div className="w-[235px] bg-white rounded-xl shadow-md border text-center pt-4 pb-10 hover:shadow-xl transition-all duration-300 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[65%] w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-200">
                  <img
                    src={defaultImage}
                    alt={member.name}
                    className="object-cover w-full h-full"
                  />
                </div>

                <h3 className="font-semibold text-lg text-gray-800 mt-12">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2 mb-6">
                  {member.role}
                </p>

                <div className="flex justify-center gap-6 mt-auto">
                  {member.email && (
                    <a
                      href={member.email}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#602569] hover:text-[#3d1843] transition-colors"
                    >
                      <FaEnvelope size={20} />
                    </a>
                  )}
                  {member.facebook && (
                    <a
                      href={member.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#602569] hover:text-[#3d1843] transition-colors"
                    >
                      <FaFacebook size={20} />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#602569] hover:text-[#3d1843] transition-colors"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      )}

      {!loading && !error && (
        <div className="text-center mt-14">
          <a
            href="https://ieeensu.org/panels"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#602569] text-white rounded-md font-semibold hover:bg-[#3d1843] shadow-md transition-colors"
          >
            <i className="fa-solid fa-users"></i> See All Panels
          </a>
        </div>
      )}
    </section>
  );
};

export default ExecutiveBodySection;
