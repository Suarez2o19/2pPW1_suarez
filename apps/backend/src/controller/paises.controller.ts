import { Request, Response } from 'express';
import { db } from '../db/connection';
import { paises, ciudades } from '../db/schema';
import { eq } from 'drizzle-orm';
import { asc, desc } from 'drizzle-orm';
//.orderBy(desc(paises.createdAt)); // 👈 del más nuevo al más viejo



export const getAllPaises = async (_req: Request, res: Response) => {
  try {
    const allPaises = await db.select().from(paises).orderBy(asc(paises.name));
    res.json(allPaises);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los países' });
  }
};

export const createPais = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const result = await db.insert(paises).values({ name });
    res.status(201).json({ message: 'País creado', result });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Ya existe un país con ese nombre.' });
    }
    console.error(error);
    res.status(500).json({ message: 'Error al crear el país' });
  }
};

export const updatePais = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await db.update(paises)
      .set({ name })
      .where(eq(paises.id, Number(id)));
    res.json({ message: 'País actualizado' });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Ya existe un país con ese nombre.' });
    }
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el país' });
  }
};

export const deletePais = async (req: Request, res: Response) => {
  const { id } = req.params;
  const paisId = Number(id);

  try {
    // Verificar si existen ciudades asociadas a este país
    const ciudadesAsociadas = await db
      .select()
      .from(ciudades)
      .where(eq(ciudades.id_pais, paisId));

    if (ciudadesAsociadas.length > 0) {
      return res.status(400).json({
        message: 'No se puede eliminar el país porque tiene ciudades asociadas.',
      });
    }

    // Si no hay ciudades asociadas, proceder a eliminar
    await db.delete(paises).where(eq(paises.id, paisId));
    res.json({ message: 'País eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el país' });
  }
};
