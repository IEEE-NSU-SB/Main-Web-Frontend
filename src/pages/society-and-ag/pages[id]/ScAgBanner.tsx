import type { JSX } from 'react';
import { useParams } from 'react-router-dom';
import rasLogo from '../../../assets/logo/ras.png';
import pesLogo from '../../../assets/logo/pes.png';
import iasLogo from '../../../assets/logo/ias.png';
import wieLogo from '../../../assets/logo/wie.png';
import FadeIn from '@/components/ui/fade-in';

const AgBanner = () => {

    const { id } = useParams();


    const pageContent: Record<string, JSX.Element> = {

        "ieee-nsu-ras-sbc": (
            <>
                <FadeIn>
                    <div className='flex md:max-w-[1065px]  mx-auto flex-col-reverse md:flex-row px-3 py-4 items-center gap-5 mb-5'>
                        <div className='flex-1'>
                            <h2 className="font-bold text-4xl">ABOUT RAS</h2>
                            <div className="flex gap-1 max-w-[1000px]  mt-2 mb-4  max-sm:px"><div className="h-1 w-42 bg-[#602569] rounded-xs"></div><div className="h-1 w-2 bg-[#602569] rounded-xs"></div><div className="h-1 w-2 bg-[#602569] rounded-xs"></div></div>
                            <p className='text-[17px] text-justify'>The IEEE NSU Robotics and Automation Society Student Chapter, established on January 5th, 2017, is a pivotal technical chapter within the IEEE NSU Student Branch. Focused on research, study, and knowledge exchange in Robotics & Automation, It is the first Robotics and Automation Society Student Chapter in Bangladesh. Since its inception, the IEEE NSU RAS SB Chapter has been actively involved in promoting robotics and automation within the community. Through continuous evolution and member training, the chapter is committed to shaping future leaders in the field. Aligned with IEEE RAS standards, it maintains a steadfast dedication to upholding high academic standards in research and related literary endeavors.
                            </p>
                        </div>
                        <div className='flex-1'>
                            <img src={rasLogo} alt="res image" />
                        </div>
                    </div>
                </FadeIn>

            </>
        ),
        "ieee-nsu-pes-sbc": (
            <>
                <FadeIn>
                    <div className='flex md:max-w-[1065px]  mx-auto flex-col-reverse md:flex-row px-3 py-4 items-center gap-5 mb-5'>
                        <div className='flex-1'>
                            <h2 className="font-bold text-4xl">ABOUT PES</h2>
                            <div className="flex gap-1 max-w-[1100px]  mt-2 mb-4  max-sm:px"><div className="h-1 w-42 bg-[#679B41] rounded-xs"></div><div className="h-1 w-2 bg-[#679B41] rounded-xs"></div><div className="h-1 w-2 bg-[#679B41] rounded-xs"></div></div>
                            <p className='text-[17px] text-justify'>IEEE NSU PES Student Branch Chapter is a dynamic technical sub-unit of IEEE Societies committed to advancing knowledge and innovation in the field of electric power and energy. Its mission is to provide scientific and engineering information to benefit society and foster the professional development of our members. </p>
                            <p className='text-[17px] mt-4 text-justify'> IEEE NSU PES SBC is dedicated to conducting cutting-edge research activities and implementing advanced technological ideas to contribute to the field of Power and Energy. In recognition of its efforts, the IEEE NSU PES Student Branch Chapter has achieved notable milestones, including ranking 5th in the Asia Pacific [IEEE Region 10] as an IEEE PES High Performing Student Branch Chapter in 2020. Continuing the pursuit of excellence, this chapter has been awarded the title of High Performing Student Branch Chapter back-to-back in 2021, 2022, 2023 & 2024, with the highest grant received in Bangladesh. This recognition underscores the commitment to innovation, collaboration, and leadership in the realm of power and energy engineering.
                            </p>
                        </div>
                        <div className='flex-1'>
                            <img src={pesLogo} alt="res image" />
                        </div>
                    </div>
                </FadeIn>
            </>
        ),
        "ieee-nsu-ias-sbc": (
            <>
                <FadeIn>
                    <div className='flex md:max-w-[1065px]  mx-auto flex-col-reverse md:flex-row px-3 py-4 items-center gap-5 mb-5'>
                        <div className='flex-1'>
                            <h2 className="font-bold text-4xl">ABOUT IAS</h2>
                            <div className="flex gap-1 max-w-[1000px]  mt-2 mb-4  max-sm:px"><div className="h-1 w-42 bg-[#0F8E4B] rounded-xs"></div><div className="h-1 w-2 bg-[#0F8E4B] rounded-xs"></div><div className="h-1 w-2 bg-[#0F8E4B] rounded-xs"></div></div>
                            <p className='text-[17px] text-justify'>Like other technical societies under the Institute of Electrical and Electronics Engineers (IEEE), the IEEE Industry Applications Society (IEEE IAS) is also a society that works to make the transition between academics and corporations easier to pursue a better career.
                            </p>
                            <p className='text-[17px] text-justify mt-4'>
                                The IEEE North South University Industry Application Society was formed on June 9, 2018 as a chapter of the IEEE North South University Student Branch. Since day one, the priority of this foundation has been to validate the collaboration between students and corporations. To achieve this target, the society's members are working with their full potential to set a benchmark for the future.
                            </p>
                            <p className='text-[17px] text-justify mt-4'>
                                The society has also participated successfully in the very first summit of the IEEE Bangladesh Section Industry Application Society. Besides organizing events, they have also arranged several workshops in which professionals from different organizations instructed.
                            </p>
                        </div>
                        <div className='flex-1'>
                            <img src={iasLogo} alt="res image" />
                        </div>
                    </div>
                </FadeIn>
            </>
        ),
        "ieee-nsu-wie-ag": (
            <>
                <FadeIn>
                    <div className='flex md:max-w-[1065px]  mx-auto flex-col-reverse md:flex-row px-3 py-4 items-center gap-5 mb-5'>
                        <div className='flex-1'>
                            <h2 className="font-bold text-4xl">ABOUT WIE</h2>
                            <div className="flex gap-1 max-w-[1000px]  mt-2 mb-4  max-sm:px"><div className="h-1 w-42 bg-[#066697] rounded-xs"></div><div className="h-1 w-2 bg-[#066697] rounded-xs"></div><div className="h-1 w-2 bg-[#066697] rounded-xs"></div></div>
                            <p className='text-[17px] text-justify'>IEEE NSU Student Branch, Women in Engineering Affinity Group, is dedicated to empowering and inspiring women at North South University and beyond to pursue careers in IT and engineering. We envision a passionate community of IEEE members, both women and men, utilizing their talents for the betterment of our affinity group.
                            </p>
                            <p className='text-[17px] text-justify mt-4'>
                                This affinity group was established in 20th June 2016 and since then its members have been actively working on their events and projects. Historically in Bangladesh (and also in NSU), the female presence has been low in science and engineering subjects. So we have been working hard to encourage, engage and motivate the female students through IEEE opportunities for developing their skills in IT and engineering for professional career development.
                            </p>
                            <p className='text-[17px] text-justify mt-4'>
                                Our diverse events, encompassing both technical and non-technical events, aim to empower students through workshops, mentorship programs, and various initiatives, providing them with the skills and necessary support for success in STEM careers.
                            </p>
                        </div>
                        <div className='flex-1'>
                            <img src={wieLogo} alt="res image" />
                        </div>
                    </div>
                </FadeIn>
            </>
        )
    }



    const page_content = id && pageContent[id];


    return (
        <div>

            {page_content}

        </div>
    );
};

export default AgBanner;