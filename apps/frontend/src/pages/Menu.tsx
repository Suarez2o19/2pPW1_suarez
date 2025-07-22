import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div className="p-8 flex flex-wrap gap-4 justify-center bg-gray-100 rounded-lg shadow-md">
            <Link
                to="/menu/Paises"
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded transition-colors duration-300"
            >
                Ir a Países
            </Link>
            <Link
                to="/menu/Ciudades"
                className="bg-red-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded transition-colors duration-300"
            >
                Ir a Ciudades
            </Link>
            <Link
                to="/menu/Reportes"
                className="bg-green-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded transition-colors duration-300"
            >
                Ir a Reportes
            </Link>
        </div>
    );
};

export default Menu;
