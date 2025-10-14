import Wave from '@/components/Wave';
import { useParams } from "react-router-dom";

const AgWave = () => {
    const { id } = useParams();

    const waveContent: Record<string, { title: string; subtitle: string }> = {
        "ieee-nsu-ras-sbc": {
            title: "IEEE NSU Robotics & Automation Society Student Branch Chapter",
            subtitle: "Igniting Innovation, Fostering Connectivity",
        },
        "ieee-nsu-pes-sbc": {
            title: "IEEE NSU Power & Energy Society Student Branch Chapter",
            subtitle: "Leveraging Technology by Powering the Future",
        },
        "ieee-nsu-ias-sbc": {
            title: "IEEE NSU IAS STUDENT BRANCH CHAPTER",
            subtitle: "Connect to the Industry Professionals",
        },
        "ieee-nsu-wie-ag": {
            title: "IEEE NSU Student Branch, Women In Engineering Affinity Group",
            subtitle: "Empowering Futures: Women Leading Engineering Innovation",
        }
    };

    const societyColors: Record<string, string> = {
        "ieee-nsu-ras-sbc": "#602569",
        "ieee-nsu-pes-sbc": "#659941",
        "ieee-nsu-ias-sbc": "#0f904b",
        "ieee-nsu-wie-ag": "#006699",
    };

    const wave_content = id && waveContent[id];
    const color = id ? societyColors[id] : "#002855"; // fallback for others

    return (
        <div>
            {wave_content && (
                <Wave
                    title={wave_content.title}
                    subtitle={wave_content.subtitle}
                    color={color} // pass the society color
                />
            )}
        </div>
    );
};

export default AgWave;
