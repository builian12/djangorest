import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcionCat, setDescripcionCat] = useState("");
    const [estadoCat, setEstadoCat] = useState(true);
    const [editandoId, setEditandoId] = useState(null);
    const [mostrarForm, setMostrarForm] = useState(false);
    const navigate = useNavigate();

    // Cargar categorías al montar
    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        try {
            const respuesta = await api.get("categorias/");
            setCategorias(respuesta.data);
        } catch (error) {
            console.error("Error al cargar categorías:", error);
        }
    };

    // INSERTAR
    const insertarCategoria = async (e) => {
        e.preventDefault();
        try {
            await api.post("categorias/", {
                nombre,
                descripcion_cat: descripcionCat,
                estado_cat: estadoCat,
            });
            alert("Categoría insertada correctamente");
            limpiarForm();
            cargarCategorias();
        } catch (error) {
            console.error("Error al insertar:", error);
            alert("Error al insertar categoría");
        }
    };

    // ACTUALIZAR
    const actualizarCategoria = async (e) => {
        e.preventDefault();
        try {
            await api.put(`categorias/${editandoId}/`, {
                nombre,
                descripcion_cat: descripcionCat,
                estado_cat: estadoCat,
            });
            alert("Categoría actualizada correctamente");
            limpiarForm();
            cargarCategorias();
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("Error al actualizar categoría");
        }
    };

    // ELIMINAR
    const eliminarCategoria = async (id) => {
        if (!window.confirm("¿Está seguro de eliminar esta categoría?")) return;
        try {
            await api.delete(`categorias/${id}/`);
            alert("Categoría eliminada correctamente");
            cargarCategorias();
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("Error al eliminar categoría");
        }
    };

    // Cargar datos en el formulario para editar
    const editarCategoria = (cat) => {
        setEditandoId(cat.id);
        setNombre(cat.nombre);
        setDescripcionCat(cat.descripcion_cat);
        setEstadoCat(cat.estado_cat);
        setMostrarForm(true);
    };

    const limpiarForm = () => {
        setEditandoId(null);
        setNombre("");
        setDescripcionCat("");
        setEstadoCat(true);
        setMostrarForm(false);
    };

    const cerrarSesion = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/");
    };

    const estilos = {
        contenedor: {
            maxWidth: "900px",
            margin: "0 auto",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
        },
        titulo: { color: "#000" },
        btnCerrar: {
            background: "#dc3545",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
        },
        btnAgregar: {
            background: "#000",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "15px",
        },
        formCard: {
            background: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
            border: "2px solid #000",
            marginBottom: "20px",
        },
        formTitulo: { marginTop: 0, marginBottom: "15px" },
        formGroup: {
            display: "flex",
            flexDirection: "column",
            marginBottom: "12px",
        },
        label: { marginBottom: "5px", fontWeight: "bold" },
        input: {
            padding: "10px",
            border: "2px solid #000",
            borderRadius: "6px",
            fontSize: "14px",
        },
        checkboxGroup: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
        },
        btnGuardar: {
            background: "#000",
            color: "#fff",
            border: "none",
            padding: "10px 25px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            marginRight: "10px",
        },
        btnCancelar: {
            background: "#6c757d",
            color: "#fff",
            border: "none",
            padding: "10px 25px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
        },
        tabla: {
            width: "100%",
            borderCollapse: "collapse",
            border: "2px solid #000",
        },
        th: {
            background: "#000",
            color: "#fff",
            padding: "12px",
            textAlign: "left",
        },
        td: {
            padding: "10px",
            borderBottom: "1px solid #ddd",
        },
        btnEditar: {
            background: "#ffc107",
            color: "#000",
            border: "none",
            padding: "6px 14px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            marginRight: "5px",
        },
        btnEliminar: {
            background: "#dc3545",
            color: "#fff",
            border: "none",
            padding: "6px 14px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
        },
        badgeActivo: {
            background: "#28a745",
            color: "#fff",
            padding: "4px 10px",
            borderRadius: "12px",
            fontSize: "12px",
        },
        badgeInactivo: {
            background: "#dc3545",
            color: "#fff",
            padding: "4px 10px",
            borderRadius: "12px",
            fontSize: "12px",
        },
    };

    return (
        <div style={estilos.contenedor}>
            <div style={estilos.header}>
                <h2 style={estilos.titulo}>Gestión de Categorías</h2>
                <button style={estilos.btnCerrar} onClick={cerrarSesion}>
                    Cerrar Sesión
                </button>
            </div>

            <button
                style={estilos.btnAgregar}
                onClick={() => {
                    limpiarForm();
                    setMostrarForm(!mostrarForm);
                }}
            >
                {mostrarForm ? "Ocultar Formulario" : "+ Nueva Categoría"}
            </button>

            {mostrarForm && (
                <div style={estilos.formCard}>
                    <h3 style={estilos.formTitulo}>
                        {editandoId ? "Editar Categoría" : "Nueva Categoría"}
                    </h3>
                    <form onSubmit={editandoId ? actualizarCategoria : insertarCategoria}>
                        <div style={estilos.formGroup}>
                            <label style={estilos.label}>Nombre</label>
                            <input
                                style={estilos.input}
                                type="text"
                                placeholder="Nombre de la categoría"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>

                        <div style={estilos.formGroup}>
                            <label style={estilos.label}>Descripción</label>
                            <input
                                style={estilos.input}
                                type="text"
                                placeholder="Descripción de la categoría"
                                value={descripcionCat}
                                onChange={(e) => setDescripcionCat(e.target.value)}
                                required
                            />
                        </div>

                        <div style={estilos.formGroup}>
                            <div style={estilos.checkboxGroup}>
                                <input
                                    type="checkbox"
                                    checked={estadoCat}
                                    onChange={(e) => setEstadoCat(e.target.checked)}
                                    id="estado"
                                />
                                <label htmlFor="estado" style={estilos.label}>
                                    Activo
                                </label>
                            </div>
                        </div>

                        <div>
                            <button style={estilos.btnGuardar} type="submit">
                                {editandoId ? "Actualizar" : "Guardar"}
                            </button>
                            <button
                                style={estilos.btnCancelar}
                                type="button"
                                onClick={limpiarForm}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <table style={estilos.tabla}>
                <thead>
                    <tr>
                        <th style={estilos.th}>ID</th>
                        <th style={estilos.th}>Nombre</th>
                        <th style={estilos.th}>Descripción</th>
                        <th style={estilos.th}>Estado</th>
                        <th style={estilos.th}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.length === 0 ? (
                        <tr>
                            <td style={estilos.td} colSpan={5} align="center">
                                No hay categorías registradas
                            </td>
                        </tr>
                    ) : (
                        categorias.map((cat) => (
                            <tr key={cat.id}>
                                <td style={estilos.td}>{cat.id}</td>
                                <td style={estilos.td}>{cat.nombre}</td>
                                <td style={estilos.td}>{cat.descripcion_cat}</td>
                                <td style={estilos.td}>
                                    <span
                                        style={
                                            cat.estado_cat
                                                ? estilos.badgeActivo
                                                : estilos.badgeInactivo
                                        }
                                    >
                                        {cat.estado_cat ? "Activo" : "Inactivo"}
                                    </span>
                                </td>
                                <td style={estilos.td}>
                                    <button
                                        style={estilos.btnEditar}
                                        onClick={() => editarCategoria(cat)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        style={estilos.btnEliminar}
                                        onClick={() => eliminarCategoria(cat.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;