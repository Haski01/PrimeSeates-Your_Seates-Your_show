import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { dummyDateTimeData, dummyShowsData } from "../assets/assets";

import BlurCircle from "../components/BlurCircle";
import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
import timeFormat from "../lib/timeFormat";

const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState();

  // get particular show which matches to the params id
  const getShow = async () => {
    const show = dummyShowsData.find((show) => show._id === id);
    setShow({ movie: show, dateTime: dummyDateTimeData });
  };

  // only get show data when id params id changes
  useEffect(() => {
    getShow();
  }, [id]);

  return show ? (
    <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      {/* MOVIE DETAILS SECTION */}
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {/* POSTER */}
        <img
          src={show.movie.poster_path}
          alt="moviePoster"
          className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
        />

        {/* DETAILS */}
        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-primary">ENGLISH</p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance">
            {show.movie.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="size-5 text-primary fill-primary" />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>

          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {show.movie.overview}
          </p>

          <p>
            {timeFormat(show.movie.runtime)} -
            {show.movie.genres.map((genre) => genre.name).join(" | ")} -{" "}
            {show.movie.release_date.split("-")[0]}
          </p>

          {/* BUTTONS */}
          <div className="flex items-center flex-wrap gap-4 mt-4">
            {/* WATCH TRAILER */}
            <button className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95">
              <PlayCircleIcon className="size-5" /> Watch Trailer
            </button>

            {/* BUY TICKET */}
            <a
              href="#dataSelect"
              className="bg-primary px-10 py-3 text-sm hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95"
            >
              Buy Ticket
            </a>

            {/* LIKE BUTTON */}
            <button className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95">
              <Heart className="size-5" />
            </button>
          </div>
        </div>
      </div>
      {/* ***************MOVIE DETAILS SECTION END *************/}

      {/* CAST SECTION */}
      <p className="text-lg font-medium mt-20">Your Favorite Cast</p>
      {/* MOVIE ACTOR DETAILS */}

      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">

        {/* PHOTO AND NAME */}
        <div className="flex items-center gap-4 w-max px-4">
          {show.movie.casts.slice(0, 12).map((cast, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img src={cast.profile_path} alt="movieActor" className="h-20 rounded-full md:h-20 aspect-square object-cover" />
              <p className="font-medium text-xs mt-3">{cast.name}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  ) : (
    <div>Loading....</div>
  );
};

export default MovieDetails;
