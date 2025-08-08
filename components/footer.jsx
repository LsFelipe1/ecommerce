import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-transparentp-6 text-zinc-600 border-t py-15">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-15 max-w-6xl mx-auto">
        {/* Coluna 1: Informações */}
        <div className="flex gap-2 flex-col">
          <h3 className="text-lg font-bold">Contato</h3>
          <p>Rua das acácias, 123, São Paulo, SP</p>
          <p>(81) 99114-6818 | felipetorres2017g@gmail.com</p>
          <p>Seg-Sáb: 8h às 23h</p>
        </div>
        {/* Coluna 2: Links */}
        <div>
          <h3 className="text-lg font-bold">Navegue</h3>
          <ul>
            <li>
              <a href="#home">Início</a>
            </li>
            <li>
              <a href="#menu">Cardápio</a>
            </li>
            <li>
              <a href="#contato">Contato</a>
            </li>
          </ul>
        </div>
        {/* Coluna 3: Redes e Newsletter */}
        <div>
          <h3 className="text-lg font-bold">Conecte-se</h3>
          <div className="flex gap-4">
            <a
              href="https://linkedin.com/in/felipe-torres-703326360/"
              target="_blank"
            >
              <Linkedin />
            </a>
            <a href="https://https://github.com/LsFelipe1" target="_blank">
              <Github />
            </a>
          </div>
          <form className="mt-4">
            <input
              type="email"
              placeholder="E-mail para promoções"
              className="p-2 rounded-md bg-gray-200 text-black"
            />
            <button className="p-2 bg-green-500 text-white rounded-md mt-2">
              Inscrever
            </button>
          </form>
        </div>
      </div>
      <div className="text-center mt-6">
        <p>&copy; 2025 Sua Hamburgueria. Feito com gordura e carinho.</p>
      </div>
    </footer>
  );
}
