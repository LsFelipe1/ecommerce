import express from "express";
import bcrypt from "bcrypt";
import { Pool } from "pg";
import cors from "cors";

const app = express();

// Configuração do banco de dados
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ecommerce", //nome do db
  password: "tsugikuni1",
  port: 5432,
});

app.use(cors());
app.use(express.json());

// Rota de Cadastro
app.post("/register", async (req, res) => {
  try {
    console.log("Requisição recebida:", req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const emailString = String(email).trim();
    console.log("Verificando email:", emailString, "Tipo:", typeof emailString);

    // Adicionar log para o array de parâmetros
    console.log("Parâmetros da query:", [emailString]);

    // Simplificar a query para testar
    const userExists = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [emailString]
    );
    console.log("Resultado da query:", userExists.rows);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "Email já registrado" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Senha criptografada");

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, emailString, hashedPassword]
    );
    console.log("Usuário inserido:", newUser.rows[0]);

    res
      .status(201)
      .json({ message: "Usuário criado com sucesso", user: newUser.rows[0] });
  } catch (error) {
    console.error("Erro na rota /register:", error.stack);
    res.status(500).json({
      error: "Erro no servidor durante o cadastro",
      details: error.message,
    });
  }
});

// Rota de Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar entrada
    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    // Verificar se o usuário existe
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Email ou senha inválidos" });
    }

    // Verificar a senha
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: "Email ou senha inválidos" });
    }

    res.status(200).json({
      message: "Login bem-sucedido",
      user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
