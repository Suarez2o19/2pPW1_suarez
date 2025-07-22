import { Router, Request, Response } from 'express';
import { login } from 'src/controller/auth.controller';
import { getReporteCiudadesPorPais } from "src/controller/reportes.controller";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from 'src/controller/product.controller';

import {
  createPais,
  deletePais,
  getAllPaises,
  updatePais,
} from 'src/controller/paises.controller';

import {
  createCiudad,
  deleteCiudad,
  getAllCiudades,
  updateCiudad,
} from 'src/controller/ciudades.controller';




import verifyToken from 'src/middleware/auth';

const router = Router();
router.get("/reportes/ciudades-por-pais", getReporteCiudadesPorPais);

router.get('/dashboard', (req: Request, res: Response) => {
  res.json({ message: 'Bienvenido a la API de la tienda' });
});

router.get('/status', (req, res) => {
  res.json({ status: 'OK' });
});

router.post('/login', login);

router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

// ----------------------
// Products
// ----------------------
router.get('/products', verifyToken, getAllProducts);
router.post('/products', verifyToken, createProduct);
router.put('/products/:id', verifyToken, updateProduct);
router.delete('/products/:id', verifyToken, deleteProduct);

// ----------------------
// Paises
// ----------------------
router.get('/paises', verifyToken, getAllPaises);
router.post('/paises', verifyToken, createPais);
router.put('/paises/:id', verifyToken, updatePais);
router.delete('/paises/:id', verifyToken, deletePais);

// ----------------------
// Ciudades
// ----------------------
router.get('/ciudades', verifyToken, getAllCiudades);
router.post('/ciudades', verifyToken, createCiudad);
router.put('/ciudades/:id', verifyToken, updateCiudad);
router.delete('/ciudades/:id', verifyToken, deleteCiudad);






export default router;
