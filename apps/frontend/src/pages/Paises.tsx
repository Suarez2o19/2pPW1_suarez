// Importaciones necesarias desde React y librerías externas
import { useEffect, useState } from "react";
import api from "../libs/api"; // Instancia de Axios para hacer peticiones al backend
import { Pencil, Trash2 } from "lucide-react"; // Iconos para botones

// Interfaz que define la estructura de un país
interface PaisInterface {
    id: number;
    name: string;
}

// Componente principal que maneja la interfaz de países
const Paises = () => {
    // Estados del componente
    const [paisesList, setPaisesList] = useState<PaisInterface[]>([]); // Lista de países
    const [form, setForm] = useState({ name: "" }); // Formulario para agregar/editar país
    const [editId, setEditId] = useState<number | null>(null); // ID del país en edición
    const [errorMsg, setErrorMsg] = useState<string | null>(null); // Mensaje de error al guardar
    const [deleteErrorMsg, setDeleteErrorMsg] = useState<string | null>(null); // Mensaje de error al eliminar

    // Función que obtiene la lista de países del backend
    const fetchPaises = async () => {
        try {
            const response = await api.get("/paises");
            setPaisesList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect se ejecuta una vez cuando se carga el componente
    useEffect(() => {
        fetchPaises();
    }, []);

    // Función que actualiza el formulario cuando el usuario escribe
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errorMsg) setErrorMsg(null); // Limpia error si estaba
    };

    // Función que maneja el envío del formulario para crear o editar país
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editId !== null) {
                // Si se está editando
                await api.put(`/paises/${editId}`, { name: form.name });
            } else {
                // Si se está creando uno nuevo
                await api.post("/paises", { name: form.name });
            }
            setForm({ name: "" }); // Limpiar formulario
            setEditId(null); // Salir del modo edición
            setErrorMsg(null);
            fetchPaises(); // Actualizar la lista
        } catch (error: any) {
            // Captura errores, por ejemplo nombre duplicado
            if (error.response?.data?.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg("Error desconocido al guardar el país.");
            }
        }
    };

    // Función que carga los datos de un país al formulario para editarlo
    const handleEdit = (pais: PaisInterface) => {
        setForm({ name: pais.name });
        setEditId(pais.id);
        setErrorMsg(null);
        setDeleteErrorMsg(null); // Limpia mensaje de eliminación si lo hubiera
    };

    // Función para eliminar un país
    const handleDelete = async (id: number) => {
        if (confirm("¿Seguro que querés eliminar este país?")) {
            try {
                await api.delete(`/paises/${id}`);
                fetchPaises(); // Actualizar lista
                setDeleteErrorMsg(null);
            } catch (error: any) {
                // Verifica si hay error por relación con ciudades (foreign key)
                if (
                    error.response?.data?.message &&
                    error.response.data.message.includes("foreign key")
                ) {
                    setDeleteErrorMsg(
                        "No se puede eliminar el país porque tiene ciudades asociadas."
                    );
                } else {
                    setDeleteErrorMsg("Error al eliminar el país.");
                }
            }
        }
    };

    // Lo que retorna el componente: la interfaz
    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-center">Gestión de Países</h1>

            {/* Formulario para agregar o editar */}
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg max-w-md mx-auto mb-10"
            >
                <h2 className="text-2xl mb-4">{editId ? "Editar país" : "Agregar país"}</h2>

                {/* Mensaje de error al guardar */}
                {errorMsg && (
                    <div className="mb-4 p-3 bg-red-700 text-red-100 rounded">
                        {errorMsg}
                    </div>
                )}

                {/* Campo del nombre del país */}
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del país"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />

                {/* Botón de guardar o actualizar */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded"
                >
                    {editId ? "Actualizar" : "Guardar"}
                </button>
            </form>

            {/* Mensaje de error al eliminar */}
            {deleteErrorMsg && (
                <div className="max-w-3xl mx-auto mb-4 p-3 bg-red-600 text-red-100 rounded">
                    {deleteErrorMsg}
                </div>
            )}

            {/* Lista de países */}
            <div className="space-y-4 max-w-3xl mx-auto">
                {paisesList.length === 0 ? (
                    <p className="text-center text-gray-400">No hay países registrados.</p>
                ) : (
                    paisesList.map((pais) => (
                        <div
                            key={pais.id}
                            className="bg-gray-800 flex justify-between items-center px-5 py-4 rounded-lg shadow"
                        >
                            <h3 className="text-lg font-bold">{pais.name}</h3>
                            <div className="flex space-x-2">
                                {/* Botón de editar */}
                                <button
                                    onClick={() => handleEdit(pais)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
                                    title="Editar"
                                >
                                    <Pencil size={18} />
                                </button>
                                {/* Botón de eliminar */}
                                <button
                                    onClick={() => handleDelete(pais.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
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

export default Paises;
