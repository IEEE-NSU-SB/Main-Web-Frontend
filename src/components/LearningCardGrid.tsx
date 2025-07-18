

import "./../App.css";
import iconService1 from "./../assets/icon-service-1.png";

export default function LearningCardGrid() {
    const learningData = Array(6).fill({
        title: "LEARNING",
        description:
            "We immerse ourselves in learning about appearing technologies traversing diverse fields such as electronics, programming, robotics, and more. Concurrently, we confront various research endeavors to foster improvement and innovation.",
    });

    return (
        <div className=" max-w-[1078px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-12">
            {learningData.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                    <div className="text-xl text-blue-600 mt-1"><img src={iconService1} /></div>
                    <div className="text-left">
                        <h3 className="font-bold text-gray-800 mb-3">{item.title}</h3>
                        <p className="text-gray-600 text-base/6 learning-card-grid.text">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}