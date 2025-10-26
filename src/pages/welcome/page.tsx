import INSB from "../../assets/logo/insb.gif";
import TextType from "./textType";


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
      <div className="fixed top-0 w-full py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-51 flex justify-between items-center">
        
        <div className="flex flex-col md:flex-row items-center gap-2 sm:gap-3 text-white text-xl sm:text-2xl md:text-2xl cursor-pointer">
          <img className="w-8 h-8 sm:w-10 sm:h-10 " src={INSB} alt="" />
          <a href="https://ieeensusb.org/" className="flex gap-1">
            <span style={{color:"var(--color-ieee-darkyellow)"}} >IEEE</span>
            <span> NSU SB</span>
          </a>
        </div>
        

        <ul className="flex flex-row gap-4 text-white">
          <li><a className="text-xl hover:text-[var(--color-ieee-darkyellow)]" href="">Developed By</a></li>
          <li><a className="text-xl hover:text-[var(--color-ieee-darkyellow)]" href="https://ieeensusb.org/">Central Website</a></li>
        </ul>

      </div>
      {/* Buttons and middle text */}
      <div className="flex flex-col gap-2 py-60 md:px-50 px-16 items-start justify-start sm:justify-center min-h-screen text-center"> 
      
        <h1 style={{color:"var(--color-ieee-darkyellow)"}} className=" text-2xl md:text-6xl font-bold text-center tracking-tight leading-tight">IEEE NSU STUDENT BRANCH</h1>

        <TextType 
            style={{color:"var(--color-ieee-darkyellow)"}}
            className="text-2xl font-normal leading-relaxed"
            text={["Make IEEE NSU SB an Exemplary Student Branch Again", "Advancing Technology for Humanity !"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
          
            cursorCharacter="|"
        />
        {/* " items-center md:flex-row md:justify-end gap-3 md:gap-5" */}
        <div className="flex flex-row items-center md:justify-end gap-3 md:gap-5 ">
          <Button >Log in</Button>
          <Button>Signup </Button>
            
        </div>
      </div>
    </div>
  )
}

export default welcomePage
