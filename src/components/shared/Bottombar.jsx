import { bottombarLinks } from "@/constants/Barlinks";
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Bottombar = () => {
    const {pathname} = useLocation()
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            key={link.label}
            to={link.route}
            className={`bottombar-link group ${
              isActive ? "bg-primary-500 rounded-md"  : ""
            } flex-center flex-col gap-1 py-2 px-3  transition`}
            
          >
            <span
              className={`transition-colors ${
                isActive ? "text-white" : "text-primary-500"
              } group-hover:text-white`}
            >
              {link.icon}
            </span>
            <p className="tiny-medium text-light-2">
              {link.label}
            </p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
