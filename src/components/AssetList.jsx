import React from 'react';

const AssetList = ({ assets, onAssetSelect, selectedAsset }) => {
  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <input
          className="border border-gray-300 rounded py-2 px-4 w-full"
          placeholder="Search..."
          type="text"
        />
        <select className="border border-gray-300 rounded py-2 px-4 ml-2">
          <option>Vehicles A-Z</option>
        </select>
        <button className="bg-gray-200 text-black py-2 px-4 rounded ml-2">
          Filter
        </button>
      </div>

      <div className="space-y-4">
        {assets.map((asset) => (
          <div 
            key={asset.id} 
            className={`border border-gray-300 rounded p-4 cursor-pointer transition-colors duration-200 ${
              selectedAsset?.id === asset.id ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
            }`}
            onClick={() => onAssetSelect(asset)}
          >
            {/* Item Header */}
            <div className="flex items-center mb-2">
              {asset.icon && (
                <i className={`fas ${asset.icon} ${asset.iconColor} mr-2`}></i>
              )}
              {asset.checkbox && (
                <input className="mr-2" type="checkbox" />
              )}
              <div>
                <span className="font-bold">{asset.title}</span>
                <span className="text-gray-500 ml-2">{asset.model}</span>
              </div>
            </div>

            {/* Item Details */}
            {asset.details && (
              <div className="text-sm text-gray-500 mb-2">{asset.details}</div>
            )}
            {asset.phone && (
              <div className="text-sm text-gray-500 mb-2">
                {asset.phone}
              </div>
            )}
            {asset.location?.address && (
              <div className="flex items-center text-sm text-gray-500">
                <i className="fas fa-map-marker-alt mr-2"></i>
                {asset.location.address}
              </div>
            )}
            {asset.eta && (
              <div className="text-sm text-gray-500">{asset.eta}</div>
            )}
            {asset.lastUpdate && (
              <div className="text-sm text-gray-500">
                Last Update: {asset.lastUpdate}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetList;