import connection from "../../environment/Environment";
import { IClient } from "../../models";

export const create = async (
  client: Omit<IClient, "id">
): Promise<number | Error> => {
  try {
    const { rows } = await connection.query(
      `INSERT INTO "client" (name, email, telephone, longitude, latitude)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [
        client.name,
        client.email,
        client.telephone,
        client.longitude,
        client.latitude,
      ]
    );
    console.log("esse é o result:",rows);
    
    if (rows.length === 1 && !isNaN(Number(rows[0].id))) {
      return Number(rows[0].id);
    }

    return new Error("Erro ao cadastrar cliente");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao cadastrar cliente");
  }
};
