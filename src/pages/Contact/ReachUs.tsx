import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';
import { useFetchDataAPI } from '@/hooks/fetchdata';
import { useState } from 'react';


const ReachUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
      });
    const [modalMsg, setModalMsg] = useState<string>("");
    const [showModal, setShowModal] = useState(false);
    
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    const { loading, data, refetch:saveFeedback } = useFetchDataAPI<any>({ apiUrl: `main_website/sc_ag_feedback/`, method: "POST", autoFetch: false });
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await saveFeedback(formData);

            setModalMsg(data?.message || "Feedback submitted successfully!");
        } catch (err: any) {
            setModalMsg(err.message || "Something went wrong!");
        } finally {
            setShowModal(true);
        }
    };

    return (
        <FadeIn>
            <div className='max-w-[1080px] mx-auto '>
                <div className="main_div flex md:flex-row flex-col gap-5">
                    <div className="location_div w-full md:w-1/2">
                        <SectionHeading title='Location' />
                        <div className='w-full  p-3 md:p-5'>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d262202.34953923954!2d90.295943648646!3d23.820934418097625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c64c103a8093%3A0xd660a4f50365294a!2sNorth%20South%20University!5e0!3m2!1sen!2sbd!4v1759575207960!5m2!1sen!2sbd" width="100%" height="490"></iframe>
                        </div>
                    </div>
                    <div className="contact_div w-full md:w-1/2">
                        <SectionHeading title='Contact Us' />
                        <form className=' p-3 md:p-5' onSubmit={handleSubmit}>

                            <p className='text-xl mb-3'>Your Name</p>
                            <input className="bg-[#75787b22] focus:outline-none text-black w-full border-none rounded-[3px] px-[10px] h-[45px]" type="text" placeholder="Name" name="name" required onChange={handleChange} />
                            <p className='text-xl mb-3 mt-[15px]'>Your Email</p>
                            <input className="bg-[#75787b22] focus:outline-none text-black w-full border-none rounded-[3px] px-[10px] h-[45px]" type="email" placeholder="Email" name="email" required onChange={handleChange}/>
                            <p className='text-xl mb-3 mt-[15px]'>Your Message</p>
                            <textarea className="min-h-[150px] px-[10px] pt-[10px] focus:outline-none w-full bg-[#75787b22] text-black border-none rounded-[3px] h-[200px] max-h-[200px]" placeholder="Your message here...." maxLength={1500} name="message" required onChange={handleChange}></textarea>
                            <div className='flex justify-center md:justify-end'>
                                <input className="text-[14px] hover:bg-[#002855] font-bold rounded hover:text-white w-[150px] border-1 cursor-pointer border-[#002855] transition-all duration-300 mt-3 py-2 px-0 
                        bg-white text-[#002855] hover:border-[#002855]" disabled={loading} type="submit" value={loading ? "SENDING..." : "SUBMIT"} />
                            </div>
                        </form>

                    </div>
                </div >
            </div >

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="bg-white rounded-lg p-6 w-80 text-center">
                    <p className="mb-4">{modalMsg || "Request sent successfully!"}</p>
                    <button
                    className="px-4 py-2 bg-ieee-blue text-white rounded hover:bg-ieee-darkblue"
                    onClick={() => setShowModal(false)}
                    >
                    Close
                    </button>
                </div>
                </div>
            )}
        </FadeIn>
    );
};

export default ReachUs;