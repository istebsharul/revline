import React, { useState, useEffect } from "react";

function SubNavbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down -> hide SubNavbar
        setShow(false);
      } else {
        // scrolling up -> show SubNavbar
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`w-full text-white text-center md:text-sm text-xs p-2 bg-red-500 fixed md:top-14 left-0 transition-transform duration-300 z-40 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      Fast Shipping from 60+ U.S. Warehouses | 3-5 Delivery |{" "}
      <span>
        <a href="tel:8886320709">888 632 0709</a>
      </span>
    </div>
  );
}

export default SubNavbar;