-- -----------------------------------------------------
-- Table Creation
-- -----------------------------------------------------

-- 1. Employees Table
CREATE TABLE Employees (
    employeeID INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    hireDate DATE NULL,
    PRIMARY KEY (employeeID)
);

-- 2. Customers Table
CREATE TABLE Customers (
    customerID INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NULL,
    phone VARCHAR(15) NULL,
    PRIMARY KEY (customerID)
);

-- 3. Scents Table
CREATE TABLE Scents (
    scentID INT AUTO_INCREMENT NOT NULL,
    scentName VARCHAR(100) NOT NULL,
    description VARCHAR(255) NULL,
    PRIMARY KEY (scentID)
);

-- 4. Sizes Table
CREATE TABLE Sizes (
    sizeID INT AUTO_INCREMENT NOT NULL,
    sizeLabel VARCHAR(20) NOT NULL,
    volumeOz DECIMAL(4,1) NOT NULL,
    PRIMARY KEY (sizeID)
);

-- 5. Candles Table
CREATE TABLE Candles (
    candleID INT AUTO_INCREMENT NOT NULL,
    scentID INT NOT NULL,
    sizeID INT NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    stockQty INT NOT NULL,
    lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (candleID),
    FOREIGN KEY (scentID) REFERENCES Scents(scentID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (sizeID) REFERENCES Sizes(sizeID)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- 6. Sales Table
CREATE TABLE Sales (
    saleID INT AUTO_INCREMENT NOT NULL,
    saleTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    totalAmount DECIMAL(8,2) NOT NULL,
    employeeID INT NOT NULL,
    customerID INT NULL,
    PRIMARY KEY (saleID),
    FOREIGN KEY (employeeID) REFERENCES Employees(employeeID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (customerID) REFERENCES Customers(customerID)
        ON UPDATE CASCADE ON DELETE SET NULL
);

-- 7. SalesItems Table (Intersection Table for M:N Sales <-> Candles)
CREATE TABLE SalesItems (
    saleItemID INT AUTO_INCREMENT NOT NULL,
    saleID INT NOT NULL,
    candleID INT NOT NULL,
    quantity INT NOT NULL,
    unitPrice DECIMAL(6,2) NOT NULL,
    PRIMARY KEY (saleItemID),
    FOREIGN KEY (saleID) REFERENCES Sales(saleID)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (candleID) REFERENCES Candles(candleID)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Sample Data Insertions
-- -----------------------------------------------------

-- Insert Employees
INSERT INTO Employees (firstName, lastName, hireDate) VALUES
('John', 'Doe', '2024-01-15'),
('Jane', 'Smith', '2024-03-01'),
('Robert', 'Johnson', '2025-06-10');

-- Insert Customers
INSERT INTO Customers (firstName, lastName, email, phone) VALUES
('Alice', 'Walker', 'alice.walker@example.com', '541-555-0192'),
('Charlie', 'Brown', 'charlie.b@example.com', '541-555-0144'),
('Emma', 'Davis', 'emma.davis@example.com', '541-555-0188');

-- Insert Scents
INSERT INTO Scents (scentName, description) VALUES
('Lavender Fields', 'Soothing fresh lavender with subtle notes of eucalyptus.'),
('Teakwood & Amber', 'Warm woody aroma blended with sweet amber and spice.'),
('Vanilla Bean', 'Classic creamy vanilla with a soft, sweet finish.');

-- Insert Sizes
INSERT INTO Sizes (sizeLabel, volumeOz) VALUES
('Small Tin', 4.0),
('Medium Jar', 8.0),
('Large 3-Wick', 16.0);

-- Insert Candles
INSERT INTO Candles (scentID, sizeID, price, stockQty) VALUES
(1, 1, 12.50, 25),
(1, 2, 22.00, 15),
(2, 2, 24.00, 10),
(3, 3, 35.00, 8);  

-- Insert Sales
INSERT INTO Sales (saleTimestamp, totalAmount, employeeID, customerID) VALUES
('2026-07-20 10:15:00', 34.50, 1, 1),
('2026-07-20 11:30:00', 35.00, 1, 2),
('2026-07-21 14:05:00', 44.00, 2, 1);

-- Insert SalesItems
-- M:N 
INSERT INTO SalesItems (saleID, candleID, quantity, unitPrice) VALUES
(1, 1, 1, 12.50), -- Sale 1: 1x Lavender Small
(1, 2, 1, 22.00), -- Sale 1: 1x Lavender Medium
(2, 4, 1, 35.00), -- Sale 2: 1x Vanilla Large
(3, 2, 2, 22.00); -- Sale 3: 2x Lavender Medium
