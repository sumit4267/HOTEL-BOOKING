import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import Starrating from "../components/Starrating";
import { useAppContext } from "../context/AppContext";

const CheckBOx = ({ label, selected = false, onchange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onchange(e.target.checked, label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const RadioBtton = ({ label, selected = false, onchange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        name="sortoption"
        checked={selected}
        onChange={() => onchange(label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};
const AllRooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms, navigate, currency } = useAppContext();
  const [openFilters, setOpenfilter] = useState(false);
  const [SelectedFilters, setSelectedFilters] = useState({
    roomType: [],
    priceRange: [],
  });
  const [selectedSort, setSelectedSort] = useState("");
  const roomTypes = ["single bed", "Double bed", "Luxury bed", "Family Suite"];

  const priceRanges = [
    "0 to 509",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];

  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];
  // Handle changes for filters and sorting
  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[type].push(value);
      } else {
        updatedFilters[type] = updatedFilters[type].filter(
          (item) => item !== value
        );
      }
      return updatedFilters;
    });
  };

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  };
  // Function to check if a room matches the selected room types
  const matchesRoomType = (room) => {
    return (
      SelectedFilters.roomType.length === 0 ||
      SelectedFilters.roomType.includes(room.roomType)
    );
  };
  // Function to check if a room matches the selected price ranges
  const matchesPriceRange = (room) => {
    return (
      SelectedFilters.priceRange.length === 0 ||
      SelectedFilters.priceRange.some((range) => {
        const [min, max] = range.split("to").map(Number);
        return room.pricePerNight >= min && room.pricePerNight <= max;
      })
    );
  };
  // Function to sort rooms based on the selected sort option
  const sortRooms = (a, b) => {
    if (selectedSort === "Price Low to High") {
      return a.pricePerNight - b.pricePerNight;
    }
    if (selectedSort === "Price High to Low") {
      return b.pricePerNight - a.pricePerNight;
    }
    if (selectedSort === "Newest First") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  };
  // Filter Destination
  const filterDestination = (room) => {
    const destination = searchParams.get("destination");
    if (!destination) return true;
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
  };
  // Filter and sort rooms based on the selected filters and sort option
  const filteredRooms = useMemo(() => {
    return rooms
      .filter(
        (room) =>
          matchesRoomType(room) &&
          matchesPriceRange(room) &&
          filterDestination(room)
      )
      .sort(sortRooms);
  }, [rooms, SelectedFilters, selectedSort, searchParams]);

  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters({
      roomType: [],
      priceRange: [],
    });
    setSelectedSort("");
    setSearchParams({});
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 x1:px-32">
      <div>
        <div className="flex flex-col items-start text-left">
          <h1 className="font-playfair text-4x1 md:text-[40px]">Hotel Rooms</h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
            Take advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
        </div>
        {filteredRooms.map((room) => (
          <div className="flex flex-col md: flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0">
            <img
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                scrollTo(0, 0);
              }}
              src={room.images[0]}
              alt="hotel-img"
              title="View Room Details"
              className="max-h-65 md:w-1/2 rounded-x1 shadow-lg object-cover cursor-pointer"
            />

            <div className="md:w-1/2 flex flex-col gap-2">
              <p className="text-gray-500">{room.hotel.city}</p>
              <p
                onclick={() => {
                  navigate(`/rooms/${room_id}`);
                  scrollTo(0, 0);
                }}
                src={room.images[0]}
                className="text-gray-800 text-3x1 font-playfair cursor-pointer"
              >
                {room.hotel.name}
              </p>
              <div className="flex items-center">
                <Starrating />
                <p className="ml-2">200+ reviews</p>
              </div>
              <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                I
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.hotel.address}</span>
              </div>
              {/* room amenities */}

              <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                {room.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
                  >
                    <img
                      src={facilityIcons[item]}
                      alt={item}
                      className="w-5 h-5"
                    />{" "}
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>
              {/* Room Price per Night */}
              <p className="text-xl font-medium text-gray-700">
                ${room.pricePerNight} /night
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* filter */}

      <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16">
        <div
          className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${
            openFilters && "border-b"
          }`}
        >
          <p className="text-base font-medium text-gray-800">FILTERS</p>
          <div className="text-xs cursor-pointer">
            <span
              onClick={() => setOpenfilter(!openFilters)}
              className="lg:hidden"
            >
              {openFilters ? "HIDE" : "SHOW"}
            </span>
            <span className="hidden lg:block">CLEAR</span>
          </div>
        </div>

        <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16">
          <div
            className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${
              openFilters && "border-b"
            }`}
          >
            <p className="text-base font-medium text-gray-800">FILTERS</p>
            <div className="text-xs cursor-pointer">
              <span
                onClick={() => setOpenfilter(!openFilters)}
                className="lg:hidden"
              >
                {openFilters ? "HIDE" : "SHOW"}
              </span>
              <span className="hidden 1g: block">CLEAR</span>
            </div>
          </div>

          <div
            className={`${
              openFilters ? "h-auto" : "h-0 lg:h-auto"
            } overflow-hidden transition-all duration-700`}
          >
            <div className="px-5 pt-5">
              <p className="font-medium text-gray-800 pb-2">Popular filters</p>
              {roomTypes.map((room, index) => (
                <CheckBOx
                  key={index}
                  label={room}
                  selected={SelectedFilters.roomType.includes(room)}
                  onchange={(checked) =>
                    handleFilterChange(checked, room, "roomType")
                  }
                />
              ))}
              I
            </div>
            <div className="px-5 pt-5">
              <p className="font-medium text-gray-800 pb-2"> Price Range</p>
              {priceRanges.map((Range, index) => (
                <CheckBOx
                  key={index}
                  label={`  ${currency} ${Range}`}
                  selected={SelectedFilters.priceRange.includes(Range)}
                  onchange={(checked) =>
                    handleFilterChange(checked, Range, "roomType")
                  }
                />
              ))}
            </div>
            <div className="px-5 pt-5">
              <p className="font-medium text-gray-800 pb-2"> Sort By</p>
              {sortOptions.map((option, index) => (
                <RadioBtton
                  key={index}
                  label={option}
                  selected={selectedSort === option}
                  onChange={() => handleSortChange(option)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
