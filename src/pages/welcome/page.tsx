import INSB from "../../assets/logo/insb.gif";
import TextType from './TextType';
import SplitText from "./SplitText";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const Button = ({ children, className = "", ...props }: React.PropsWithChildren<{ className?: string }>) => {
  const baseStyles =
    "bg-yellow-400 text-white text-xl font-medium px-8 py-2 rounded-full " +
    "border-2 border-transparent shadow-lg transition-all duration-300 " +
    "hover:bg-transparent hover:text-yellow-500 hover:border-yellow-500 hover:cursor-pointer";

  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

const welcomePage = () => {
  const BG="'https://static.tumblr.com/03fbbc566b081016810402488936fbae/pqpk3dn/MRSmlzpj3/tumblr_static_bg3.png'";

  return (
  
      <div className="bg-cover bg-center min-h-screen "
          style={{background: `url(${BG}) repeat 0 0`,
                  animation: "bgScroll 10s linear infinite",
                  backgroundPosition: "0 0",
                }}>
      <div/>
      
       {/* the navbar  */}
      <div className="flex flex-col md:flex-row fixed top-0 w-full py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-51  justify-between items-center">
        
        <div className="flex flex-row items-center gap-2 sm:gap-3 text-white text-xl sm:text-2xl md:text-2xl cursor-pointer">
          <img className="md:w-8 md:h-8 w-10 h-10 " src={INSB} alt="" />
          <a href="https://ieeensusb.org/" className="flex gap-3 ">
            <span className="text-4xl md:text-2xl" style={{color:"var(--color-ieee-darkyellow)"}} >IEEE</span>
            <span className="text-4xl md:text-2xl"> NSU SB</span>
          </a>
        </div>
        

        <ul className="flex flex-row self-center md:self-start gap-10 py-2 md:gap-4  text-white">
          <li><a className="text-xl hover:text-[var(--color-ieee-darkyellow)]" href="">Developed By</a></li>
          <li><a className="text-xl hover:text-[var(--color-ieee-darkyellow)]" href="https://ieeensusb.org/">Central Website</a></li>
        </ul>

      </div>
      {/* Buttons and middle text */}
      <div className="flex flex-col gap-2 py-60 md:px-50 px-16 items-start justify-start sm:justify-center min-h-screen text-center"> 
        
        <SplitText
        text="IEEE NSU STUDENT BRANCH!"
      
        className="text-yellow-400 text-7xl md:text-6xl font-bold text-center tracking-tight leading-tight "
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
        />
        <TextType 
            style={{color:"var(--color-ieee-darkyellow)"}}
            className="flex self-center md:self-start text-2xl font-normal leading-relaxed h-18 sm:h-15"
            text={["Make IEEE NSU SB an Exemplary Student Branch Again", "Advancing Technology for Humanity !"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
        />
       
        <div className="flex flex-row self-center md:self-start gap-3 md:gap-5 sm:py-5 ">
          <Button>Login</Button>
          <Button>Signup </Button>
            
        </div>
      </div>
    </div>
  )
}

export default welcomePage
