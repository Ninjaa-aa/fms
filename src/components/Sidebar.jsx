"use client";
import { useState } from 'react';
import Image from 'next/image';
import {
    FaUsers, FaMapMarkerAlt, FaShieldAlt, FaTachometerAlt,
    FaGasPump, FaTools, FaEnvelope, FaFileAlt, FaChartBar,
    FaCog, FaBell, FaUser, FaBars, FaTimes, FaQuestionCircle, FaChevronDown
} from 'react-icons/fa';

import logo from '../../public/image.png'
const Sidebar = ({ isOpen, toggleSidebar, activeItem, handleItemClick, isGroupsOpen, toggleGroups }) => {
    return (
        <div className={`bg-black text-white w-64 p-4 flex flex-col fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out 
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative z-50`}>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <div className="relative w-10 h-10 mr-2">
                        <Image
                            src={logo}
                            alt="Driver's Eye Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <span className="text-xl font-bold">Driver's Eye</span>
                </div>
                <button
                    className="md:hidden text-white text-2xl"
                    onClick={toggleSidebar}
                >
                    <FaTimes />
                </button>
            </div>

            {/* Groups dropdown */}
            <div className="py-2">
                <button
                    onClick={toggleGroups}
                    className={`w-full flex items-center py-2 px-4 transition-all duration-200 border-2 border-white rounded text-white 
                    ${activeItem === 'Groups' ? 'text-blue-500 border-blue-500' : 'text-white border-transparent'}`}
                >
                    <FaUsers className="mr-2" />
                    Groups
                    <span className="ml-auto">
                        {isGroupsOpen ? <FaChevronDown className="transform rotate-180" /> : <FaChevronDown />}
                    </span>
                </button>
                {isGroupsOpen && (
                    <div className="pl-8 mt-2">
                        {['Group 1', 'Group 2', 'Group 3'].map((group, index) => (
                            <button
                                key={index}
                                onClick={() => handleItemClick(group)}
                                className={`block py-2 px-4 w-full text-white hover:text-blue-500`}
                            >
                                {group}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex-grow">
                {[ 
                    { icon: FaMapMarkerAlt, label: "Fleet View" },
                    { icon: FaShieldAlt, label: "Safety" },
                    { icon: FaTachometerAlt, label: "Compliance" },
                    { icon: FaGasPump, label: "Fuel" },
                    { icon: FaTools, label: "Maintenance" },
                ].map((item, index) => (
                    <div key={index}>
                        <button
                            onClick={() => handleItemClick(item.label)}
                            className={`py-2 px-4 w-full flex items-center transition-all duration-200 border-r-4 
                            ${activeItem === item.label ? 'text-blue-500 border-blue-500' : 'text-white border-transparent'}`}
                        >
                            <item.icon className="mr-2" />
                            {item.label}
                        </button>
                    </div>
                ))}

                <hr className="border-t border-gray-600 my-4" />

                {[ 
                    { icon: FaEnvelope, label: "Messages" },
                    { icon: FaFileAlt, label: "Documents" },
                    { icon: FaChartBar, label: "Reports" },
                ].map((item, index) => (
                    <div key={index}>
                        <button
                            onClick={() => handleItemClick(item.label)}
                            className={`py-2 px-4 w-full flex items-center transition-all duration-200 border-r-4 
                            ${activeItem === item.label ? 'text-blue-500 border-blue-500' : 'text-white border-transparent'}`}
                        >
                            <item.icon className="mr-2" />
                            {item.label}
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex justify-around mt-4">
                <FaCog className="text-gray-400" />
                <FaBell className="text-gray-400" />
                <FaUser className="text-gray-400" />
                <button className="text-gray-400">
                    <FaQuestionCircle className="text-gray-400" />
                    <span className="sr-only">Help</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
