import SectionHeading from "@/components/ui/SectionHeading";

const ScAgContact: React.FC = () => {


    return (


        <>

            <SectionHeading title="CONTACT" widthClass="w-33"></SectionHeading>
            <div className="md:max-w-[1080px] w-full mx-auto my-10 px-3">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block  text-lg font-medium mb-2">
                            Name:
                        </label>
                        <input
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 text-lg border rounded-md focus:shadow-[0_0_3px_#008CC4]"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-lg font-medium mb-2">
                            Email:
                        </label>
                        <input
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 text-lg border rounded-md focus:shadow-[0_0_3px_#008CC4]"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block  text-lg font-medium mb-2">
                            Your Message:
                        </label>
                        <textarea
                            placeholder="Enter your message"
                            rows={6}
                            className="w-full px-4 py-3 text-lg border rounded-md focus:shadow-[0_0_3px_#008CC4]"
                        />
                    </div>

                    <div className="flex justify-center pt-4">
                        <button
                            className="px-12 py-3 bg-blue-900 text-white text-lg font-semibold rounded-md hover:bg-blue-800 transition-colors duration-200 focus:outline-none "
                        >
                            SUBMIT
                        </button>
                    </div>
                </div>

            </div>

        </>
    );
};

export default ScAgContact;