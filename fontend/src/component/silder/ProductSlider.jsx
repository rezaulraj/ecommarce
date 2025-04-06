import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: "$49.99",
    image:
      "https://images.pexels.com/photos/1895019/pexels-photo-1895019.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "High-quality product with modern design.",
  },
  {
    id: 2,
    name: "Product 2",
    price: "$59.99",
    image:
      "https://images.pexels.com/photos/1537671/pexels-photo-1537671.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Elegant and durable for everyday use.",
  },
  {
    id: 3,
    name: "Product 3",
    price: "$69.99",
    image:
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Innovative features for a better experience.",
  },
  {
    id: 4,
    name: "Product 4",
    price: "$79.99",
    image:
      "https://images.pexels.com/photos/1449844/pexels-photo-1449844.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Stylish and functional for modern living.",
  },
];

const ProductSlider = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-800">
                      {product.price}
                    </span>
                    <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSlider;
