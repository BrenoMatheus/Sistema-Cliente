import connection from "../../environment/Environment";

// Função para contar registros na tabela 'technician'
export const count = async (filter = ""): Promise<number | Error> => {
  try {

    // Consulta SQL para contar registros na tabela 'technician'
    const query = `
      SELECT COUNT(*) FROM "client"
      WHERE name LIKE $1
    `;
    const result = await connection.query(query, [`%${filter}%`]);

    const count = parseInt(result.rows[0].count);
    if (!isNaN(count)) return count;

    return new Error("Erro ao consultar a quantidade total de registros");
  } catch (error) {
    console.error("Erro ao consultar a quantidade total de registros:", error);
    return new Error("Erro ao consultar a quantidade total de registros");
  } 
};
