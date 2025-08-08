import { useEffect } from "react";

const IeeeNsuSbRas = () => {

  useEffect(() => {
    document.title = "IEEE NSU RAS SBC";
  }, []);

  return (
    <div>
      <p className='font-bold'>HANDLE WITH CARE</p>
    </div>
  )
}

export default IeeeNsuSbRas
