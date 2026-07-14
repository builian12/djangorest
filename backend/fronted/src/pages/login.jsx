import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const iniciarSesion = async (e) => {
        e.preventDefault();

        try {
            const respuesta = await api.post("login/", {
                username,
                password,
            });

            localStorage.setItem("access", respuesta.data.access);
            localStorage.setItem("refresh", respuesta.data.refresh);

            alert("Login exitoso");
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            alert("Error al iniciar sesión");
        }
    };

    const estilos = {
        contenedor: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            background: "#FFFFFF",
            fontFamily: "Arial, sans-serif",
        },
        tarjeta: {
            width: "380px",
            background: "#FFFFFF",
            padding: "35px",
            borderRadius: "12px",
            border: "2px solid #000000",
            boxShadow: "6px 6px 0px #000000",
        },
        titulo: {
            textAlign: "center",
            marginBottom: "25px",
            color: "#000000",
        },
        grupo: {
            display: "flex",
            flexDirection: "column",
            marginBottom: "18px",
        },
        label: {
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#000000",
        },
        input: {
            padding: "12px",
            border: "2px solid #000000",
            borderRadius: "8px",
            fontSize: "15px",
            background: "#FFFFFF",
            color: "#000000",
            outline: "none",
        },
        boton: {
            width: "100%",
            padding: "12px",
            background: "#000000",
            color: "#FFFFFF",
            border: "2px solid #000000",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "10px",
        },
    };

    return (
        <div style={estilos.contenedor}>
            <div style={estilos.tarjeta}>
                <h2 style={estilos.titulo}>Iniciar Sesión</h2>

                <form onSubmit={iniciarSesion}>
                    <div style={estilos.grupo}>
                        <label style={estilos.label}>Usuario</label>
                        <input
                            style={estilos.input}
                            type="text"
                            placeholder="Ingrese su usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div style={estilos.grupo}>
                        <label style={estilos.label}>Contraseña</label>
                        <input
                            style={estilos.input}
                            type="password"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button style={estilos.boton} type="submit">
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;