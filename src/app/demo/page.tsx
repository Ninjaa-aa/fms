"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import MainContent from "@/components/MainContent";
import { assets } from "@/data/data";
import { Asset } from "@/data/data";

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
                <Header toggleSidebar={toggleSidebar} />
                <NavBar />
                <MainContent 
                    assets={assets}
                    selectedAsset={selectedAsset}
                    onAssetSelect={handleAssetSelect}
                />
            </div>
        </div>
    );
};

export default Page;