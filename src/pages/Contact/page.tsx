import FadeIn from '@/components/ui/fade-in';
import Wave from '@/components/wave';
// import All_links from './All_links';
import ReachUs from './ReachUs';
import FollowUs from './FollowUs';
import YtSection from './YtSection';


const Contact = () => {


 






    return (
        <div>
            <Wave title="Contact"></Wave>
            <FadeIn>

                {/* <All_links></All_links> */}
                <ReachUs></ReachUs>
                <FollowUs></FollowUs>
                <YtSection></YtSection>

            </FadeIn>

        </div>
    );
};

export default Contact;