import { Asset } from "@/data/data";
import AssetList from "./AssetList";
import MapComponent from "./MapComponent";

interface MainContentProps {
  assets: Asset[];
  selectedAsset: Asset | null;
  onAssetSelect: (asset: Asset) => void;
}

const MainContent = ({ assets, selectedAsset, onAssetSelect }: MainContentProps) => {
  return (
    <div className="flex flex-col md:flex-row flex-grow overflow-hidden p-4 gap-4">
      <div className="md:w-1/2 bg-white rounded-lg shadow-md overflow-auto p-4">
        <h2 className="text-lg font-semibold mb-2">Asset List</h2>
        <AssetList 
          assets={assets} 
          onAssetSelect={onAssetSelect}
          selectedAsset={selectedAsset}
        />
      </div>

      <div className="md:w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-lg font-semibold p-4">Map View</h2>
        <MapComponent 
          assets={assets}
          selectedAsset={selectedAsset}
          onAssetSelect={onAssetSelect}
        />
      </div>
    </div>
  );
};

export default MainContent;