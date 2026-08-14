-- PL.sql - Candle Shop POS Stored Procedures
DELIMITER $$

-- Reset Procedure
DROP PROCEDURE IF EXISTS `ResetDatabase`$$
CREATE PROCEDURE `ResetDatabase`()
BEGIN
  START TRANSACTION;
  SET FOREIGN_KEY_CHECKS = 0;

  TRUNCATE TABLE SalesItems;
  TRUNCATE TABLE Sales;
  TRUNCATE TABLE Candles;
  TRUNCATE TABLE Customers;
  TRUNCATE TABLE Employees;
  TRUNCATE TABLE Scents;
  TRUNCATE TABLE Sizes;

  INSERT INTO Employees (firstName, lastName, hireDate) VALUES
  ('John', 'Doe', '2024-01-15'), ('Jane', 'Smith', '2024-03-01'), ('Robert', 'Johnson', '2025-06-10');

  INSERT INTO Customers (firstName, lastName, email, phone, createdDate, isActive) VALUES
  ('Alice', 'Walker', 'alice.walker@example.com', '541-555-0192', '2025-01-10', 1),
  ('Charlie', 'Brown', 'charlie.b@example.com', '541-555-0144', '2025-03-22', 1),
  ('Emma', 'Davis', 'emma.davis@example.com', '541-555-0188', '2025-11-05', 0);

  INSERT INTO Scents (scentName, description) VALUES
  ('Lavender Fields', 'Soothing fresh lavender with subtle notes of eucalyptus.'),
  ('Teakwood & Amber', 'Warm woody aroma blended with sweet amber and spice.'),
  ('Vanilla Bean', 'Classic creamy vanilla with a soft, sweet finish.');

  INSERT INTO Sizes (sizeLabel, volumeOz) VALUES
  ('Small Tin', 4.0), ('Medium Jar', 8.0), ('Large 3-Wick', 16.0);

  INSERT INTO Candles (scentId, sizeId, price, stockQty) VALUES
  (1, 1, 12.50, 25), (1, 2, 22.00, 15), (2, 2, 24.00, 10), (3, 3, 35.00, 8);

  INSERT INTO Sales (saleTimestamp, totalAmount, employeeId, customerId) VALUES
  ('2026-07-20 10:15:00', 34.50, 1, 1), ('2026-07-20 11:30:00', 35.00, 1, 2), ('2026-07-21 14:05:00', 44.00, 2, 1);

  INSERT INTO SalesItems (saleId, candleId, quantity, unitPrice) VALUES
  (1, 1, 1, 12.50), (1, 2, 1, 22.00), (2, 4, 1, 35.00), (3, 2, 2, 22.00);

  SET FOREIGN_KEY_CHECKS = 1;
  COMMIT;
END$$

-- Generic Entity Stored Procedures
-- Candles
DROP PROCEDURE IF EXISTS `sp_GetCandles`$$
CREATE PROCEDURE `sp_GetCandles`() BEGIN SELECT * FROM Candles; END$$

DROP PROCEDURE IF EXISTS `sp_InsertCandle`$$
CREATE PROCEDURE `sp_InsertCandle`(IN p_scentId INT, IN p_sizeId INT, IN p_price DECIMAL(6,2), IN p_stockQty INT)
BEGIN
  INSERT INTO Candles (scentId, sizeId, price, stockQty) VALUES (p_scentId, p_sizeId, p_price, p_stockQty);
  SELECT * FROM Candles WHERE candleId = LAST_INSERT_ID();
END$$

DROP PROCEDURE IF EXISTS `sp_DeleteCandle`$$
CREATE PROCEDURE `sp_DeleteCandle`(IN p_id INT)
BEGIN
  DELETE FROM Candles WHERE candleId = p_id;
END$$

-- Scents
DROP PROCEDURE IF EXISTS `sp_GetScents`$$
CREATE PROCEDURE `sp_GetScents`() BEGIN SELECT * FROM Scents; END$$

DROP PROCEDURE IF EXISTS `sp_InsertScent`$$
CREATE PROCEDURE `sp_InsertScent`(IN p_scentName VARCHAR(100), IN p_description VARCHAR(255))
BEGIN
  INSERT INTO Scents (scentName, description) VALUES (p_scentName, p_description);
  SELECT * FROM Scents WHERE scentId = LAST_INSERT_ID();
END$$

DROP PROCEDURE IF EXISTS `sp_DeleteScent`$$
CREATE PROCEDURE `sp_DeleteScent`(IN p_id INT)
BEGIN
  DELETE FROM Scents WHERE scentId = p_id;
END$$

-- Sizes
DROP PROCEDURE IF EXISTS `sp_GetSizes`$$
CREATE PROCEDURE `sp_GetSizes`() BEGIN SELECT * FROM Sizes; END$$

