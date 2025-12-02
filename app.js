import express from "express";
import * as db from "./data/db.js";

const app = express();

app.use(express.json());

app.get("/api/products", (req, res) => {
  const allProducts = db.getProducts();
  return res.status(200).json(allProducts);
});

app.post("/api/products", (req, res) => {
  const { name, price, amount } = req.body;
  if ((!name, !price, !amount)) {
    return res.status(400).json("A termék adatai nem találhatóak!");
  }
  db.createProduct(name, price, amount);
  return res.status(201).json({ message: "Termék sikeresen létrehozva!" });
});

app.put("/api/products/:id", (req, res) => {
  const id = +req.params.id;
  const product = db.getProductbyId(id);
  if (!product) {
    return res.status(404).json({ message: "Termék nem található!" });
  }
  const { name, price, amount } = req.body;
  if ((!name, !price, !amount)) {
    return res.status(400).json("A termék adatai nem találhatóak!");
  }
  db.updateProduct(name, price, amount);
  return res.status(200).json({ message: "Termék sikeresen modosítva!" });
});

app.listen(3311, () => {
  console.log("Szerver a 3311-es porton fut.");
});

export default app;
