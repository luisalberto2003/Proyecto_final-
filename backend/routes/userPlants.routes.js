import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Obtener plantas de un usuario
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    console.log("Buscando plantas para usuario:", userId);

    const result = await pool.query(
      `SELECT up.id,
              up.user_id,
              up.plant_id,
              up.nickname,
              up.planted_date,
              up.current_moisture,
              COALESCE(up.nickname, pc.common_name) AS displayName,
              pc.common_name, 
              pc.scientific_name
       FROM user_plants up
       JOIN plant_catalog pc ON pc.id = up.plant_id
       WHERE up.user_id = $1`,
      [userId]
    );

    console.log("Plantas encontradas:", result.rows.length);
    res.json(result.rows);
    
  } catch (error) {
    console.error("ERROR EN GET /user-plants/:userId:", error);
    res.status(500).json({ 
      error: "Error al cargar plantas",
      message: error.message,
      detail: error.detail 
    });
  }
});

// REGAR PLANTA - Actualizar hidratación
router.patch("/:id/water", async (req, res) => {
  try {
    const { id } = req.params;
    const { moisture } = req.body;

    const result = await pool.query(
      `UPDATE user_plants 
       SET current_moisture = $1 
       WHERE id = $2 
       RETURNING *`,
      [moisture, id]
    );

    console.log("Planta regada:", result.rows[0]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("ERROR EN PATCH /user-plants/:id/water:", error);
    res.status(500).json({ 
      error: "Error al regar planta",
      message: error.message 
    });
  }
});

// Agregar planta
router.post("/", async (req, res) => {
  try {
    const { user_id, common_name, nickname } = req.body;
    
    console.log("Guardando planta:", { user_id, common_name, nickname });

    const plantResult = await pool.query(
      "SELECT id FROM plant_catalog WHERE LOWER(common_name) = LOWER($1)",
      [common_name]
    );

    if (plantResult.rows.length === 0) {
      return res.status(400).json({ error: "Planta no existe en el catálogo" });
    }

    const plant_id = plantResult.rows[0].id;

    const insertResult = await pool.query(
      `INSERT INTO user_plants (user_id, plant_id, nickname, current_moisture, planted_date)
       VALUES ($1, $2, $3, 98, CURRENT_DATE)
       RETURNING *`,
      [user_id, plant_id, nickname]
    );

    console.log("Planta guardada:", insertResult.rows[0]);
    res.json(insertResult.rows[0]);
    
  } catch (error) {
    console.error("ERROR EN POST /user-plants:", error);
    res.status(500).json({ 
      error: "Error al guardar planta",
      message: error.message 
    });
  }
});

// Eliminar planta
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM user_plants WHERE id = $1", [req.params.id]);
    res.json({ ok: true });
  } catch (error) {
    console.error("ERROR EN DELETE /user-plants:", error);
    res.status(500).json({ 
      error: "Error al eliminar planta",
      message: error.message 
    });
  }
});

export default router;