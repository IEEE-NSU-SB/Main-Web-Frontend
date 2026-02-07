import ieeeLogo from "@/assets/logo/insb.gif";
import luffy from "@/assets/dummy/image.png";
import { useState, useMemo } from "react";
import { useFetchDataAPI } from "@/hooks/fetchdata";

// Array of light colors for random backgrounds
const lightColors = [
	'#E3F2FD', // Light blue
	'#F3E5F5', // Light purple
	'#E8F5E8', // Light green
	'#FFF3E0', // Light orange
	'#FCE4EC', // Light pink
	'#E0F2F1', // Light teal
	'#F1F8E9', // Light lime
	'#EDE7F6', // Light indigo
	'#FFF8E1', // Light yellow
	'#FBE9E7', // Light red
];

interface Developer {
  name: string;
  role: string;
  quote: string | null;
  image: string;
  github_url: string;
  linkedin_url: string | null;
  facebook_url: string | null;
}

interface ProjectDevelopers {
  project_leads: Developer[];
  project_developers: Developer[];
}


// Function to get random light color
const getRandomLightColor = () => {
	return lightColors[Math.floor(Math.random() * lightColors.length)];
};


export default function DeveloperPage() {
	const { loading, data:developers, error, refetch } = useFetchDataAPI<ProjectDevelopers>({
		apiUrl: 'main_website/get_portal_developers/',
	  });

	const [hoveredCard, setHoveredCard] = useState<number | null>(null);

	// Generate random colors once and memoize them
	const developerColors = useMemo(() => {
		return developers?.project_leads.map(() => getRandomLightColor());
	}, []);

	return (
		<main className="bg-[#00629b0a]">
			<section className="max-w-[1100px] mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-6 sm:pb-10">
				<div className="flex max-sm:flex-col-reverse sm:flex-col md:flex-row gap-10 md:gap-12 items-start">
					<div className="flex-1">
						<h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 sm:leading-20">
							Meet the Minds
							<br />
							Behind IEEE NSU SB
						</h1>
						<p className="mt-6 text-base sm:text-lg text-gray-600 max-w-[560px]">
							A passionate group of engineers and designers building fast, modern
							and accessible web experiences for IEEE NSU Student Branch.
						</p>
						<p className="mt-5 text-sm sm:text-base text-gray-700 font-semibold">
							24th March, 2024 - Present
						</p>
					</div>

					<div className="w-full max-sm:w-[80px] md:w-[180px] flex md:justify-end">
						<img src={ieeeLogo} alt="IEEE NSU SB Logo" className="scale-110 md:pt-5"/>
					</div>
				</div>
			</section>

			<section className="max-w-[1100px] mx-auto px-5 py-15 sm:px-8 pb-16 sm:pb-24">
				<div className="inline-flex items-center gap-3 text-gray-900">
					<span className="text-xl sm:text-3xl pr-3 font-semibold">Meet our</span>
					<span className="relative px-4 py-1 text-xl sm:text-3xl text-ieee-blue">
						<span className="absolute -top-2 left-[-25px] right-[-25px] h-[3px] bg-ieee-blue"></span>
						<span className="absolute -bottom-2 left-[-25px] right-[-25px] h-[3px] bg-ieee-blue"></span>
						<span className="absolute -left-2 top-[-22px] bottom-[-22px] w-[3px] bg-ieee-blue"></span>
						<span className="absolute -right-2 top-[-22px] bottom-[-22px] w-[3px] bg-ieee-blue"></span>
						Lead Developers
					</span>
				</div>

				<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-15">
					{developers?.project_leads.map((developer, index) => {
						const randomColor = developerColors? developerColors[index] : '#1d8ccc98';
						return (
						<div
							key={`${developer.name}-${index}`}
							className="flex flex-col items-start relative group"
							onMouseEnter={() => setHoveredCard(index)}
							onMouseLeave={() => setHoveredCard(null)}
						>
							<div className="w-full aspect-[4/5] relative overflow-hidden">
								{/* Social Media Icons */}
								<div className={`absolute top-24 right-4 flex flex-col gap-2 transition-all duration-300 z-10 ${
									hoveredCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
								}`}>
									{developer.github_url && (
										<a
											href={developer.github_url}
											target="_blank"
											rel="noopener noreferrer"
											className="w-8 h-8 bg-black/70 hover:bg-black rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
											onClick={(e) => e.stopPropagation()}
										>
											<svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
												<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
											</svg>
										</a>
									)}
									{developer.linkedin_url && (
										<a
											href={developer.linkedin_url}
											target="_blank"
											rel="noopener noreferrer"
											className="w-8 h-8 bg-blue-600/70 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
											onClick={(e) => e.stopPropagation()}
										>
											<svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
												<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
											</svg>
										</a>
									)}
									{developer.facebook_url && (
										<a
											href={developer.facebook_url}
											target="_blank"
											rel="noopener noreferrer"
											className="w-8 h-8 bg-blue-700/70 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
											onClick={(e) => e.stopPropagation()}
										>
											<svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
												<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
											</svg>
										</a>
									)}
								</div>

								<div
									className="absolute bottom-0 left-0 right-0 rounded-2xl"
									style={{
										height: '80%',
										backgroundColor: randomColor
									}}
								>
									{/* Coding Elements Background - Now inside the colored area */}
									<div className="absolute inset-0 opacity-35 pointer-events-none">
										{/* Top area within colored background */}
										<div className="absolute top-4 left-4 text-ieee-darkblue text-xl font-mono">{'{'}</div>
										<div className="absolute top-18 left-8 text-ieee-darkblue text-sm font-mono">{'</>'}</div>

										{/* Middle area */}
										<div className="absolute top-22 right-6 text-ieee-darkblue text-lg font-mono">{'}'}</div>
										{/* <div className="absolute top-16 right-8 text-ieee-darkblue text-xs font-mono">{'[]'}</div> */}

										{/* Bottom area */}
										<div className="absolute bottom-8 left-6 text-ieee-darkblue text-sm font-mono">{'()'}</div>
										{/* <div className="absolute bottom-12 left-10 text-ieee-darkblue text-xs font-mono">{'<>'}</div> */}

										{/* Right side */}
										{/* <div className="absolute bottom-6 right-4 text-ieee-darkblue text-lg font-mono">{'{}'}</div> */}
										<div className="absolute bottom-10 right-10 text-ieee-darkblue text-xs font-mono">{'<script>'}</div>

										{/* Center elements */}
										<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-ieee-darkblue text-xs font-mono opacity-30">
											console.log('Hello World')
										</div>

										{/* Scattered elements */}
										<div className="absolute top-8 left-12 text-ieee-darkblue text-xs font-mono opacity-85">{'function'}</div>
										<div className="absolute top-16 right-12 text-ieee-darkblue text-xs font-mono opacity-85">{'const'}</div>
										<div className="absolute bottom-16 left-12 text-ieee-darkblue text-xs font-mono opacity-85">{'return'}</div>
										<div className="absolute bottom-20 right-12 text-ieee-darkblue text-xs font-mono opacity-85">{'import'}</div>
									</div>
								</div>

								<img
									src={developer.image}
									alt={developer.name}
									className="w-full h-full object-cover absolute inset-0"
								/>
							</div>
							<div className="mt-4">
								<h3 className="text-base sm:text-lg font-semibold text-gray-900">
									{developer.name}
								</h3>
								<p className="text-sm text-gray-600">{developer.role}</p>
								{developer.quote && (
									<p className="mt-2 text-xs sm:text-sm text-gray-500 italic">
										{developer.quote}
									</p>
								)}
							</div>
						</div>
					);
					})}
				</div>
			</section>

			<section className="max-w-[1100px] mx-auto px-5 py-15 sm:px-8 pb-16 sm:pb-24">
				<div className="inline-flex items-center gap-3 text-gray-900">
					<span className="text-xl sm:text-3xl pr-3 font-semibold">Meet our</span>
					<span className="relative px-4 py-1 text-xl sm:text-3xl text-ieee-blue">
						<span className="absolute -top-2 left-[-25px] right-[-25px] h-[3px] bg-ieee-blue"></span>
						<span className="absolute -bottom-2 left-[-25px] right-[-25px] h-[3px] bg-ieee-blue"></span>
						<span className="absolute -left-2 top-[-22px] bottom-[-22px] w-[3px] bg-ieee-blue"></span>
						<span className="absolute -right-2 top-[-22px] bottom-[-22px] w-[3px] bg-ieee-blue"></span>
						Developers
					</span>
				</div>

				<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-15">
					{developers?.project_developers.map((developer, index) => {
						const randomColor = developerColors? developerColors[index] : '#1d8ccc98';
						return (
						<div
							key={`${developer.name}-${index}`}
							className="flex flex-col items-start relative group"
							onMouseEnter={() => setHoveredCard(index)}
							onMouseLeave={() => setHoveredCard(null)}
						>
							<div className="w-full aspect-[4/5] relative overflow-hidden">
								{/* Social Media Icons */}
								<div className={`absolute top-24 right-4 flex flex-col gap-2 transition-all duration-300 z-10 ${
									hoveredCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
								}`}>
									{developer.github_url && (
										<a
											href={developer.github_url}
											target="_blank"
											rel="noopener noreferrer"
											className="w-8 h-8 bg-black/70 hover:bg-black rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
											onClick={(e) => e.stopPropagation()}
										>
											<svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
												<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
											</svg>
										</a>
									)}
									{developer.linkedin_url && (
										<a
											href={developer.linkedin_url}
											target="_blank"
											rel="noopener noreferrer"
											className="w-8 h-8 bg-blue-600/70 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
											onClick={(e) => e.stopPropagation()}
										>
											<svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
												<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
											</svg>
										</a>
									)}
									{developer.facebook_url && (
										<a
											href={developer.facebook_url}
											target="_blank"
											rel="noopener noreferrer"
											className="w-8 h-8 bg-blue-700/70 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
											onClick={(e) => e.stopPropagation()}
										>
											<svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
												<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
											</svg>
										</a>
									)}
								</div>

								<div
									className="absolute bottom-0 left-0 right-0 rounded-2xl"
									style={{
										height: '80%',
										backgroundColor: randomColor
									}}
								>
									{/* Coding Elements Background - Now inside the colored area */}
									<div className="absolute inset-0 opacity-35 pointer-events-none">
										{/* Top area within colored background */}
										<div className="absolute top-4 left-4 text-ieee-darkblue text-xl font-mono">{'{'}</div>
										<div className="absolute top-18 left-8 text-ieee-darkblue text-sm font-mono">{'</>'}</div>

										{/* Middle area */}
										<div className="absolute top-22 right-6 text-ieee-darkblue text-lg font-mono">{'}'}</div>
										{/* <div className="absolute top-16 right-8 text-ieee-darkblue text-xs font-mono">{'[]'}</div> */}

										{/* Bottom area */}
										<div className="absolute bottom-8 left-6 text-ieee-darkblue text-sm font-mono">{'()'}</div>
										{/* <div className="absolute bottom-12 left-10 text-ieee-darkblue text-xs font-mono">{'<>'}</div> */}

										{/* Right side */}
										{/* <div className="absolute bottom-6 right-4 text-ieee-darkblue text-lg font-mono">{'{}'}</div> */}
										<div className="absolute bottom-10 right-10 text-ieee-darkblue text-xs font-mono">{'<script>'}</div>

										{/* Center elements */}
										<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-ieee-darkblue text-xs font-mono opacity-30">
											console.log('Hello World')
										</div>

										{/* Scattered elements */}
										<div className="absolute top-8 left-12 text-ieee-darkblue text-xs font-mono opacity-85">{'function'}</div>
										<div className="absolute top-16 right-12 text-ieee-darkblue text-xs font-mono opacity-85">{'const'}</div>
										<div className="absolute bottom-16 left-12 text-ieee-darkblue text-xs font-mono opacity-85">{'return'}</div>
										<div className="absolute bottom-20 right-12 text-ieee-darkblue text-xs font-mono opacity-85">{'import'}</div>
									</div>
								</div>

								<img
									src={developer.image}
									alt={developer.name}
									className="w-full h-full object-cover absolute inset-0"
								/>
							</div>
							<div className="mt-4">
								<h3 className="text-base sm:text-lg font-semibold text-gray-900">
									{developer.name}
								</h3>
								<p className="text-sm text-gray-600">{developer.role}</p>
								{developer.quote && (
									<p className="mt-2 text-xs sm:text-sm text-gray-500 italic">
										{developer.quote}
									</p>
								)}
							</div>
						</div>
					);
					})}
				</div>
			</section>
		</main>
	);
}
