import connection from "../../environment/Environment";
import { ETableNames } from "../../ETableNames";

export const deleteById = async (id: number): Promise<void | Error> => {
  try {

    const result = await connection.query(
      'DELETE FROM "client" WHERE id = $1',
      [id]
    );

    if (result.rowCount != null && result.rowCount > 0) return;

    return new Error("Erro ao apagar o registro");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao apagar o registro");
  } 
};
