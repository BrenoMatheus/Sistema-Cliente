"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = void 0;
const Environment_1 = require("../../environment/Environment");
// Função para contar registros na tabela 'technician'
const count = (filter = "") => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Environment_1.connection.connect(); // Conectar ao banco de dados
        // Consulta SQL para contar registros na tabela 'technician'
        const query = `
      SELECT COUNT(*) FROM "client"
      WHERE name LIKE $1
    `;
        const result = yield Environment_1.connection.query(query, [`%${filter}%`]);
        const count = parseInt(result.rows[0].count);
        if (!isNaN(count))
            return count;
        return new Error("Erro ao consultar a quantidade total de registros");
    }
    catch (error) {
        console.error("Erro ao consultar a quantidade total de registros:", error);
        return new Error("Erro ao consultar a quantidade total de registros");
    }
    finally {
        yield Environment_1.connection.end(); // Encerrar a conexão com o banco de dados
    }
});
exports.count = count;
