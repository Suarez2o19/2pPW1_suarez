import { useEffect, useState } from "react";
import api from "../libs/api";
import { Pencil, Trash2 } from "lucide-react";

interface Ciudad {
    id: number;
    name: string;
    id_pais: number;
}

interface Pais {
    id: number;
    name: string;
}

const Ciudades = () => {
    const [ciudadesList, setCiudadesList] = useState<Ciudad[]>([]);
    const [paisesList, setPaisesList] = useState<Pais[]>([]);
    const [form, setForm] = useState({ name: "", id_pais: "" });
    const [editId, setEditId] = useState<number | null>(null);
    const [error, setError] = useState<string>("");  // <-- Estado para error

    const fetchCiudades = async () => {
        try {
            const response = await api.get("/ciudades");
            setCiudadesList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPaises = async () => {
        try {
            const response = await api.get("/paises");
            setPaisesList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCiudades();
        fetchPaises();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(""); // Limpiar error al modificar formulario
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Limpiar error antes de enviar

        try {
            const data = { name: form.name, id_pais: parseInt(form.id_pais) };

            if (editId !== null) {
                await api.put(`/ciudades/${editId}`, data);
            } else {
                await api.post("/ciudades", data);
            }

            setForm({ name: "", id_pais: "" });
            setEditId(null);
            fetchCiudades();
        } catch (err: any) {
            // Aquí chequeamos si el backend nos envió un mensaje de error
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Error al guardar la ciudad.");
            }
            console.error(err);
        }
    };

    const handleEdit = (ciudad: Ciudad) => {
        setForm({ name: ciudad.name, id_pais: String(ciudad.id_pais) });
        setEditId(ciudad.id);
        setError("");
    };

    const handleDelete = async (id: number) => {
        if (confirm("¿Seguro que querés eliminar esta ciudad?")) {
            try {
                await api.delete(`/ciudades/${id}`);
                fetchCiudades();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const getPaisName = (id_pais: number) => {
        const pais = paisesList.find(p => p.id === id_pais);
        return pais ? pais.name : "Desconocido";
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white px-6 py-8 font-sans">
            <h1 className="text-4xl font-bold text-center mb-10">Gestión de Ciudades</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-xl mx-auto mb-4 border border-gray-700"
            >
                <h2 className="text-2xl font-semibold mb-6">
                    {editId ? "Editar Ciudad" : "Agregar Ciudad"}
                </h2>

                <div className="mb-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre de la ciudad"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                        required
                    />
                </div>

                <div className="mb-6">
                    <select
                        name="id_pais"
                        value={form.id_pais}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Seleccionar país</option>
                        {paisesList.map(pais => (
                            <option key={pais.id} value={pais.id}>
                                {pais.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded transition duration-300"
                >
                    {editId ? "Actualizar" : "Guardar"}
                </button>

                {error && (
                    <p className="mt-4 text-center text-red-500 font-semibold">
                        ⚠ {error}
                    </p>
                )}
            </form>

            <div className="max-w-3xl mx-auto space-y-4">
                {ciudadesList.length === 0 ? (
                    <p className="text-center text-gray-400">No hay ciudades registradas.</p>
                ) : (
                    ciudadesList.map(ciudad => (
                        <div
                            key={ciudad.id}
                            className="flex justify-between items-center bg-gray-800 p-5 rounded-lg shadow border border-gray-700"
                        >
                            <div>
                                <h3 className="text-lg font-semibold">{ciudad.name}</h3>
                                <p className="text-sm text-gray-400">
                                    País: {getPaisName(ciudad.id_pais)}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(ciudad)}
                                    className="p-2 bg-yellow-500 hover:bg-yellow-600 rounded text-white transition"
                                    title="Editar"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(ciudad.id)}
                                    className="p-2 bg-red-600 hover:bg-red-700 rounded text-white transition"
                                    title="Eliminar"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Ciudades;
