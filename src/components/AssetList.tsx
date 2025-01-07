import React from 'react';
import { Asset } from '@/data/data';
import { IoLocationSharp, IoSearch } from 'react-icons/io5';
import { BsChevronDown } from 'react-icons/bs';
import { BiSignal4 } from 'react-icons/bi';

interface AssetListProps {
  assets: Asset[];
  onAssetSelect: (asset: Asset) => void;
  selectedAsset: Asset | null;
}

const StatusIcon = ({ status }: { status: Asset['status'] }) => {
  switch (status) {
    case 'active':
      return <div className="text-green-500 transform rotate-45 text-lg">➤</div>;
    case 'idle':
    case 'warning':
      return <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />;
    case 'critical':
      return <div className="w-2.5 h-2.5 bg-black" />;
    case 'no-location':
      return <div className="w-3 h-3 border border-gray-300" />;
    default:
      return <div className="w-2.5 h-2.5 bg-gray-300" />;
  }
};

const LiveIndicator = () => (
  <div className="flex items-center gap-1">
    <div className="relative w-4 h-4 flex items-center justify-center">
      <div className="w-3 h-3 rounded-full border border-gray-300 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
      </div>
    </div>
    <span className="text-xs text-gray-500">Live</span>
  </div>
);

const AssetList = ({ assets, onAssetSelect, selectedAsset }: AssetListProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="relative w-56">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded text-sm"
            />
          </div>
          <div className="relative">
            <select className="appearance-none pl-3 pr-8 py-1.5 border border-gray-200 rounded bg-white text-sm">
              <option>Vehicles A-Z</option>
            </select>
            <BsChevronDown className="absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
          <button className="text-blue-500 px-3 py-1.5 border border-gray-200 rounded text-sm">
            Filter
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {assets.map((asset) => (
          <div
            key={asset.id}
            onClick={() => onAssetSelect(asset)}
            className={`border-b border-gray-100 cursor-pointer ${
              selectedAsset?.id === asset.id ? 'bg-blue-50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="px-4 py-2.5">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <StatusIcon status={asset.status} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{asset.title}</span>
                        <span className="text-gray-500 text-sm">{asset.model}</span>
                      </div>
                      <div className="text-sm text-gray-700 mt-0.5">{asset.details}</div>
                      {asset.phone && (
                        <div className="text-sm text-gray-500 mt-0.5">{asset.phone}</div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <BiSignal4 className="text-gray-400" />
                      {asset.isLive && <LiveIndicator />}
                    </div>
                  </div>

                  {asset.location?.address && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <IoLocationSharp className="text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-500 truncate">{asset.location.address}</span>
                    </div>
                  )}

                  {asset.eta && (
                    <div className="text-sm text-yellow-500 mt-0.5">
                      {asset.eta}
                    </div>
                  )}

                  {asset.lastUpdate && (
                    <div className="text-sm text-gray-500 mt-0.5">
                      Last Update: {asset.lastUpdate}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetList;