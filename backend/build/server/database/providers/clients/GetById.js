"use strict";
/* import { ETableNames } from "../../ETableNames";
import { ITechnician } from "../../models";
import { Knex } from "../../knex";

export const getById = async (id: number): Promise<ITechnician | Error> => {
  try {
    const result = await Knex(ETableNames.technician)
      .select("*")
      .where("id", "=", id)
      .first();

    if (result) return result;

    return new Error("Registro não encontrado");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar o registro");
  }
}; */
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
exports.getById = void 0;
const Environment_1 = require("../../environment/Environment");
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Environment_1.connection.connect(); // Conectar ao banco de dados
        const result = yield Environment_1.connection.query(`SELECT * FROM "client" WHERE id = $1`, [id]);
        if (result.rows.length === 1) {
            return result.rows[0];
        }
        return new Error("Registro não encontrado");
    }
    catch (error) {
        console.error(error);
        return new Error("Erro ao consultar o registro");
    }
    finally {
        yield Environment_1.connection.end(); // Encerrar a conexão com o banco de dados
    }
});
exports.getById = getById;
