const db = require('./database');

function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT    NOT NULL,
      contact     TEXT    NOT NULL,
      service     TEXT    NOT NULL,
      date        TEXT    NOT NULL,
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services (
      id       INTEGER PRIMARY KEY AUTOINCREMENT,
      slug     TEXT    NOT NULL,
      title    TEXT    NOT NULL,
      price    TEXT    NOT NULL
    );
  `);

  
  const insert = db.prepare(
    `INSERT OR IGNORE INTO services (slug, title, price) VALUES (?, ?, ?)`
  );

  const seed = db.transaction((rows) => {
    for (const r of rows) insert.run(r.slug, r.title, r.price);
  });

  seed([
    { slug: 'strizhki',     title: 'Авторская стрижка',        price: 'от 2 500 ₽' },
    { slug: 'strizhki',     title: 'Неформатная стрижка',      price: 'от 3 500 ₽' },
    { slug: 'okrashivanie', title: 'Яркий цвет',               price: 'от 4 500 ₽' },
    { slug: 'okrashivanie', title: 'Скрытый цвет',             price: 'от 5 000 ₽' },
    { slug: 'okrashivanie', title: 'Пастель',                  price: 'от 3 500 ₽' },
    { slug: 'combo',        title: 'Стрижка + окрашивание',    price: 'от 6 500 ₽' },
    { slug: 'combo',        title: 'Стрижка + скрытый цвет',   price: 'от 7 000 ₽' },
    { slug: 'care',         title: 'Восстановление волос',     price: 'от 3 000 ₽' },
    { slug: 'care',         title: 'Уход за кожей головы',     price: 'от 2 000 ₽' },
    { slug: 'experiments',  title: 'Цветная прядь',            price: 'от 2 500 ₽' },
    { slug: 'experiments',  title: 'Временная текстура',       price: 'от 2 000 ₽' },
    { slug: 'consultation', title: 'Разбор образа',            price: 'бесплатно при записи / от 500 ₽' },
    { slug: 'consultation', title: 'Проверка волос',           price: 'от 1 000 ₽' },
  ]);

  console.log('База данных инициализирована');
}

module.exports = initDatabase;