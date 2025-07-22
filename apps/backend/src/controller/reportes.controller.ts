// reportes.controller.ts
import { db } from 'src/db/connection';
import { Request, Response } from 'express';

export const getReporteCiudadesPorPais = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.execute(`
      SELECT p.name, rcpp.cantidad_ciudades
      FROM reporte_ciudades_por_pais rcpp
      INNER JOIN paises p ON rcpp.id_pais = p.id
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener reporte:", error);
    res.status(500).json({ error: "Error al obtener el reporte" });
  }
};
