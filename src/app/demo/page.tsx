"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/NavBar";
import AssetList from "@/components/AssetList";
import MapComponent from "@/components/MapComponent";
import { assets } from "@/data/data";
import { Asset } from "@/data/data";
import { FaBars, FaPlus } from "react-icons/fa";

const Page = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("");
    const [isGroupsOpen, setIsGroupsOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleItemClick = (label: string) => {
        setActiveItem(label);
    };

    const toggleGroups = () => {
        setIsGroupsOpen(!isGroupsOpen);
    };

    const handleAssetSelect = (asset: Asset) => {
        setSelectedAsset(asset);
    };

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
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
                <div className="flex items-center justify-between bg-white py-3 px-6">
                    <div className="flex items-center">
                        <button
                            className="md:hidden text-black mr-4"
                            onClick={toggleSidebar}
                        >
                            <FaBars />
                        </button>
                        <h1 className="text-xl font-medium">Fleet View</h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="flex items-center bg-gray-100 hover:bg-gray-200 text-black py-2 px-4 rounded">
                            <FaPlus className="mr-2" />
                            Add an Entity
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-black py-2 px-4 rounded">
                            Create Geofence
                        </button>
                    </div>
                </div>

                <NavBar />

                <div className="flex flex-grow overflow-hidden">
                    <div className="w-2/5 border-r border-gray-200">
                        <AssetList 
                            assets={assets} 
                            onAssetSelect={handleAssetSelect}
                            selectedAsset={selectedAsset}
                        />
                    </div>

                    <div className="w-3/5 h-full">
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