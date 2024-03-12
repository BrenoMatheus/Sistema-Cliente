import connection from "../../environment/Environment";
import { IUser } from "../../models";
import { PasswordCrypto } from "../../../shared/services";

export const create = async (
  user: Omit<IUser, "id">
): Promise<number | Error> => {
  try {

    // Hash da senha
    const hashedPassword = await PasswordCrypto.hashPassword(user.password);

    // Inserção do usuário no banco de dados
    const result = await connection.query(
      'INSERT INTO "user" (name, email, password, longitude, latitude) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [user.name, user.email, hashedPassword, user.longitude, user.latitude]
    );
  
    if (result.rows.length === 1 && typeof result.rows[0].id === "number") {
      return result.rows[0].id;
    }

    return new Error("Erro ao cadastrar o registro");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao cadastrar o registro");
  } 
};
