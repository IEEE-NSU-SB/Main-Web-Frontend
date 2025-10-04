import { useFetchDataJSON } from "@/hooks/fetchdata";
import './contact.json';

// Define the type based on your JSON structure
type ContactResponse = {
    address: string;
    email_address: string[];
    mobile_number: string[];
    social_media_link: string[];
};




    const All_links = () => {
        const { loading, data, error, refetch } = useFetchDataJSON<ContactResponse>({
            path:"./contact.json",
        });

    // if (loading) {
    //     return (
    //         <div className="max-w-[1080px] mx-auto py-3">
    //             <p>Loading...</p>
    //         </div>
    //     );
    // }

    // if (error) {
    //     return (
    //         <div className="max-w-[1080px] mx-auto py-3">
    //             <p className="text-red-500">Error: {error}</p>
    //             <button onClick={refetch} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
    //                 Retry
    //             </button>
    //         </div>
    //     );
    // }

    return (
        <div className="max-w-[1080px] mx-auto py-3">
            <h3 className="text-2xl font-bold mb-4">All Links</h3>
            
            {data && (
                <div className="space-y-6">
                    {/* Address */}
                    <div>
                        <h4 className="font-semibold text-lg mb-2">Address</h4>
                        <p>{data.address}</p>
                    </div>

                    {/* Email Addresses */}
                    <div>
                        <h4 className="font-semibold text-lg mb-2">Email Addresses</h4>
                        <ul className="space-y-1">
                            {data.email_address.map((email, index) => (
                                <li key={index}>
                                    <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
                                        {email}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Mobile Numbers */}
                    <div>
                        <h4 className="font-semibold text-lg mb-2">Mobile Numbers</h4>
                        <ul className="space-y-1">
                            {data.mobile_number.map((number, index) => (
                                <li key={index}>
                                    <a href={`tel:${number}`} className="text-blue-600 hover:underline">
                                        {number}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h4 className="font-semibold text-lg mb-2">Social Media</h4>
                        <ul className="space-y-1">
                            {data.social_media_link.map((link, index) => (
                                <li key={index}>
                                    <a 
                                        href={link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default All_links;