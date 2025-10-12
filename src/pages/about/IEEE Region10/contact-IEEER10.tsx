// components/ContactIEEE.tsx

const ContactIEEER10 = () => {
  return (
    <>
    <div className=" sm:mx-auto">
 
    <section className="max-w-6xl px-6 mx-auto py-12 text-gray-800">
      <h2 className="text-3xl font-bold text-[var(--colors-ieee-darkblue)] mb-6">
        <span className="border-b-4 border-[var(--color-ieee-yellow)] pb-1">Contact IEEE R10</span>
      </h2>
      <p className="mb-8 text-lg">
        For getting touched with us please go through this side and join IEEE R10 community as soon as possible.
      </p>

      <div className="space-y-4 text-base">
        <div className="flex">
          <span className="w-48 font-medium">Home page:</span>
          <a
            href="http://www.ieeer10.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800 hover:underline"
          >
            http://www.ieeer10.org/
          </a>
        </div>

        <div className="flex">
          <span className="w-48 font-medium">Website:</span>
          <span className="text-blue-800">IEEE Asia Pacific Region 10</span>
        </div>

        <div className="flex">
          <span className="w-48 font-medium">For membership enquiry:</span>
          <span className="text-blue-800">IEEE Support Center</span>
        </div>

        <div className="flex">
          <span className="w-48 font-medium">For Volunteers:</span>
          <span className="text-blue-800">Ewell Tan</span>
        </div>

        <div className="flex">
          <span className="w-48 font-medium">Contact number:</span>
          <span className="text-blue-800">
            +65 6778 2873, +65 6778 9723
          </span>
        </div>
      </div>
    </section>
    </div>
    </>
   
  );
};

export default ContactIEEER10;
