import React from "react";


import Hotelcard from "../Hotelcard";
import Title from "../Title";

import { useAppContext } from "../../context/AppContext";
import { useState } from "react";
import { useEffect } from "react";

const RecommendedHotels = () => {
  const { rooms, searchedCities } = useAppContext();
  const [recommended, setRecommended] = useState([]);

    const filterHotels = () => {
    if (searchedCities && searchedCities.length > 0) {
      const filteredHotels = rooms
        .slice()
        .filter((room) => searchedCities.includes(room.hotel.city));
      setRecommended(filteredHotels);
    } else {
      // Jab koi search na ho toh shuru ke 4 rooms dikhao
      setRecommended(rooms.slice(0, 4));
    }
  };
  useEffect(() => {
    filterHotels();
  }, [rooms, searchedCities]);

  return (
    recommended.length > 0 && (
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
        <Title
          title="recommended Hotels"
          subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
        />

        <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
          {recommended.slice(0, 4).map((room, index) => (
            <Hotelcard key={room._id} room={room} index={index} />
          ))}
        </div>
        
      </div>
    )
  );
};

export default RecommendedHotels;
