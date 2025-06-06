import { Chrome, Facebook, Instagram } from "lucide-react";
import InputForm from "../components/inputlabel";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../backend/authContext";

function CreateAccount() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useContext(AuthContext); // Obtém a função login do contexto
  const navigate = useNavigate(); // Hook para redirecionamento

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    console.log("Dados enviados:", formData);

    if (isSignUp) {
      // Lógica de cadastro
      const url = "http://localhost:3000/register";
      const body = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await response.json();
        console.log("Resposta do servidor (cadastro):", data);

        if (!response.ok) {
          setError(data.error || "Erro ao processar o cadastro");
          return;
        }

        setSuccess(data.message);
        setFormData({ name: "", email: "", password: "" });
      } catch (err) {
        setError("Erro ao conectar com o servidor");
        console.error("Erro no frontend (cadastro):", err);
      }
    } else {
      // Lógica de login usando o AuthContext
      const result = await login(formData.email, formData.password);
      console.log("Resposta do login:", result);

      if (result.success) {
        setSuccess(result.message);
        setFormData({ name: "", email: "", password: "" });
        navigate("/"); // Redireciona para a tela inicial após login bem-sucedido
      } else {
        setError(result.message || "Erro ao processar o login");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-center h-screen bg-blue-100 w-screen">
        <div
          className={`flex flex-row bg-zinc-100 items-center justify-between h-[70%] w-[60%] rounded-xl`}
        >
          <div
            className={`relative bg-gradient-to-tr from-emerald-400 to-emerald-600 h-[100%] duration-750 ease-in-out w-[40%] z-100 ${
              isSignUp ? "translate-x-0" : "translate-x-[150%]"
            } ${
              isSignUp ? "rounded-l-xl" : "rounded-r-xl"
            } flex flex-col items-center justify-center gap-4 text-white`}
          >
            <h1
              className={`text-2xl font-black transition duration-750 ${
                isSignUp ? "" : "translate-x-[0px]"
              }`}
            >
              {isSignUp
                ? "Bem-vindo de volta!"
                : "Primeira vez? Crie sua conta"}
            </h1>
            <span className="text-center">
              {isSignUp
                ? "Entre com a sua conta e aproveite a experiência completa!"
                : "Crie uma conta e aproveite todos os benefícios do aplicativo!"}
            </span>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-black px-20 py-2 rounded-3xl bg-zinc-200 cursor-pointer"
            >
              {isSignUp ? "Entrar" : "Criar conta"}
            </button>
          </div>
          <div
            className={`relative h-[100%] w-[60%] transition-all duration-750 ease-in-out ${
              isSignUp ? "translate-x-0" : "translate-x-[-70%]"
            } flex flex-col items-center justify-center gap-4`}
          >
            <h1 className="text-5xl text-zinc-800 font-extrabold tracking-[7px] my-5">
              {isSignUp ? "Crie a sua conta" : "Entrar na conta"}
            </h1>
            <div className="flex flex-row gap-2">
              <Facebook className="bg-blue-700 p-2 text-white h-10 w-10 rounded-full hover:bg-blue-600 hover:scale-105 transition-all duration-300 cursor-pointer" />
              <Chrome className="bg-red-700 p-2 text-white h-10 w-10 rounded-full hover:bg-red-600 hover:scale-105 transition-all duration-300 cursor-pointer" />
              <Instagram className="bg-pink-700 p-2 text-white h-10 w-10 rounded-full hover:bg-pink-600 hover:scale-105 transition-all duration-300 cursor-pointer" />
            </div>
            <span className="text-zinc-500">
              {isSignUp
                ? "Ou use o email para se registrar"
                : "Ou use o email para entrar"}
            </span>
            <form
              onSubmit={handleSubmit}
              className="w-[80%] flex flex-col gap-4"
            >
              {isSignUp && (
                <InputForm
                  type="text"
                  name="name"
                  label="Nome"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              )}
              <InputForm
                type="text"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <InputForm
                type="password"
                name="password"
                label="Senha"
                value={formData.password}
                onChange={handleInputChange}
              />
              {!isSignUp && (
                <a href="#" className="text-blue-800 pointer text-sm">
                  Esqueceu a senha?
                </a>
              )}
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <button
                type="submit"
                className="bg-emerald-400 px-20 py-3 rounded-xl cursor-pointer"
              >
                {isSignUp ? "Criar Conta" : "Entrar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
