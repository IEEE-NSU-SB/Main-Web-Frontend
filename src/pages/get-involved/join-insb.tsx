import { useEffect, useState } from 'react';
import Hourglass from './assets/img/hourglass.gif';
import { ExternalLink } from 'lucide-react';

interface RecruitSession {
  session_end_date_time: string;
  recruitment_event_link?: string;
}

interface Props {
  recruitSession?: RecruitSession;
}

export default function RecruitmentPage({ recruitSession }: Props) {
  const [timeLeft, setTimeLeft] = useState<{
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  }>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {

    document.title = "Join IEEE NSU Student Branch";

    if (!recruitSession?.session_end_date_time) return;

    const endDate = new Date(recruitSession.session_end_date_time);

    const updateCountdown = () => {
      const now = new Date();
      const distance = endDate.getTime() - now.getTime();

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        setTimeLeft({
          days: days.toString(),
          hours: hours < 10 ? `0${hours}` : `${hours}`,
          minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
          seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [recruitSession]);


  return (
        <div className=" m-auto max-w-[1038px] px-4 mt-5 mb-28">
          <div className="flex flex-col items-center">
            {recruitSession ? (
              <>
                <h1 className="text-ieee-darkblue font-semibold mt-8 mb-[20px] max-sm:mb-0 text-4xl max-sm:text-lg">
                  Recruitment Ongoing!
                </h1>
                <h1 className="text-ieee-darkblue font-semibold mb-6 max-sm:mb-4 text-4xl max-sm:text-lg">
                  Meet us in front of recreation hall
                </h1>

                {/* YouTube Embed */}
                <div className="aspect-w-16 aspect-h-9 w-160 h-90 max-md:w-80 max-md:h-45">
                    <iframe
                    className="w-full h-full rounded-sm"
                    src="https://www.youtube.com/embed/4qV8-J1gtXg?si=4N8nKSGUCEoMuCha"
                    title="IEEE NSU Recruitment Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    ></iframe>
                </div>

                {recruitSession.recruitment_event_link && (
                  <h4
                    className="flex items-center justify-center cursor-pointer transition-all duration-200 border-3 border-ieee-blue text-ieee-blue hover:text-ieee-yellow hover:border-ieee-yellow px-4 py-1 rounded-sm text-xl mt-4 max-md:w-80 font-semibold"
                    onClick={() => window.location.href = recruitSession.recruitment_event_link ?? '#'}
                  >
                    <ExternalLink size={16} className='mr-2'/>
                    Recruitment Event Link
                  </h4>
                )}

                <div className="text-ieee-black-75 mx-auto text-center mt-8">
                  <div id="countdown">
                    <ul className="flex flex-wrap justify-center gap-4">
                      <li className="text-lg uppercase">
                        <span className="block text-5xl max-sm:text-3xl">{timeLeft.days}</span>Days
                      </li>
                      <li className="text-lg uppercase">
                        <span className="block text-5xl max-sm:text-3xl">{timeLeft.hours}</span>Hours
                      </li>
                      <li className="text-lg uppercase">
                        <span className="block text-5xl max-sm:text-3xl">{timeLeft.minutes}</span>Minutes
                      </li>
                      <li className="text-lg uppercase">
                        <span className="block text-5xl max-sm:text-3xl">{timeLeft.seconds}</span>Seconds
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="overflow-hidden transition-all duration-500">
                  <img
                    src={Hourglass}
                    alt="Recruitment Soon"
                    className="max-w-[350px] max-h-[350px] w-full h-full object-cover scale-100 sm:scale-150 sm:left-6 relative my-15 max-md:my-0"
                  />
                </div>
                <p className="text-ieee-darkblue font-bold text-4xl mt-4 max-sm:text-lg">
                  Recruitment process will be announced soon!
                </p>
              </>
            )}
          </div>
        </div>
  );
}
