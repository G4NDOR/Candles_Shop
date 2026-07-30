-- MySQL Script generated for CS340 CS Database - Candle Shop POS System
-- Group 54: Zander Pantelick & Abderrahmane Rhandouri
-- Project Step 2 DDL + Sample Data

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;
START TRANSACTION;

-- -----------------------------------------------------
-- Table Drops
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SalesItems`;
DROP TABLE IF EXISTS `Sales`;
DROP TABLE IF EXISTS `Candles`;
DROP TABLE IF EXISTS `Customers`;
DROP TABLE IF EXISTS `Employees`;
DROP TABLE IF EXISTS `Scents`;
DROP TABLE IF EXISTS `Sizes`;

-- -----------------------------------------------------
-- Table Creation & Design Decisions
-- -----------------------------------------------------

-- 1. Scents Table: Stores distinct scent profiles to prevent redundant text entries across candles.
CREATE TABLE IF NOT EXISTS `Scents` (
  `scentId` INT NOT NULL AUTO_INCREMENT,
  `scentName` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`scentId`)
);

-- 2. Sizes Table: Normalizes container size labels and volumes.
CREATE TABLE IF NOT EXISTS `Sizes` (
  `sizeId` INT NOT NULL AUTO_INCREMENT,
  `sizeLabel` VARCHAR(20) NOT NULL,
  `volumeOz` DECIMAL(4,1) NOT NULL,
  PRIMARY KEY (`sizeId`)
);

-- 3. Employees Table
CREATE TABLE IF NOT EXISTS `Employees` (
  `employeeId` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50) NOT NULL,
  `lastName` VARCHAR(50) NOT NULL,
  `hireDate` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`employeeId`)
);

-- 4. Customers Table: Stores customer contact info. Uses isActive flag for soft deletion 
-- so sales history remains intact without deleting customer rows.
CREATE TABLE IF NOT EXISTS `Customers` (
  `customerId` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50) NOT NULL,
  `lastName` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `phone` VARCHAR(15) NULL DEFAULT NULL,
  `createdDate` DATE NOT NULL DEFAULT (CURRENT_DATE),
  `isActive` TINYINT(1) NOT NULL DEFAULT 1,
  UNIQUE INDEX (`email` ASC),
  PRIMARY KEY (`customerId`)
);

-- 5. Candles Table: Bridge representing physical inventory, linking a scent and size combination.
-- Uses ON DELETE RESTRICT to ensure active candle products aren't orphaned if a scent/size is deleted.
CREATE TABLE IF NOT EXISTS `Candles` (
  `candleId` INT NOT NULL AUTO_INCREMENT,
  `scentId` INT NOT NULL,
  `sizeId` INT NOT NULL,
  `price` DECIMAL(6,2) NOT NULL,
  `stockQty` INT NOT NULL,
  `lastUpdated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`candleId`),
  INDEX `FK_Candles_Scents` (`scentId` ASC),
  INDEX `FK_Candles_Sizes` (`sizeId` ASC),
  CONSTRAINT `FK_Candles_Scents`
    FOREIGN KEY (`scentId`)
    REFERENCES `Scents` (`scentId`)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT `FK_Candles_Sizes`
    FOREIGN KEY (`sizeId`)
    REFERENCES `Sizes` (`sizeId`)
    ON UPDATE CASCADE ON DELETE RESTRICT
);

-- 6. Sales Table
CREATE TABLE IF NOT EXISTS `Sales` (
  `saleId` INT NOT NULL AUTO_INCREMENT,
  `saleTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `totalAmount` DECIMAL(8,2) NOT NULL,
  `employeeId` INT NOT NULL,
  `customerId` INT NOT NULL,
  PRIMARY KEY (`saleId`),
  INDEX `FK_Sales_Employees` (`employeeId` ASC),
  INDEX `FK_Sales_Customers` (`customerId` ASC),
  CONSTRAINT `FK_Sales_Employees`
    FOREIGN KEY (`employeeId`)
    REFERENCES `Employees` (`employeeId`)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT `FK_Sales_Customers`
    FOREIGN KEY (`customerId`)
    REFERENCES `Customers` (`customerId`)
    ON UPDATE CASCADE ON DELETE RESTRICT
);

-- 7. SalesItems Table: Intersection table resolving M:M relationship between Sales and Candles.
-- Stores unitPrice at time of purchase to preserve historical pricing if Candle prices change later.
CREATE TABLE IF NOT EXISTS `SalesItems` (
  `saleItemId` INT NOT NULL AUTO_INCREMENT,
  `saleId` INT NOT NULL,
  `candleId` INT NOT NULL,
  `quantity` INT NOT NULL,
  `unitPrice` DECIMAL(6,2) NOT NULL,
  PRIMARY KEY (`saleItemId`),
  INDEX `FK_SalesItems_Sales` (`saleId` ASC),
  INDEX `FK_SalesItems_Candles` (`candleId` ASC),
  CONSTRAINT `FK_SalesItems_Sales`
    FOREIGN KEY (`saleId`)
    REFERENCES `Sales` (`saleId`)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `FK_SalesItems_Candles`
    FOREIGN KEY (`candleId`)
    REFERENCES `Candles` (`candleId`)
    ON UPDATE CASCADE ON DELETE RESTRICT
);

-- -----------------------------------------------------
-- Sample Data Insertions
-- -----------------------------------------------------

INSERT INTO Employees (firstName, lastName, hireDate) VALUES
('John', 'Doe', '2024-01-15'),
('Jane', 'Smith', '2024-03-01'),
('Robert', 'Johnson', '2025-06-10');

INSERT INTO Customers (firstName, lastName, email, phone, createdDate, isActive) VALUES
('Alice', 'Walker', 'alice.walker@example.com', '541-555-0192', '2025-01-10', 1),
('Charlie', 'Brown', 'charlie.b@example.com', '541-555-0144', '2025-03-22', 1),
('Emma', 'Davis', 'emma.davis@example.com', '541-555-0188', '2025-11-05', 0);

INSERT INTO Scents (scentName, description) VALUES
('Lavender Fields', 'Soothing fresh lavender with subtle notes of eucalyptus.'),
('Teakwood & Amber', 'Warm woody aroma blended with sweet amber and spice.'),
('Vanilla Bean', 'Classic creamy vanilla with a soft, sweet finish.');

INSERT INTO Sizes (sizeLabel, volumeOz) VALUES
('Small Tin', 4.0),
('Medium Jar', 8.0),
('Large 3-Wick', 16.0);

INSERT INTO Candles (scentId, sizeId, price, stockQty) VALUES
(1, 1, 12.50, 25),
(1, 2, 22.00, 15),
(2, 2, 24.00, 10),
(3, 3, 35.00, 8);  

INSERT INTO Sales (saleTimestamp, totalAmount, employeeId, customerId) VALUES
('2026-07-20 10:15:00', 34.50, 1, 1),
('2026-07-20 11:30:00', 35.00, 1, 2),
('2026-07-21 14:05:00', 44.00, 2, 1);

INSERT INTO SalesItems (saleId, candleId, quantity, unitPrice) VALUES
(1, 1, 1, 12.50),
(1, 2, 1, 22.00),
(2, 4, 1, 35.00),
(3, 2, 2, 22.00);

-- Restore checks and commit transaction
SET FOREIGN_KEY_CHECKS = 1;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
COMMIT;