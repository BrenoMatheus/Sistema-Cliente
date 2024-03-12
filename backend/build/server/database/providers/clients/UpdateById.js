"use strict";
/* import { ETableNames } from "../../ETableNames";
import { ITechnician } from "../../models";
import { Knex } from "../../knex";

export const updateById = async (
  id: number,
  technician: Omit<ITechnician, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.technician)
      .update(technician)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
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
exports.updateById = void 0;
const Environment_1 = require("../../environment/Environment");
const updateById = (id, technician) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Environment_1.connection.connect(); // Conectar ao banco de dados
        const result = yield Environment_1.connection.query(`UPDATE "client" SET
       name = $1, email = $2, telephone = $3, coordinateX = $4, coordinateY = $5
       WHERE id = $6`, [
            technician.name,
            technician.email,
            technician.telephone,
            technician.coordinateX,
            technician.coordinateY,
            id,
        ]);
        if (result.rowCount != null && result.rowCount > 0)
            return;
        return new Error("Erro ao atualizar o registro");
    }
    catch (error) {
        console.error(error);
        return new Error("Erro ao atualizar o registro");
    }
    finally {
        yield Environment_1.connection.end(); // Encerrar a conexão com o banco de dados
    }
});
exports.updateById = updateById;
