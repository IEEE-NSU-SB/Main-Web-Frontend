
import FadeIn from '@/components/ui/fade-in';
import { use, type FC } from 'react';
import { useParams } from 'react-router';


interface MissionVision {
    id: number;
    filteredKey: string;
    mission_image: string;
    mission_description: string;
    vision_image: string;
    vision_description: string;
}

interface MissionVisionData {
    missionVision: MissionVision[]
}

interface MissionVisionProps {
    missionVisionPromise: Promise<MissionVisionData>
}



const ScAgMissionVision: FC<MissionVisionProps> = ({ missionVisionPromise }) => {
    const { id } = useParams();
    const missionVisionData: MissionVisionData = use(missionVisionPromise);


    //   filtered 
    const elementMapping: Record<string, MissionVision[]> = {
        "ieee-nsu-ras-sbc": missionVisionData.missionVision.filter(event =>
            event.filteredKey?.toLowerCase().includes("ras")
        ),
        "ieee-nsu-pes-sbc": missionVisionData.missionVision.filter(event =>
            event.filteredKey?.toLowerCase().includes("pes")
        ),
        "ieee-nsu-ias-sbc": missionVisionData.missionVision.filter(event =>
            event.filteredKey?.toLowerCase().includes("ias")
        ),
        "ieee-nsu-wie-ag": missionVisionData.missionVision.filter(event =>
            event.filteredKey?.toLowerCase().includes("wie")
        ),
    }
    // console.log(elementMapping);



    const missionVisionShow = id && elementMapping[id] ? elementMapping[id] : missionVisionData.missionVision;


    // console.log(missionVisionShow)



    return (
        <>
            <FadeIn>
                <div className="md:max-w-[1065px] w-full mx-auto my-10 px-3">
                    {
                        missionVisionShow.map((element, index) => (
                            
                              <div key={index}>
                                  {/* mission  */}
                                <div className='flex my-3 bg-[#006CA5]  md:flex-row flex-col rounded-md border'>
                                    <div className="text-part w-full md:w-1/2 p-7  text-white text-justify">
                                        <h1 className='text-5xl font-bold mb-7'>Mission</h1>
                                        <p>{element.mission_description}</p>
                                    </div>
                                    <div className="img-part w-full md:w-1/2">
                                        <img src={element.mission_image} className='rounded-r-md w-full h-full object-cover' alt="" />
                                    </div>
                                </div>
                                {/* vision  */}
                                <div className='flex my-6 bg-[#006CA5]  md:flex-row-reverse flex-col rounded-md border'>
                                    <div className="text-part w-full md:w-1/2 p-7  text-white text-justify">
                                        <h1 className='text-5xl font-bold mb-7'>Vision</h1>
                                        <p>{element.vision_description}</p>
                                    </div>
                                    <div className="img-part w-full md:w-1/2">
                                        <img src={element.vision_image} className='rounded-l-md w-full h-full object-cover' alt="" />
                                    </div>
                                </div>
                              </div>


                            
                        ))
                    }
                </div>
            </FadeIn>

        </>
    );
};

export default ScAgMissionVision;