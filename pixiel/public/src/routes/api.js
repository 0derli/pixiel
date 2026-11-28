const express = require('express');
const router = express.Router();
const db = require('../models/database');

router.post('/bookings', (req, res) => {
  const { name, contact, service, date } = req.body || {};

  if (!name || !contact || !service || !date) {
    return res.status(400).json({ error: 'Заполните все поля' });
  }

  const today = new Date().toISOString().slice(0, 10);
  if (date < today) {
    return res.status(400).json({ error: 'Дата не может быть в прошлом' });
  }

  try {
    const stmt = db.prepare(
      `INSERT INTO bookings (name, contact, service, date) VALUES (?, ?, ?, ?)`
    );
    const info = stmt.run(name.trim(), contact.trim(), service, date);

    const created = db
      .prepare(`SELECT * FROM bookings WHERE id = ?`)
      .get(info.lastInsertRowid);

    res.status(201).json({ ok: true, booking: created });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Не удалось сохранить заявку' });
  }
});

router.get('/bookings', (req, res) => {
  try {
    const rows = db.prepare(`SELECT * FROM bookings ORDER BY id DESC`).all();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка чтения заявок' });
  }
});

router.get('/services', (req, res) => {
  try {
    const rows = db.prepare(`SELECT * FROM services ORDER BY id`).all();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка чтения услуг' });
  }
});

module.exports = router;