import React, { useState } from "react";
import { ClipboardList, ChevronDown } from "lucide-react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useUserStore } from "./stores/useUserStore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleCategoryOpen = () => setCategoryOpen(!categoryOpen);
  const handleSearchOpen = () => setSearchOpen(!searchOpen);
  const handleUserProfileOpen = () => setUserProfileOpen(!userProfileOpen);
  // Nested categories data
  const categories = [
    {
      name: "Electronics",
      subcategories: ["Mobile Phones", "Laptops", "Accessories"],
    },
    {
      name: "Fashion",
      subcategories: ["Men's Clothing", "Women's Clothing", "Shoes"],
    },
    {
      name: "Home & Kitchen",
      subcategories: ["Furniture", "Cookware", "Decor"],
    },
  ];

  // const user = false;
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  console.log("first", isAdmin);
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="md:flex md:items-center md:gap-12">
            <Link to={"/"} className="block text-teal-600">
              <span className="sr-only">Home</span>
              Ecommerce
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden bg-gray-100 p-2 md:flex items-center justify-center space-x-2 rounded-md">
            {/* Category Dropdown */}
            <div className="bg-white relative">
              <div
                onClick={handleCategoryOpen}
                className="bg-white flex items-center justify-center space-x-1 p-1 cursor-pointer"
              >
                <ClipboardList className="size-5" />
                <span>All Categories</span>
                <ChevronDown />
              </div>
              {categoryOpen && (
                <div className="absolute top-10 w-48 z-20 rounded-md bg-white shadow-lg">
                  <ul className="p-2">
                    {categories.map((category) => (
                      <li
                        key={category.name}
                        className="group relative p-2 hover:bg-gray-100"
                      >
                        <span className="flex items-center justify-between">
                          {category.name}
                          {category.subcategories && (
                            <ChevronDown className="size-4" />
                          )}
                        </span>
                        {/* Subcategories */}
                        {category.subcategories && (
                          <ul className="hidden group-hover:block absolute left-[11rem] top-0 w-48 bg-white shadow-lg rounded-md p-2">
                            {category.subcategories.map((subcategory) => (
                              <li
                                key={subcategory}
                                className="p-2 hover:bg-gray-100"
                              >
                                {subcategory}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                {[
                  "Best Sales",
                  "Careers",
                  "History",
                  "Services",
                  "Projects",
                  "Blog",
                ].map((item) => (
                  <li key={item}>
                    <a className="text-gray-600 hover:text-gray-700" href="#">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Buttons and Icons */}
          <div className="flex items-center gap-4">
            {/* Icons */}
            <div className="flex items-center space-x-4">
              {[
                { icon: "heart", count: 0 },
                { icon: "cart", count: 0 },
              ].map(({ icon, count }) => (
                <span key={icon} className="relative cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    className="fill-[#333] hover:fill-[#007bff]"
                    viewBox={icon === "heart" ? "0 0 64 64" : "0 0 512 512"}
                  >
                    {icon === "heart" ? (
                      <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
                    ) : (
                      <path d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0" />
                    )}
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1">
                    {count}
                  </span>
                </span>
              ))}

              {/* Search Icon */}
              <span onClick={handleSearchOpen} className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 192.904 192.904"
                  width="20px"
                  className="fill-[#333] hover:fill-[#007bff]"
                >
                  <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
                </svg>
              </span>
              {searchOpen && <SearchBar onClose={handleSearchOpen} />}
            </div>

            {/*  */}

            {isAdmin && (
              <div className="hidden sm:flex sm:gap-4">
                <Link
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 hover:bg-gray-200"
                  to={"/admin"}
                >
                  Admin dashboard
                </Link>
              </div>
            )}
            {/* Login Button */}
            <div className="hidden sm:flex sm:gap-4">
              {!user && (
                <Link
                  className="rounded-md px-5 py-2.5 text-sm font-medium bg-teal-600 text-white hover:bg-teal-700"
                  to={"/login"}
                >
                  Login
                </Link>
              )}

              {user && (
                <div className="relative">
                  <div onClick={handleUserProfileOpen}>
                    <img
                      src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                      alt=""
                      className="size-10 rounded-full cursor-pointer"
                    />
                  </div>
                  {userProfileOpen && (
                    <div className="relative">
                      <ul className="bg-white flex flex-col items-start px-2 py-1 top-4 right-0 mt-6 space-y-6 lg:absolute lg:border lg:rounded-md lg:w-40 lg:shadow-md lg:space-y-0 lg:mt-0">
                        <button
                          className="hover:bg-gray-400 w-full
                        "
                        >
                          <Link to={"/profile"}>Profile</Link>
                        </button>
                        <button
                          onClick={logout}
                          className="hover:bg-gray-400 w-full
                        "
                        >
                          Logout
                        </button>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="block md:hidden">
              <button
                onClick={toggleMenu}
                className="rounded bg-gray-100 p-2 text-gray-600 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Absolute Position) */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-30">
            <nav aria-label="Global">
              <ul className="space-y-4 p-4 text-sm">
                {[
                  "Best Sales",
                  "Careers",
                  "History",
                  "Services",
                  "Projects",
                  "Blog",
                ].map((item) => (
                  <li key={item}>
                    <a
                      className="text-gray-500 hover:text-gray-700 block"
                      href="#"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex sm:hidden sm:gap-4">
              <a
                className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 hover:bg-gray-200"
                href="#"
              >
                Login
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
