
import young_image from "../../../assets/Young_Professionals.jpeg"

const YoungProfessionals = () => {
  return (
    <>
         <div className="bg-gray-50 border-b border-blue-200 py-12 px-6">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto gap-8 text-center md:text-left">
            
            <div className="flex flex-col justify-center items-center md:items-start max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[#002855] relative">
                Young Professionals
                <span className="absolute left-0 -bottom-1 w-16 h-1 bg-[#FFC72C] rounded"></span>
            </h2>

            <p className="mt-4 text-gray-700 leading-relaxed">
                Institute of Electrical and Electronics Engineers (<b>IEEE</b>)
                Region 10 <b>Young Professionals (YP)</b> is a community of imaginative
                and creative members and volunteers across Asia Pacific. The Institute of
                Electrical and Electronics Engineers (<b>IEEE</b>) was established to assist
                young professionals in achieving their career goals, cultivating a dazzling
                professional image, and establishing a high profile in a variety of fields.
            </p>

            <a href="#" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#002855] hover:underline">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
                </svg>
                IEEE R10 YP
            </a>
                </div>
                    <img src={young_image} alt="IEEE Region 10 Young Professionals" className="w-72 md:w-80 rounded-md object-cover contain"/>
                </div>
        </div>
    </>
    
  )
}

export default YoungProfessionals














