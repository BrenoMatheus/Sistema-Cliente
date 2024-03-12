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
exports.create = void 0;
const Environment_1 = require("../../environment/Environment");
const create = (client) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Environment_1.connection.connect(); // Conectar ao banco de dados
        const { rows } = yield Environment_1.connection.query(`INSERT INTO "client" (name, email, telephone, coordinateX, coordinateY)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`, [
            client.name,
            client.email,
            client.telephone,
            client.coordinateX,
            client.coordinateY,
        ]);
        if (rows.length === 1 && typeof rows[0].id === "number") {
            return rows[0].id;
        }
        return new Error("Erro ao cadastrar cliente");
    }
    catch (error) {
        console.error(error);
        return new Error("Erro ao cadastrar cliente");
    }
    finally {
        yield Environment_1.connection.end(); // Encerrar a conexão com o banco de dados
    }
});
exports.create = create;
