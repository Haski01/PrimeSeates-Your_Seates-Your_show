import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";

import { useEffect, useState } from "react";
import { dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import BlurCircle from "../../components/BlurCircle";
import dateFormat from "../../lib/dateFormat";

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  // dash board upper data
  const dashboardCard = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || 0,
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: currency + dashboardData.totalRevenue || 0,
      icon: CircleDollarSignIcon,
    },
    {
      title: "Total Revenue",
      value: dashboardData.activeShows.length || 0,
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || 0,
      icon: UserIcon,
    },
  ];

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return !loading ? (
    <>
      <Title text1="Admin" text2="Dashboard" />

      {/* DASHBOARD UPPER SECTION  */}
      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlurCircle top="-100px" left="0px" />

        <div className="flex flex-wrap gap-4 w-full">
          {dashboardCard.map((card, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full"
            >
              <div>
                <h1 className="text-sm">{card.title}</h1>
                <p className="text-xl font-medium mt-1">{card.value}</p>
              </div>
              <card.icon className="size-6" />
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVE SHOWS (DASHBOARD BELLOW SECTION)*/}
      <p className="mt-10 text-lg font-medium">Active Shows</p>

      <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
        <BlurCircle top="100px" left="-10px" />

        {/* MOVIE DATA */}
        {dashboardData.activeShows.map((show) => (
          <div
            key={show.id}
            className="w-55 bg-primary/10 rounded-lg overflow-hidden h-full pb-3 border border-primary/20 hover:-translate-y-1 transition duration-300"
          >
            <img
              className="h-60 w-full object-cover"
              src={show.movie.poster_path}
              alt="dashboardMoviePoster"
            />
            <p className="font-medium p-2 truncate">{show.movie.title}</p>

            <div className="flex items-center justify-between px-2">
              <p className="text-lg font-medium">
                {currency} {show.showPrice}
              </p>
              <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
                <StarIcon className="size-4 text-primary fill-primary"/>
                {show.movie.vote_average.toFixed(1)}
              </p>
            </div>
            <p className="px-2 pt-2 text-sm text-gray-500 text-center">{dateFormat(show.showDateTime)}</p>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Dashboard;
