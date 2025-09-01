import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";

const SeatLayout = () => {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];

  const { id, date } = useParams();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  const navigate = useNavigate();

  const getShow = () => {
    const show = dummyShowsData.find((show) => show._id === id);
    if (show) {
      setShow({ movie: show, dateTime: dummyDateTimeData });
    }
  };

  useEffect(() => {
    getShow();
  }, []);

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast.error("Please select time first");
    }

    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast.error("You can only select 5 seats");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  // Function to render a row of seats
  // row = row label (like A, B, C...)
  // count = how many seats in that row (default is 9)
  const renderSeats = (row, count = 9) => {
    return (
      // Wrapper div for each row of seats
      <div key={row} className="flex gap-2 mt-2">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: count }, (_, i) => {
            // seatId = row + seat number (example: A1, A2, A3...)
            const seatId = `${row}${i + 1}`;

            return (
              <button
                key={seatId}
                onClick={() => handleSeatClick(seatId)}
                className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${
                  selectedSeats.includes(seatId) && "bg-primary text-white"
                }`}
              >
                {/* Show seat label (like A1, B2, etc.) */}
                {seatId}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
      {/* AVAILABLE TIMINGS */}
      <div className="bg-primary/10 w-60 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">Avalibale Timings</p>

        {/* TIME AND CLOCK ICON */}
        <div>
          {show.dateTime[date].map((item) => (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
                selectedTime?.time === item.time
                  ? "bg-primary text-white"
                  : "hover:bg-primary/20"
              }`}
            >
              <ClockIcon className="size-4" />
              <p>{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SEAT LAYOUT */}

      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />
        <h1 className="text-2xl font-semibold mb-4">Select your seat</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

        {/* SEAT SECTION */}
        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 md-6">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>

          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>{group.map((row) => renderSeats(row))}</div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate("/my-bookings")}
          className="flex items-center gap-1 mt-20 bg-primary px-10 py-3 text-sm hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95"
        >
          Processd to Checkout{" "}
          <ArrowRightIcon strokeWidth={3} className="size-4" />
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SeatLayout;
