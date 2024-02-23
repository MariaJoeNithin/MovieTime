import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const Slideshow = ({ item, videoLink }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const trunkTxt = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const getcolor = (vote) => {
    if (vote >= 8) {
      return "text-green-700";
    } else if (vote <= 5) {
      return "text-red-700";
    } else {
      return "text-yellow-700";
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="w-full h-full relative">
      <p className="absolute text-2xl top-4 z-50 left-0 font-[700] w-fit text-center h-fit p-2 px-4 rounded-full">
        <h2 className="  text-2xl">
          Rating :&nbsp;
          <span className={`${getcolor(item?.vote_average)}`}>
            {Math.floor(item?.vote_average * 100) / 100}
          </span>
        </h2>
      </p>
      <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
      <div className="w-full h-[550px] ">
        <img
          className="w-full h-full object-cover object-top "
          src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
          alt={item?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-[500]">{item?.title}</h1>
          <div className=" mt-5 flex gap-2">
            <div className=" relative">
              <button className="border text-black bg-gray-300 font-[500] border-gray-300 py-2 px-5 rounded">
                Play
              </button>
            </div>
            <button className="border text-white font-[500] border-gray-300 py-2 px-5 rounded mx-2">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Released: {item?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] ">
            {trunkTxt(item?.overview, 200)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
