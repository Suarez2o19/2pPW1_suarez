import { Request, Response } from 'express';
import { db } from '../db/connection';
import { ciudades } from '../db/schema';
import { eq } from 'drizzle-orm';

export const getAllCiudades = async (_req: Request, res: Response) => {
  try {
    const allCiudades = await db.select().from(ciudades);
    res.json(allCiudades);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las ciudades' });
  }
};

export const createCiudad = async (req: Request, res: Response) => {
  const { name, id_pais } = req.body;
  try {
    const result = await db.insert(ciudades).values({ name, id_pais });
    res.status(201).json({ message: 'Ciudad creada', result });
  } catch (error: any) {
    // Verificamos si es error de duplicado por restricción UNIQUE
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Ya existe una ciudad con ese nombre en ese país.' });
    }
    console.error(error);
    res.status(500).json({ message: 'Error al crear la ciudad' });
  }
};

export const updateCiudad = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, id_pais } = req.body;
  try {
    await db.update(ciudades)
      .set({ name, id_pais })
      .where(eq(ciudades.id, Number(id)));
    res.json({ message: 'Ciudad actualizada' });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Ya existe una ciudad con ese nombre en ese país.' });
    }
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la ciudad' });
  }
};

export const deleteCiudad = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.delete(ciudades)
      .where(eq(ciudades.id, Number(id)));
    res.json({ message: 'Ciudad eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la ciudad' });
  }
};
