import connection from "../../environment/Environment";
import { ETableNames } from "../../ETableNames";
import { IClient } from "../../models";

export const updateById = async (
  id: number,
  technician: Omit<IClient, "id">
): Promise<void | Error> => {
  try {

    const result = await connection.query(
      `UPDATE "client" SET
       name = $1, email = $2, telephone = $3, longitude = $4, latitude = $5
       WHERE id = $6`,
      [
        technician.name,
        technician.email,
        technician.telephone,
        technician.longitude,
        technician.latitude,
        id,
      ]
    );

    if (result.rowCount != null && result.rowCount > 0) return;

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao atualizar o registro");
  } 
};
