# 🌍 Proyecto CRUD: Países y Ciudades

Este proyecto es una aplicación web que permite gestionar **países y ciudades** mediante operaciones CRUD (crear, leer, actualizar, eliminar), utilizando un backend con Node.js y un frontend con React.

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Suarez2o19/paises-ciuadades.git
cd paises-ciuadades
````

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar la aplicación

```bash
npm run dev
```

## 🛠️ Funcionalidades Principales

* Registrar países y ciudades.
* Validaciones para evitar duplicados (ej. no repetir una ciudad en el mismo país).
* Impide eliminar países que tengan ciudades asociadas.

## 🧩 Módulos CRUD Implementados

### 📌 Países

* Crear nuevo país.
* Listar todos los países.
* Editar nombre del país.
* Eliminar país (solo si no tiene ciudades vinculadas).

### 🏙️ Ciudades

* Crear nueva ciudad (asociada a un país).
* Listar ciudades por país.
* Editar nombre de ciudad.
* Eliminar ciudad.

---

## 📄 Reporte

El sistema genera un reporte que muestra todos los países junto con la cantidad de ciudades que tiene.

🔗 Para acceder al reporte:

* Ir a la opción **"Ver Reporte"** en el menú principal.

---

## 👨‍💻 Tecnologías Usadas

* **Frontend:** React + TailwindCSS
* **Backend:** Node.js + Express + Drizzle ORM
* **Base de datos:** MySQL
* **Herramienta de desarrollo:** Vite

---

📁 **Repositorio:**
[https://github.com/Suarez2o19/paises-ciuadades](https://github.com/Suarez2o19/paises-ciuadades)
