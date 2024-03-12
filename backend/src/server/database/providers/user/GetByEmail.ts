import connection from "../../environment/Environment";
import { IUser } from "../../models";

export const getByEmail = async (email: string): Promise<IUser | Error> => {
  try {

    const result = await connection.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
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
