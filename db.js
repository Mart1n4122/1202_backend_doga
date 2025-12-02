import Database from "better-sqlite3";

const db = new Database("./data/db.sqlite");

db.prepare(
  "CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price INT, amount INT)"
).run();

export const getProducts = () => {
  return db.prepare("SELECT * from products").all();
};

export const getProductbyId = (id) => {
  return db.prepare("SELECT * from products WHERE id=?").run(id);
};

export const createProduct = (name, price, amount) => {
  return db
    .prepare("INSERT into products (name, price, amount) VALUES (?, ?, ?)")
    .run(name, price, amount);
};

export const updateProduct = (id, name, price, amount) => {
  return db
    .prepare("UPDATE products SET name = ?, price = ?, amount = ? WHERE id = ?")
    .run(id, name, price, amount);
};

export default db;
