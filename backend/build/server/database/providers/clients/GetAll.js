"use strict";
/* import { ETableNames } from "../../ETableNames";
import { ITechnician } from "../../models";
import { Knex } from "../../knex";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<ITechnician[] | Error> => {
  try {
    const result = await Knex(ETableNames.technician)
      .select("*")
      .where("id", Number(id))
      .orWhere("name", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every((item) => item.id !== id)) {
      const resultById = await Knex(ETableNames.technician)
        .select("*")
        .where("id", "=", id)
        .first();

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar os registros");
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
exports.getAll = void 0;
const Environment_1 = require("../../environment/Environment");
const ETableNames_1 = require("../../ETableNames");
const getAll = (page, limit, filter, id = 0) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Environment_1.connection.connect(); // Conectar ao banco de dados
        let query = `
      SELECT * FROM ${ETableNames_1.ETableNames.client}
      WHERE name LIKE $1
      OFFSET $2
      LIMIT $3
    `;
        const params = [`%${filter}%`, (page - 1) * limit, limit];
        if (id > 0) {
            query += `
        UNION
        SELECT * FROM "client"
        WHERE id = $4
      `;
            params.push(id);
        }
        const result = yield Environment_1.connection.query(query, params);
        return result.rows;
    }
    catch (error) {
        console.error(error);
        return new Error("Erro ao consultar os registros");
    }
    finally {
        yield Environment_1.connection.end(); // Encerrar a conexão com o banco de dados
    }
});
exports.getAll = getAll;
