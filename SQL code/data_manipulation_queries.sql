-- CS340 CS Database - Candle Shop POS System
-- Group 54: Zander Pantelick & Abderrahmane Rhandouri
-- Project Step 3: Data Manipulation Queries (DML)
-- Note: Variables prefixed with ':' denote inputs coming from the backend programming language.
-- We used AI to find appropriate linking queries and refreshment on JOINs

-- =====================================================
-- 1. EMPLOYEES QUERIES
-- =====================================================

-- Get all employees for the Browse Employees page
SELECT employeeId, firstName, lastName, hireDate 
FROM Employees;

-- Add a new employee
INSERT INTO Employees (firstName, lastName, hireDate)
VALUES (:firstNameInput, :lastNameInput, :hireDateInput);


-- Update employee details
UPDATE Employees 
SET firstName = :firstNameInput, lastName = :lastNameInput, hireDate = :hireDateInput
WHERE employeeId = :employeeId_from_form;

-- Delete an employee (will be blocked if tied to active sales due to RESTRICT)
DELETE FROM Employees 
WHERE employeeId = :employeeId_selected;


-- =====================================================
-- 2. CUSTOMERS QUERIES
-- =====================================================

-- Get all active/inactive customers for Browse Customers page
SELECT customerId, firstName, lastName, email, isActive 
FROM Customers;

-- Add a new customer
INSERT INTO Customers (firstName, lastName, email, createdDate, isActive)
VALUES (:firstNameInput, :lastNameInput, :emailInput, CURRENT_DATE(), 1);


-- Update customer info
UPDATE Customers 
SET firstName = :firstNameInput, lastName = :lastNameInput, email = :emailInput, isActive = :isActiveInput
WHERE customerId = :customerId_from_form;

-- Soft-delete customer (preserves historical sales data)
UPDATE Customers 
SET isActive = 0 
WHERE customerId = :customerId_selected;


-- =====================================================
-- 3. SCENTS QUERIES
-- =====================================================

-- Get all scents
SELECT scentId, scentName, description 
FROM Scents;

-- Add a new scent
INSERT INTO Scents (scentName)
VALUES (:scentNameInput);

-- Update a scent profile
UPDATE Scents 
SET scentName = :scentNameInput
WHERE scentId = :scentId_from_form;

-- Delete a scent (blocked if referenced by Candles)
DELETE FROM Scents 
WHERE scentId = :scentId_selected;


-- =====================================================
-- 4. SIZES QUERIES
-- =====================================================

-- Get all sizes
SELECT sizeId, sizeLabel, volumeOz 
FROM Sizes;

-- Add a new size
INSERT INTO Sizes (sizeLabel)
VALUES (:sizeLabelInput);

-- Update a size
UPDATE Sizes 
SET sizeLabel = :sizeLabelInput
WHERE sizeId = :sizeId_from_form;

-- Delete a size (blocked if referenced by Candles)
DELETE FROM Sizes 
WHERE sizeId = :sizeId_selected;


-- =====================================================
-- 5. CANDLES QUERIES (Physical Catalog)
-- =====================================================

-- Get all candles with joined Scent and Size names for user-friendly displaying
SELECT Candles.candleId, Scents.scentName, Sizes.sizeLabel, Candles.price, Candles.stockQty, Candles.lastUpdated
FROM Candles
INNER JOIN Scents ON Candles.scentId = Scents.scentId
INNER JOIN Sizes ON Candles.sizeId = Sizes.sizeId;


-- Add a new candle SKU
INSERT INTO Candles (scentId, sizeId, price, stockQty)
VALUES (:scentId_from_dropdown, :sizeId_from_dropdown, :priceInput, :stockQtyInput);

-- Update candle price and stock
UPDATE Candles 
SET scentId = :scentId_from_dropdown, sizeId = :sizeId_from_dropdown, price = :priceInput, stockQty = :stockQtyInput
WHERE candleId = :candleId_from_form;

-- Delete a candle SKU
DELETE FROM Candles 
WHERE candleId = :candleId_selected;


-- =====================================================
-- 6. SALES QUERIES (Header Receipts)
-- =====================================================

-- Get all sales with joined Employee and Customer names
SELECT Sales.saleId, Sales.saleTimestamp, Sales.totalAmount, 
       CONCAT(Employees.firstName, ' ', Employees.lastName) AS employeeName,
       CONCAT(Customers.firstName, ' ', Customers.lastName) AS customerName
FROM Sales
INNER JOIN Employees ON Sales.employeeId = Employees.employeeId
INNER JOIN Customers ON Sales.customerId = Customers.customerId;


-- Record a new sale transaction header
INSERT INTO Sales (saleTimestamp, totalAmount, employeeId, customerId)
VALUES (CURRENT_TIMESTAMP(), :totalAmountInput, :employeeId_from_dropdown, :customerId_from_dropdown);

-- Update a sale header
UPDATE Sales 
SET employeeId = :employeeId_from_dropdown, customerId = :customerId_from_dropdown, totalAmount = :totalAmountInput
WHERE saleId = :saleId_from_form;

-- Delete a sale header (Cascades to SalesItems line items)
DELETE FROM Sales 
WHERE saleId = :saleId_selected;


-- =====================================================
-- 7. SALESITEMS QUERIES (Line Items M:N Bridge)
-- =====================================================

-- Get line items with joined details for a specific sale or overview browse
SELECT SalesItems.saleItemId, SalesItems.saleId, 
       CONCAT(Scents.scentName, ' - ', Sizes.sizeLabel) AS candleDescription,
       SalesItems.quantity, SalesItems.unitPrice, 
       (SalesItems.quantity * SalesItems.unitPrice) AS lineTotal
FROM SalesItems
INNER JOIN Candles ON SalesItems.candleId = Candles.candleId
INNER JOIN Scents ON Candles.scentId = Scents.scentId
INNER JOIN Sizes ON Candles.sizeId = Sizes.sizeId;

-- Add a line item to a sale
INSERT INTO SalesItems (saleId, candleId, quantity, unitPrice)
VALUES (:saleId_from_form, :candleId_from_dropdown, :quantityInput, :unitPriceInput);

-- Update a line item
UPDATE SalesItems 
SET candleId = :candleId_from_dropdown, quantity = :quantityInput, unitPrice = :unitPriceInput
WHERE saleItemId = :saleItemId_from_form;

-- Delete a specific line item
DELETE FROM SalesItems 
WHERE saleItemId = :saleItemId_selected;