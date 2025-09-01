import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import BlurCircle from "./BlurCircle";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const onBookHandler = () => {
    if (!selected) {
      return toast.error("Please select a date");
    }
    navigate(`/movies/${id}/${selected}`);
    scrollTo(0, 0);
  };

  return (
    <div id="dateSelect" className="pt-30">
      <div className="relative bg-primary/10 border border-primary/20 rounded-lg flex flex-col md:flex-row items-center justify-between  p-8">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />

        {/* LEFT SIDE */}
        <div>
          <p className="text-lg font-semibold">Choose Date</p>
          <div className="flex items-center gap-6 text-sm mt-5">
            <ChevronLeftIcon width={28} className="text-primary" />
            <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
              {Object.keys(dateTime).map((date) => (
                <button
                  onClick={() => setSelected(date)}
                  key={date}
                  className={`flex flex-col items-center justify-center size-14 aspect-square rounded cursor-pointer ${
                    selected === date
                      ? "bg-primary text-white"
                      : "border border-primary/70"
                  }
                `}
                >
                  {/* <span>{date.split("-")[2]}</span> */}
                  <span>{new Date(date).getDate()}</span>
                  <span>
                    {new Date(date).toLocaleString("en-US", { month: "short" })}
                  </span>
                </button>
              ))}
            </span>
            <ChevronRightIcon width={28} className="text-primary" />
          </div>
        </div>

        {/* RIGHT SIDE BUTTON */}
        <button
          onClick={onBookHandler}
          className="bg-primary text-white mt-6 py-2 px-10 rounded hover:bg-primary/90 transition-all cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
