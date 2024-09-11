import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static(path.join(__dirname, "src")));

// Root
app.get("/", (_, res) => {
  res.render("index", { title: "Teraleads", message: "Welcome to Teraleads" });
});

// Dashboard
app.get("/dashboard", (_, res) => {
  res.render("dashboard", {
    title: "Dashboard",
    message: "Welcome to your Dashboard",
  });
});

// cart
app.get("/cart", (_, res) => {
  res.render("cart", { title: "cart", message: "Your product in cart" });
});

// coupons
app.get("/coupons", (_, res) => {
  res.render("coupons", { title: "Coupons", message: "Get discount % %" });
});

// feedback
app.get("/feedback", (_, res) => {
  res.render("feedback", { title: "Feedback", message: "Customers Reviews" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});