DROP PROCEDURE IF EXISTS `sp_InsertSize`$$
CREATE PROCEDURE `sp_InsertSize`(IN p_sizeLabel VARCHAR(20), IN p_volumeOz DECIMAL(4,1))
BEGIN
  INSERT INTO Sizes (sizeLabel, volumeOz) VALUES (p_sizeLabel, p_volumeOz);
  SELECT * FROM Sizes WHERE sizeId = LAST_INSERT_ID();
END$$

DROP PROCEDURE IF EXISTS `sp_DeleteSize`$$
CREATE PROCEDURE `sp_DeleteSize`(IN p_id INT)
BEGIN
  DELETE FROM Sizes WHERE sizeId = p_id;
END$$

-- Customers
DROP PROCEDURE IF EXISTS `sp_GetCustomers`$$
CREATE PROCEDURE `sp_GetCustomers`() BEGIN SELECT * FROM Customers; END$$

DROP PROCEDURE IF EXISTS `sp_InsertCustomer`$$
CREATE PROCEDURE `sp_InsertCustomer`(IN p_firstName VARCHAR(50), IN p_lastName VARCHAR(50), IN p_email VARCHAR(100), IN p_phone VARCHAR(15), IN p_isActive TINYINT(1))
BEGIN
  INSERT INTO Customers (firstName, lastName, email, phone, isActive) VALUES (p_firstName, p_lastName, p_email, p_phone, IFNULL(p_isActive, 1));
  SELECT * FROM Customers WHERE customerId = LAST_INSERT_ID();
END$$

DROP PROCEDURE IF EXISTS `sp_DeleteCustomer`$$
CREATE PROCEDURE `sp_DeleteCustomer`(IN p_id INT)
BEGIN
  DELETE FROM Customers WHERE customerId = p_id;
END$$

-- Employees
DROP PROCEDURE IF EXISTS `sp_GetEmployees`$$
CREATE PROCEDURE `sp_GetEmployees`() BEGIN SELECT * FROM Employees; END$$

DROP PROCEDURE IF EXISTS `sp_InsertEmployee`$$
CREATE PROCEDURE `sp_InsertEmployee`(IN p_firstName VARCHAR(50), IN p_lastName VARCHAR(50), IN p_hireDate DATE)
BEGIN
  INSERT INTO Employees (firstName, lastName, hireDate) VALUES (p_firstName, p_lastName, p_hireDate);
  SELECT * FROM Employees WHERE employeeId = LAST_INSERT_ID();
END$$

DROP PROCEDURE IF EXISTS `sp_DeleteEmployee`$$
CREATE PROCEDURE `sp_DeleteEmployee`(IN p_id INT)
BEGIN
  DELETE FROM Employees WHERE employeeId = p_id;
END$$

-- Sales
DROP PROCEDURE IF EXISTS `sp_GetSales`$$
CREATE PROCEDURE `sp_GetSales`() BEGIN SELECT * FROM Sales; END$$

DROP PROCEDURE IF EXISTS `sp_InsertSale`$$
CREATE PROCEDURE `sp_InsertSale`(IN p_totalAmount DECIMAL(8,2), IN p_employeeId INT, IN p_customerId INT)
BEGIN
  INSERT INTO Sales (totalAmount, employeeId, customerId) VALUES (p_totalAmount, p_employeeId, p_customerId);
  SELECT * FROM Sales WHERE saleId = LAST_INSERT_ID();
END$$

DROP PROCEDURE IF EXISTS `sp_DeleteSale`$$
CREATE PROCEDURE `sp_DeleteSale`(IN p_id INT)
BEGIN
  DELETE FROM Sales WHERE saleId = p_id;
END$$

-- SalesItems
DROP PROCEDURE IF EXISTS `sp_GetSalesItems`$$
CREATE PROCEDURE `sp_GetSalesItems`() BEGIN SELECT * FROM SalesItems; END$$

DROP PROCEDURE IF EXISTS `sp_InsertSalesItem`$$
CREATE PROCEDURE `sp_InsertSalesItem`(IN p_saleId INT, IN p_candleId INT, IN p_quantity INT, IN p_unitPrice DECIMAL(6,2))
BEGIN
  INSERT INTO SalesItems (saleId, candleId, quantity, unitPrice) VALUES (p_saleId, p_candleId, p_quantity, p_unitPrice);
  SELECT * FROM SalesItems WHERE saleItemId = LAST_INSERT_ID();
END$$

DROP PROCEDURE IF EXISTS `sp_DeleteSalesItem`$$
CREATE PROCEDURE `sp_DeleteSalesItem`(IN p_id INT)
BEGIN
  DELETE FROM SalesItems WHERE saleItemId = p_id;
END$$

DELIMITER ;