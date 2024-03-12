"use strict";
/* import { ETableNames } from "../../ETableNames";
import { IUser } from "../../models";
import { Knex } from "../../knex";
import { PasswordCrypto } from "../../../shared/services";

export const create = async (
  user: Omit<IUser, "id">
): Promise<number | Error> => {
  try {
    const hashedPassword = await PasswordCrypto.hashPassword(user.senha);

    const [result] = await Knex(ETableNames.user)
      .insert({...user, senha: hashedPassword})
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao cadastrar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar o registro");
  }
};
 */
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
const services_1 = require("../../../shared/services");
const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Environment_1.connection.connect(); // Conectar ao banco de dados
        // Hash da senha
        const hashedPassword = yield services_1.PasswordCrypto.hashPassword(user.password);
        // Inserção do usuário no banco de dados
        const result = yield Environment_1.connection.query('INSERT INTO "user" (name, email, password, longitude, latitude) VALUES ($1, $2, $3, $4, $5) RETURNING id', [user.name, user.email, hashedPassword, user.longitude, user.latitude]);
        if (result.rows.length === 1 && typeof result.rows[0].id === "number") {
            return result.rows[0].id;
        }
        return new Error("Erro ao cadastrar o registro");
    }
    catch (error) {
        console.error(error);
        return new Error("Erro ao cadastrar o registro");
    }
    finally {
        yield Environment_1.connection.end(); // Encerrar a conexão com o banco de dados
    }
});
exports.create = create;
