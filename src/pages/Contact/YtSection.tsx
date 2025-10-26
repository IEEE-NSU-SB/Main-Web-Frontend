import FadeIn from "@/components/ui/FadeIn";


const YtSection = () => {
    return (
        <FadeIn>
            <div className='max-w-[1080px] mx-auto flex md:flex-row flex-col gap-6 items-center justify-center p-3 md:p-5 my-10'>
                <div className="text_div flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2">
                    <h2 className="text-[40px] font-bold">Subscribe to our <br /> Youtube Channel</h2>
                    <button className="font-poppins  font-bold bg-[#BA0C2F] border-2 border-white py-2 px-0 cursor-pointer block rounded-md transition-all duration-300 ease-in-out mt-5 active:bg-[#BA0C2F] hover:bg-white hover:text-[#BA0C2F] hover:border-[#BA0C2F] hover:shadow-lg"><a className="text-white no-underline px-8 py-4 hover:text-[#BA0C2F]" href="https://www.youtube.com/channel/UCR--MNc_lCe9lvgdnSWm6kA">Our Youtube
                        Channel</a></button>
                </div>
                <div className="video_div w-full md:w-1/2">
                    <iframe className="w-full rounded-sm h-[360px]" src="https://www.youtube.com/embed/Z4_zikeiNQ8?si=6j_UflrVqQ_vrnUT"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                </div>
            </div>
        </FadeIn>

    );
};

export default YtSection;