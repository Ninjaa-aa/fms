"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import AssetList from "@/components/AssetList";
import MapComponent from "@/components/MapComponent";
import NavBar from "@/components/NavBar";
import { FaBars } from "react-icons/fa";

const Page = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("");
    const [isGroupsOpen, setIsGroupsOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);

    // Sample dynamic asset data with coordinates
    const assets = [
        {
            id: "1",
            checkbox: true,
            title: "Bryce's Trailer",
            model: "Hyundai Translead C...",
            details: "No location Data",
            location: {
                lat: 37.7749,
                lng: -122.4194,
                address: "CA 37, Vallejo, CA 94592"
            },
            status: "idle",
            eta: "ETA 03:00 PM MIST / 10M LATE",
        },
        {
            id: "2",
            icon: "fa-check-circle",
            iconColor: "text-green-500",
            title: "10 TH 589",
            model: "Hyundai Translead C...",
            details: "John Doe",
            phone: "6452765276542",
            location: {
                lat: 37.7858,
                lng: -122.4064,
                address: "CA 37, Vallejo, CA 94592"
            },
            status: "active",
            eta: "ETA 03:00 PM MIST / 10M LATE",
        },
        {
            id: "3",
            icon: "fa-exclamation-circle",
            iconColor: "text-yellow-500",
            title: "Bryce's Trailer",
            model: "Volvo",
            details: "John Doe",
            phone: "6452765276542",
            location: {
                lat: 37.8044,
                lng: -122.2711,
                address: "24 mi Haydar Aliyev pr. 48, Baku, Azerbaijan"
            },
            status: "warning",
            eta: "ETA 03:00 PM MIST / 10M LATE",
        },
        {
            id: "4",
            icon: "fa-battery-half",
            iconColor: "text-red-500",
            title: "Bryce's Trailer",
            model: "Mercedes-Benz",
            details: "SE of Oakland, CA",
            location: {
                lat: 37.7903,
                lng: -122.2165,
                address: "SE of Oakland, CA"
            },
            status: "critical",
            eta: "1h 24m",
        },
        {
            id: "5",
            checkbox: true,
            title: "Test Asset",
            model: "Mercedes-Benz",
            details: "SE of Oakland, CA",
            location: {
                lat: 37.8047,
                lng: -122.2524,
                address: "SE of Oakland, CA"
            },
            status: "idle",
            lastUpdate: "08/15/24",
        },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleItemClick = (label) => {
        setActiveItem(label);
    };

    const toggleGroups = () => {
        setIsGroupsOpen(!isGroupsOpen);
    };

    const handleAssetSelect = (asset) => {
        setSelectedAsset(asset);
    };

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsSidebarOpen(false);
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, []);

    return (
        <div className="flex h-screen">
            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                activeItem={activeItem}
                handleItemClick={handleItemClick}
                isGroupsOpen={isGroupsOpen}
                toggleGroups={toggleGroups}
            />

            <div className="flex-grow flex flex-col">
                <div className="flex items-center justify-between bg-white p-4 border-b border-gray-200">
                    <div className="flex items-center">
                        <button
                            className="md:hidden text-black mr-4"
                            onClick={toggleSidebar}
                        >
                            <FaBars />
                        </button>
                        <h1 className="text-xl font-bold">Fleet View</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="bg-gray-200 text-black py-2 px-4 rounded">
                            + Add Entity
                        </button>
                        <button className="bg-gray-200 text-black py-2 px-4 rounded">
                            Create Geofence
                        </button>
                    </div>
                </div>

                <NavBar />

                <div className="flex flex-col md:flex-row flex-grow overflow-hidden p-4 gap-4">
                    <div className="md:w-1/2 bg-white rounded-lg shadow-md overflow-auto p-4">
                        <h2 className="text-lg font-semibold mb-2">Asset List</h2>
                        <AssetList 
                            assets={assets} 
                            onAssetSelect={handleAssetSelect}
                            selectedAsset={selectedAsset}
                        />
                    </div>

                    <div className="md:w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
                        <h2 className="text-lg font-semibold p-4">Map View</h2>
                        <MapComponent 
                            assets={assets}
                            selectedAsset={selectedAsset}
                            onAssetSelect={handleAssetSelect}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;