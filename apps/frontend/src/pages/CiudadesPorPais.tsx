    import { useEffect, useState } from "react";
import api from "../libs/api";

interface ReporteInterface {
  name: string;
  cantidad_ciudades: number;
}

const ReporteCiudadesPorPais = () => {
  const [reporte, setReporte] = useState<ReporteInterface[]>([]);

  const fetchReporte = async () => {
    try {
      const response = await api.get("/reportes/ciudades-por-pais");
      setReporte(response.data);
    } catch (error) {
      console.error("Error al cargar el reporte:", error);
    }
  };

  useEffect(() => {
    fetchReporte();
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen font-sans">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Reporte: Cantidad de Ciudades por País
      </h1>

      <div className="overflow-x-auto max-w-4xl mx-auto">
        <table className="w-full table-auto border-collapse bg-gray-800 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-indigo-700 text-white">
              <th className="px-4 py-3 border-b border-gray-700 text-left">
                País
              </th>
              <th className="px-4 py-3 border-b border-gray-700 text-left">
                Cantidad de Ciudades
              </th>
            </tr>
          </thead>
          <tbody>
            {reporte.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  className="px-4 py-6 text-center text-gray-400"
                >
                  No hay datos en el reporte.
                </td>
              </tr>
            ) : (
              reporte.map((item) => (
                <tr key={item.name} className="hover:bg-gray-700">
                  <td className="px-4 py-2 border-b border-gray-700">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700">
                    {item.cantidad_ciudades}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReporteCiudadesPorPais;
