import { FaEnvelope, FaFacebook, FaLinkedin } from "react-icons/fa";

const ExecutiveBodySection = () => {
  const members = [
    {
      name: "Md Tasbeer Ahmed",
      role: "Chair, RAS",
      email: "https://mail.google.com/mail/u/0/?fs=1&to=tasbeer.ahmed@ieee.org&tf=cm",
      facebook: "https://www.facebook.com/tasbeer.242/?_rdc=1&_rdr#",
      linkedin: "https://www.linkedin.com/in/tasbeer-ahmed-b21b541b9/",
    },
    {
      name: "Washio Ferdous",
      role: "Treasurer, RAS",
      email: "https://mail.google.com/mail/u/0/?fs=1&to=washio.ferdous@ieee.org&tf=cm",
      facebook: "https://www.facebook.com/wf.rubai.10",
      linkedin: "",
    },
    {
      name: "Shamsia Munira",
      role: "Secretary, RAS",
      email: "",
      facebook: "https://www.facebook.com/shamsia.munira.2025/",
      linkedin: "https://www.linkedin.com/in/shamsia-munira-619989297/",
    },
    {
      name: "Nishat Farhat Eva",
      role: "Vice-Chair (Activity), RAS",
      email: "https://mail.google.com/mail/u/0/?fs=1&to=nishatfarhat@ieee.org&tf=cm",
      facebook: "https://www.facebook.com/nishat.farhat.982?mibextid=JRoKGi",
      linkedin: "",
    },
    {
      name: "Saima Alam",
      role: "Vice-Chair (Technical), RAS",
      email: "https://mail.google.com/mail/u/0/?fs=1&to=saimaalam989@gmail.com&tf=cm",
      facebook: "https://www.facebook.com/kiyomi.saima.7?mibextid=2JQ9oc",
      linkedin:
        "https://www.linkedin.com/in/saima-alam-905b3a2b3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  ];

  const defaultImage =
    "https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740&q=80";

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1050px] mx-auto px-8 md:px-14 lg:px-1">
        <h2 className="text-3xl md:text-[32px] font-extrabold text-[#2d2d2d] text-left tracking-tight">
          MEET OUR EXECUTIVE BODY
        </h2>
        <div className="w-16 h-[4px] bg-[#602569] mt-1 mb-14"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16 justify-items-center mt-25">
          {members.slice(0, 4).map((member, index) => (
            <div
              key={index}
              className="w-[220px] bg-white rounded-xl shadow-md text-center pt-14 pb-10 px-6 hover:shadow-xl transition-all duration-300 relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[45%] w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-200">
                <img
                  src={defaultImage}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <h3 className="font-semibold text-lg text-gray-800 mt-12">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600 mt-2 mb-6">{member.role}</p>

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
          ))}
        </div>

        <div className="flex justify-center mt-20">
          {members.slice(4, 5).map((member, index) => (
            <div
              key={index}
              className="w-[260px] bg-white rounded-xl shadow-md text-center pt-14 pb-10 px-6 hover:shadow-xl transition-all duration-300 relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[45%] w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-200">
                <img
                  src={defaultImage}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <h3 className="font-semibold text-lg text-gray-800 mt-12">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600 mt-2 mb-6">{member.role}</p>

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
          ))}
        </div>

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
      </div>
    </section>
  );
};

export default ExecutiveBodySection;
