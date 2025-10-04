import Wave from "@/components/wave"

import insb from "@/assets/logo/insb.gif"
import insbPng from "@/assets/logo/insb.png"
import ras from "@/assets/logo/ras.png"
import pes from "@/assets/logo/pes.png"
import ias from "@/assets/logo/ias.png"
import wie from "@/assets/logo/wie.png"

const logos = [
  {
    title: "IEEE NSU SB Logo",
    img: insb,
    colors: ["Blue: #137AAC", "Yellow: #FEC937", "White: #F7FAFC"],
    file: insb
  },
  {
    title: "IEEE NSU SB Logo (Rectangular)",
    img: insbPng,
    colors: ["Blue: #137AAC", "Yellow: #FEC937", "White: #F7FAFC"],
    file: insbPng
  },
  {
    title: "IEEE NSU RAS SBC Logo",
    img: ras,
    colors: ["Purple: #602569", "Magenta: #961A31"],
    file: ras
  },
  {
    title: "IEEE NSU PES SBC Logo",
    img: pes,
    colors: ["Green: #659941", "Yellow: #F6EB12", "Light Green: #61A60E"],
    file: pes
  },
  {
    title: "IEEE NSU IAS SBC Logo",
    img: ias,
    colors: ["Blue: #008BC2", "Yellow: #FEC937", "Green: #0F904B"],
    file: ias
  },
  {
    title: "IEEE NSU SB WIE AG Logo",
    img: wie,
    colors: ["Blue: #006699", "Purple: #6A2874"],
    file: wie
  },
]

const pages = () => {
  return (
    <>
      <Wave title="Toolkit" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 pb-20">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="w-75 bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center border hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full"
          >
            <img src={logo.img} alt={logo.title} className="h-20 mb-4 object-contain" />
            <h4 className="text-lg font-bold mb-2">{logo.title}</h4>

            <p className="font-semibold mb-2">Color codes</p>
            <ul className="flex flex-wrap justify-center gap-4 mb-4">
              {logo.colors.map((color, i) => {
                const [name, hex] = color.split(":")
                return (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span
                      className="w-4 h-4 rounded-full border shadow-sm"
                      style={{ backgroundColor: hex.trim() }}
                    ></span>
                    <span className="whitespace-nowrap">{name}: {hex}</span>
                  </li>
                )
              })}
            </ul>

            <div className="flex-grow" />

            <a
              href={logo.file}
              download
              className="px-6 py-2 bg-blue-900 text-white border border-blue-900 rounded-none hover:bg-transparent hover:text-blue-900 transition-colors"
            >
              Download PNG
            </a>
          </div>
        ))}
      </div>
    </>
  )
}

export default pages
