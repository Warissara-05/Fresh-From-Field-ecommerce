CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  category TEXT,
  price REAL,
  discount_price REAL,
  image TEXT
);

-- ข้อมูลสินค้าเริ่มต้น
INSERT INTO products (name, category, price, discount_price, image) VALUES
('Bell Pepper', 'Vegetables', 120, 80, 'product-1.jpg'),
('Strawberry', 'Fruits', 120, NULL, 'product-2.jpg'),
('Fruit Juice', 'Juice', 120, NULL, 'product-3.jpg'),
('Purple Cabbage', 'Vegetables', 120, NULL, 'product-4.jpg'),
('Tomato', 'Vegetables', 120, 80, 'product-5.jpg'),
('Brocolli', 'Vegetables', 120, NULL, 'product-6.jpg'),
('Carrots', 'Vegetables', 120, NULL, 'product-7.jpg'),
('Dried Mango', 'Dried', 100, NULL, 'product-8.jpg');
