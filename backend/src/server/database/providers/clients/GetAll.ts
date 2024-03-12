import connection from "../../environment/Environment";
import { ETableNames } from "../../ETableNames";
import { IClient } from "../../models";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<IClient[] | Error> => {
  try {
    let query = `
      SELECT * FROM "client"
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

    const result = await connection.query(query, params);

    return result.rows;
  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar os registros");
  }
};
