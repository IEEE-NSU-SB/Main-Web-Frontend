import React from 'react'
import { ExternalLink } from "lucide-react";

const Membership = () => {
  return (
    <>
     {/* Membership */}
        <section className="flex flex-col md:flex-row items-center justify-center gap-2 px-6 py-12 md:px-65 md:py-10 bg-white">
        {/* Left Illustration */}
        <div className="w-full md:w-1/3 flex justify-center">
            <img
            src="/membership-illustration.png" 
            alt="Membership Development Illustration"
            className="max-w-xs md:max-w-sm"
            />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-2/3">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a2147] mb-4">
                    Membership Development
                    <span className="block w-16 h-1 bg-yellow-400 mt-2"></span>
            </h2>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-6">
            The Membership Development and Leadership Training (MDLT) Fund of the
            Institute of Electrical and Electronics Engineers (
            <span className="font-semibold">IEEE</span>) Region 10{" "}
            <span className="font-semibold">Student Activities Committee (SAC)</span> was established to persuade
            sections/student divisions to arrange events for the training of
            professionalism and growing up with leadership experience.
            </p>

            {/* Links */}
            <div className="flex flex-col gap-2">
            <a
                href="#"
                className="flex items-center gap-2 text-[#0a2147] font-semibold hover:text-yellow-500 transition"
            >
                <ExternalLink size={16} strokeWidth={2.2} />
                Membership Development
            </a>
                <a href="#" className="flex items-center gap-2 text-[#0a2147] font-semibold hover:text-yellow-500 transition">
                <ExternalLink size={16} strokeWidth={2.2} />
                Membership Activities
            </a>
            </div>
        </div>
        </section>
        </>
  )
}

export default Membership