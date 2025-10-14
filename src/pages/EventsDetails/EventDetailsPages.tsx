import Wave from '@/components/wave';
import BannerRegister from './BannerRegister';


const EventDetailsPages = () => {
    return (
        <>
            <Wave title='EEE STEP 2020: Transition to Sustainable Future' subtitle='IEEE NSU Student Branch'></Wave>
            <div className="max-w-[1080px] mx-auto px-4 py-6">
                <BannerRegister></BannerRegister>
            </div>
        </>
    );
};

export default EventDetailsPages;