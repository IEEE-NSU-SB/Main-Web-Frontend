import React from 'react'

const Description = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto text-center md:text-left gap-8 px-6 py-12">
            <img
                src="../../../assets/IEEE_Region_10.png"
                alt="IEEE Region 10"
                className="w-60 md:w-72 object-contain"
            />

            <div className="flex flex-col justify-center items-center md:items-start max-w-2xl">
                <h2 className="text-2xl font-bold text-[#003366] relative">
                IEEE REGION 10
                <span className="absolute left-0 -bottom-1 w-16 h-1 bg-[#FFC72C] rounded"></span>
                </h2>

                <p className="mt-4 text-gray-700 leading-relaxed">
                In the Institute of Electrical and Electronics Engineers (<b>IEEE</b>)
                there are 422,000 members from 160 countries. The Asia-Pacific region
                (also known as IEEE Region 10) is the largest, with over 130,000 members.
                This is the most cohesive community with everyone tied together like a
                family. This is most certainly the base for all Asian-Pacific
                organizational units.
                </p>

                <button className="mt-6 bg-[#003366] text-white font-semibold px-6 py-2 rounded hover:bg-[#004080] transition cursor-pointer">Region 10 History</button>
            </div>
        </div>
  )
}

export default Description;