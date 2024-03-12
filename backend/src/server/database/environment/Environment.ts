import { Client } from "pg";
import dotenv from "dotenv";

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração da conexão com o banco de dados
const connection = new Client({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT || 5432),
});

// Conectar ao banco de dados
connection.connect()
  .then(() => {
    console.log("Conexão bem-sucedida com o banco de dados PostgreSQL");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados PostgreSQL:", error);
  });

export default connection;
