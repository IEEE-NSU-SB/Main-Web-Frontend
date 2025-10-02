import INSB from "../../assets/logo/insb.gif";
// import "./pages.css"

const welcomePage = () => {
  const BG="'https://static.tumblr.com/03fbbc566b081016810402488936fbae/pqpk3dn/MRSmlzpj3/tumblr_static_bg3.png'";

  return (
    <div>
    <div className="bg-cover bg-center min-h-screen "
          style={{background: `url(${BG}) repeat 0 0`,
                  animation: "bgScroll 10s linear infinite",
                  backgroundPosition: "0 0",
                }}>
    <div/>     
       {/* the navbar  */}
      <div className="fixed top-0 w-full py-4 flex justify-between items-center ">
        
        <div className="flex flex-row gap-3 text-white text-2xl">
          <img className="w-10 h-10" src={INSB} alt="" />
          <a href="#">
            <span style={{color:"{--chart-4}"}} className="">IEEE</span>
            <span> NSU SB</span>
          </a>
        </div>
        

        <ul className="flex flex-row gap-4">
          <li><a className="text-xl" href="">Developed By</a></li>
          <li><a className="text-xl" href="text-xl">Central Website</a></li>
        </ul>

      </div>
      {/* Buttons and middle text */}
      <section className="flex flex-col justify-start "> 
        {/* <h1 className="text-yellow-500 leading-relaxed text-4xl tracking-wide font-bold">IEEE NSU STUDENT BRANCH</h1> */}
        <h1 className="text-yellow-500 text-2xl md:text-6xl font-bold text-center text-white tracking-tight leading-tight">IEEE NSU STUDENT BRANCH</h1>
        
        <h3 >Make IEEE NSU SB an Exemplary Student Branch Aga|</h3>
        <div className="flex flex-row gap-5 align-right">
          <button style={{color:"{--chart-4}"}} className="bg-yellow-500 text-white text-lg font px-8 py-3 rounded-full"> Log in</button>
          <button style={{color:"{--chart-4}"}} className="bg-yellow-500 text-white text-lg font px-8 py-3 rounded-full"> Signup </button>
        </div>

        
      </section>
    </div>
    </div>

  
  )
}

export default welcomePage
