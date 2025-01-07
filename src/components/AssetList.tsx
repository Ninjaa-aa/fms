import React from 'react';
import { Asset } from '@/data/data';
import { MdLocationOn } from 'react-icons/md';
import { 
  BsSquare, 
  BsSquareFill, 
  BsCircleFill,
  BsClock,
  BsCheckCircleFill
} from 'react-icons/bs';

interface AssetListProps {
  assets: Asset[];
  onAssetSelect: (asset: Asset) => void;
  selectedAsset: Asset | null;
}

const StatusIcon = ({ status }: { status: Asset['status'] }) => {
  switch (status) {
    case 'active':
      return <div className="text-green-500 rotate-45">➤</div>;
    case 'idle':
      return <BsCircleFill className="text-yellow-500" />;
    case 'warning':
      return <BsCircleFill className="text-yellow-500" />;
    case 'critical':
      return <BsSquareFill className="text-black" />;
    default:
      return <BsSquare className="text-gray-300" />;
  }
};

const AssetList = ({ assets, onAssetSelect, selectedAsset }: AssetListProps) => {
  return (
    <div className="w-full">
      {/* Search and Filter Bar */}
      <div className="flex items-center gap-2 mb-4 px-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-md">
          <option>Vehicles A-Z</option>
        </select>
        <button className="px-4 py-2 text-black bg-gray-100 rounded-md">
          Filter
        </button>
      </div>

      {/* Asset List */}
      <div className="space-y-4">
        {assets.map((asset) => (
          <div
            key={asset.id}
            onClick={() => onAssetSelect(asset)}
            className={`px-4 py-3 cursor-pointer transition-colors ${
              selectedAsset?.id === asset.id ? 'bg-blue-50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Status Icon */}
              <div className="mt-1">
                <StatusIcon status={asset.status} />
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Title Row */}
                <div className="flex items-center gap-2">
                  <span className="font-medium">{asset.title}</span>
                  <span className="text-gray-500 text-sm">{asset.model}</span>
                </div>

                {/* Details */}
                {asset.details && (
                  <div className="text-sm text-gray-700 mt-1">
                    {asset.details}
                  </div>
                )}

                {/* Location */}
                {asset.location?.address && (
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    <MdLocationOn className="text-green-500" />
                    <span>{asset.location.address}</span>
                  </div>
                )}

                {/* ETA */}
                {asset.eta && (
                  <div className="text-sm text-yellow-600 mt-1">
                    {asset.eta}
                  </div>
                )}

                {/* Last Update */}
                {asset.lastUpdate && (
                  <div className="text-sm text-gray-500 mt-1">
                    Last Update: {asset.lastUpdate}
                  </div>
                )}
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2">
                {asset.phone && (
                  <div className="flex items-center text-gray-400">
                    <BsClock />
                  </div>
                )}
                <div className="w-4 h-1 bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetList;