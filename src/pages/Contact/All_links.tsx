import FadeIn from "@/components/ui/fade-in";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import { MapPin, Mail, Phone, Share2, Facebook, Linkedin, Instagram, Youtube } from "lucide-react";

type ContactResponse = {
    address: string;
    email_address: string[];
    mobile_number: string[];
    social_media_link: string[];
};

const All_links = () => {
    const { data } = useFetchDataJSON<ContactResponse>({
        path: "pages/Contact/contact.json",
    });

    if (!data) return null;

    return (
        <FadeIn>
            <div className="max-w-[1080px] mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Address */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-28 h-28 rounded-full bg-gray-600  hover:bg-black transition-all duration-300 ease-in-out  flex items-center justify-center mb-4">
                            <MapPin className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Address</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {data.address}
                        </p>
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-28 h-28 rounded-full bg-gray-600  hover:bg-black transition-all duration-300 ease-in-out  flex items-center justify-center mb-4">
                            <Mail className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Email Address</h3>
                        <div className="space-y-2">
                            {data.email_address.map((email, index) => (
                                <div key={index}>
                                    <a
                                        href={`mailto:${email}`}
                                        className="text-gray-700 hover:text-blue-600 text-sm block"
                                    >
                                        {email}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Number */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-28 h-28 rounded-full bg-gray-600  hover:bg-black transition-all duration-300 ease-in-out  flex items-center justify-center mb-4">
                            <Phone className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Mobile Number</h3>
                        <div className="space-y-2">
                            {data.mobile_number.map((number, index) => (
                                <div key={index}>
                                    <a
                                        href={`tel:${number}`}
                                        className="text-gray-700 hover:text-blue-600 text-sm block"
                                    >
                                        {number}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-28 h-28 rounded-full bg-gray-600 hover:bg-black transition-all duration-300 ease-in-out flex items-center justify-center mb-4">
                            <Share2 className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Social Media</h3>
                        <div className="flex gap-2 justify-center flex-wrap">
                            {data.social_media_link.map((link, index) => {
                                const getSocialIcon = (url: string) => {
                                    const lowerUrl = url.toLowerCase();
                                    if (lowerUrl.includes('facebook')) return <Facebook className="w-5 h-5 text-white" />;
                                    if (lowerUrl.includes('linkedin')) return <Linkedin className="w-5 h-5 text-white" />;
                                    if (lowerUrl.includes('instagram')) return <Instagram className="w-5 h-5 text-white" />;
                                    if (lowerUrl.includes('youtube')) return <Youtube className="w-5 h-5 text-white" />;
                                    if (lowerUrl.includes('twitter') || lowerUrl.includes('x.com')) return (
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    );
                                    return <Share2 className="w-5 h-5 text-white" />;
                                };

                                return (
                                    <a
                                        key={index}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 transition-all duration-300 ease-in-out
                                             bg-[#002855] rounded flex items-center justify-center hover:bg-[#ffd100]"
                                    >
                                        {getSocialIcon(link)}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
};

export default All_links;