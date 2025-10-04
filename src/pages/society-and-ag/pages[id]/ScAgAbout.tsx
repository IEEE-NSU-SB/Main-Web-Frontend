
import { use, type FC } from 'react';
import { useParams } from 'react-router';

interface AGAbout {
    id: number;
    filteredKey: string;
    ag_group_name: string;
    question_1: string;
    question_2: string;
    question_3: string;
    question_4: string;
}

interface AGAboutData {
    agAbout: AGAbout[]
}

interface AGAboutProps {
    aboutPromise: Promise<AGAboutData>
}

const ScAgAbout: FC<AGAboutProps> = ({ aboutPromise }) => {
    const { id } = useParams();
    const agAboutData: AGAboutData = use(aboutPromise);

    // filtered
    const elementMapping: Record<string, AGAbout[]> = {
        "ieee-nsu-ras-sbc": agAboutData.agAbout.filter(event =>
            event.filteredKey?.toLowerCase().includes("ras")
        ),
        "ieee-nsu-pes-sbc": agAboutData.agAbout.filter(event =>
            event.filteredKey?.toLowerCase().includes("pes")
        ),
        "ieee-nsu-ias-sbc": agAboutData.agAbout.filter(event =>
            event.filteredKey?.toLowerCase().includes("ias")
        ),
        "ieee-nsu-wie-ag": agAboutData.agAbout.filter(event =>
            event.filteredKey?.toLowerCase().includes("wie")
        ),
    }

    // Get the filtered data based on the id
    const agAboutShow = id && elementMapping[id] ? elementMapping[id] : agAboutData.agAbout;
    console.log(agAboutShow)

    return (
        <div className="w-full bg-black text-white mx-auto my-10 px-3">
            {agAboutShow.map(element => {
                return (
                    <div key={element.id} className='md:max-w-[1040px] mx-auto'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 '>
                            <div className='flex flex-col'>
                                <h1>What is {element.ag_group_name}?</h1>
                                <p>{element.question_1}</p>
                            </div>
                            <div className='flex flex-col'>
                                <h1>Why join {element.ag_group_name}?</h1>
                                <p>{element.question_2}</p>
                            </div>
                            <div className='flex flex-col'>
                                <h1>What activities do we usually do?</h1>
                                <p>{element.question_3}</p>
                            </div>
                            <div className='flex flex-col'>
                                <h1>How to join IEEE NSU {element.ag_group_name} SBC?</h1>
                                <p>{element.question_4}</p>
                            </div>




                        </div>
                        {/* <div></div>
                        <div></div>
                        <div></div> */}

                    </div>
                );
            })}
        </div>
    )

}

export default ScAgAbout;