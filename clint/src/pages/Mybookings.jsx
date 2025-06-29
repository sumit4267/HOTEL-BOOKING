import React, { useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Mybookings = () => {
  const { axios, getToken, user } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const fetchUserBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Bookings"
        subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with
just a few clicks"
        align="left"
      />

      <div className="max-w-6xl mt8 w-full text-gray-800">
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
          <div className="w-1/3">Hotels</div>
          <div className="w-1/3">Date & Timings</div>
          <div className="w-1/3">Payment</div>
        </div>

        {bookings.map((Bookings) => (
          <div
            key={Bookings._id}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t"
          >
            {/* -- Hotel Details */}

            <div className="flex flex-col md:flex-row">
              <img
                src={Bookings.room.images[0]}
                alt="hotel-img"
                className="min-md:w-44 rounded shadow object-cover"
              />
              <div className="flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
                <p className="font-playfair text-2x1">
                  {Bookings.hotel.name}
                  <span className="font-inter text-sm">
                    {" "}
                    ({Bookings.room.roomType})
                  </span>
                </p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <img src={assets.locationIcon} alt="location-icon" />
                  <span>{Bookings.hotel.address}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <img src={assets.guestsIcon} alt="gusets_icon" />
                  <span>{Bookings.guests}</span>
                </div>
                <p className="text-base">Total: ${Bookings.totalPrice}</p>
              </div>
            </div>

            {/* date timng */}

            <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
              <div>
                <p>Check-In:</p>
                <p className='className="text-gray-500 text-sm"'>
                  {new Date(Bookings.checkInDate).toDateString()}
                </p>
              </div>
              <div>
                <p>Check-Out:</p>
                <p className='className="text-gray-500 text-sm"'>
                  {new Date(Bookings.checkOutDate).toDateString()}
                </p>
              </div>
            </div>

            {/* payment statys */}

            <div>
              <div className="flex flex-col items-start justify-center pt-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      Bookings.isPaid ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <p
                    className={`text-sm ${
                      Bookings.isPaid ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {Bookings.isPaid ? "Paid" : "Unpaid"}
                  </p>
                </div>
                {!Bookings.isPaid && (
                  <button
                    className="px-4 py-1.5 mt-4 text-xs border border-gray-400
rounded-full hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    pay now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mybookings;
