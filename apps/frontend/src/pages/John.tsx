import { useEffect, useState } from "react";
import api from "../libs/api";
import { Pencil, Trash2 } from "lucide-react"; // íconos

interface ItemInterface {
    id: number;
    name: string;
    price: number;
}

const John = () => {
    const [productList, setProductList] = useState<ItemInterface[]>([]);
    const [form, setForm] = useState({ name: "", price: "" });
    const [editId, setEditId] = useState<number | null>(null);

    const fetchProducts = async () => {
        try {
            const response = await api.get("/products");
            setProductList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editId !== null) {
                await api.put(`/products/${editId}`, {
                    name: form.name,
                    price: parseInt(form.price),
                });
            } else {
                await api.post("/products", {
                    name: form.name,
                    price: parseInt(form.price),
                });
            }
            setForm({ name: "", price: "" });
            setEditId(null);
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (product: ItemInterface) => {
        setForm({ name: product.name, price: String(product.price) });
        setEditId(product.id);
    };

    const handleDelete = async (id: number) => {
        if (confirm("¿Seguro que querés eliminar este producto?")) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen font-sans">
            <h1 className="text-4xl font-bold mb-8 text-center tracking-wide">Panel de Productos - John</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg max-w-md mx-auto mb-10"
            >
                <h2 className="text-2xl mb-4">{editId ? "Editar producto" : "Agregar producto"}</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del producto"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Precio"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded"
                >
                    {editId ? "Actualizar" : "Guardar"}
                </button>
            </form>

            <div className="space-y-4 max-w-3xl mx-auto">
                {productList.length === 0 ? (
                    <p className="text-center text-gray-400">No hay productos disponibles.</p>
                ) : (
                    productList.map((product) => (
                        <div
                            key={product.id}
                            className="bg-gray-800 flex justify-between items-center px-5 py-4 rounded-lg shadow"
                        >
                            <div>
                                <h3 className="text-lg font-bold">{product.name}</h3>
                                <p className="text-sm text-gray-400">${product.price}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
                                    title="Editar"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
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

export default John;
