import { FaBars } from "react-icons/fa";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  return (
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
  );
};

export default Header;