import Wave from '@/components/Wave';
import TopSection from './TopSection';
import MidSection from './MidSection';



const EventDetailsPages = () => {
    return (
        <>
            <Wave title='EEEE STEP 2020: Transition to Sustainable Future' subtitle='IEEE NSU Student Branch'></Wave>
            <div className="max-w-[1080px] mx-auto px-4 py-6">
                <TopSection></TopSection>
            </div>
            <div className='max-w-[1080px] mx-auto px-4 py-6"'>
                <MidSection></MidSection>
            </div>
        </>
    );
};

export default EventDetailsPages;