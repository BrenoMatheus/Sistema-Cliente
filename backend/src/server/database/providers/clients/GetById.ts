import connection from "../../environment/Environment";
import { ETableNames } from "../../ETableNames";
import { IClient } from "../../models";

export const getById = async (id: number): Promise<IClient | Error> => {
  try {

    const result = await connection.query(
      `SELECT * FROM "client" WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 1) {
      return result.rows[0];
    }

    return new Error("Registro não encontrado");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar o registro");
  } 
};
