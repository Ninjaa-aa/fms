"use client";
import { useState } from "react";

const NavBar = () => {
    const [activeItem, setActiveItem] = useState("Map");

    const menuItems = [
        { name: "Map" },
        { name: "History" },
        { name: "Vehicles" },
        { name: "Drivers" },
        { name: "Assets" },
        { name: "Trips" },
    ];

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <div className="border-b border-gray-200 bg-white">
            <ul className="flex space-x-6 px-4 py-2 text-sm font-medium">
                {menuItems.map((item, index) => (
                    <li key={item.name} className="flex items-center">
                        <span
                            onClick={() => handleItemClick(item.name)}
                            className={`cursor-pointer px-2 py-1 ${
                                activeItem === item.name
                                    ? "text-blue-500 border-b-2 border-blue-500"
                                    : "text-gray-400"
                            }`}
                        >
                            {item.name}
                        </span>
                        {/* Add vertical dividers after specific items */}
                        {index === 1 || index === 4 ? (
                            <div className="h-5 w-px bg-gray-300 mx-2"></div>
                        ) : null}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NavBar;
