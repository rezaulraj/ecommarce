import { Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const HomeCart = () => {
  const items = [
    {
      id: 0,
      title: "Hearts Menu",
      des: "Through manufacturing and marketing high quality office stationery products since its commencement in 2000, it has become the unquestionable leading company in the industry. Since its inception, the company has been producing superior quality products to fulfil the ultimate needs of our local consumers by using nest available raw materials & innovative design. Thus Hearts has created a new standard in Paper Stationery sector in Bangladesh.",
      image:
        "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Menu_Folder_Black-Hearts_Bangladesh-d6646-175535.jpg",
      price: 200,
      downPrice: "250",
    },
    {
      id: 1,
      title: "Hearts Menu",
      des: "Through manufacturing and marketing high quality office stationery products since its commencement in 2000, it has become the unquestionable leading company in the industry. Since its inception, the company has been producing superior quality products to fulfil the ultimate needs of our local consumers by using nest available raw materials & innovative design. Thus Hearts has created a new standard in Paper Stationery sector in Bangladesh.",
      image:
        "https://images.pexels.com/photos/1537671/pexels-photo-1537671.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: 100,
      downPrice: 150,
    },
    {
      id: 1,
      title: "Hearts Menu",
      des: "Through manufacturing and marketing high quality office stationery products since its commencement in 2000, it has become the unquestionable leading company in the industry. Since its inception, the company has been producing superior quality products to fulfil the ultimate needs of our local consumers by using nest available raw materials & innovative design. Thus Hearts has created a new standard in Paper Stationery sector in Bangladesh.",
      image:
        "https://images.pexels.com/photos/1449844/pexels-photo-1449844.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: 600,
      downPrice: 750,
    },
  ];

  return (
    <div className="p-4">
      <div className="p-4 mx-auto lg:max-w-7xl md:max-w-4xl sm:max-w-xl max-sm:max-w-sm">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 sm:mb-10">
          Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
          {items.map((item, idx) => (
            <Link
              to={`/product/${item.id}`} // Add a proper link for navigation
              className="flex flex-col group bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              key={idx}
            >
              <div className="bg-white rounded p-4 cursor-pointer hover:-translate-y-1 transition-all relative">
                <div className="mb-4 bg-gray-100 rounded p-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-[33/35] w-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex gap-2">
                    <h5 className="text-base font-bold text-gray-800">
                      {item.title}
                    </h5>
                    <h6 className="text-base text-gray-800 font-bold ml-auto">
                      $10
                    </h6>
                  </div>
                  <p className="text-gray-500 text-[13px] mt-2 line-clamp-2">
                    {item.des}
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <div
                      className="bg-pink-100 hover:bg-pink-200 w-12 h-9 flex items-center justify-center rounded cursor-pointer"
                      title="Wishlist"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        className="fill-pink-600 inline-block"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                    <button
                      type="button"
                      className="text-sm px-2 h-9 font-semibold w-full bg-amber-500 hover:bg-amber-600 text-white tracking-wide ml-auto outline-none border-none rounded"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCart;
