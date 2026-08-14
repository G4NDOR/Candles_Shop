-- DML.sql - Data Manipulation Queries for CS340 Project

-- -----------------------------------------------------
-- RESET PROCEDURE
-- -----------------------------------------------------
CALL ResetDatabase();

-- -----------------------------------------------------
-- SELECT QUERIES
-- -----------------------------------------------------
CALL sp_GetCandles();
CALL sp_GetScents();
CALL sp_GetSizes();
CALL sp_GetCustomers();
CALL sp_GetEmployees();
CALL sp_GetSales();
CALL sp_GetSalesItems();

-- -----------------------------------------------------
-- INSERT QUERIES
-- -----------------------------------------------------
CALL sp_InsertCandle(:scentIdInput, :sizeIdInput, :priceInput, :stockQtyInput);
CALL sp_InsertScent(:scentNameInput, :descriptionInput);
CALL sp_InsertSize(:sizeLabelInput, :volumeOzInput);
CALL sp_InsertCustomer(:firstNameInput, :lastNameInput, :emailInput, :phoneInput, :isActiveInput);
CALL sp_InsertEmployee(:firstNameInput, :lastNameInput, :hireDateInput);
CALL sp_InsertSale(:totalAmountInput, :employeeIdInput, :customerIdInput);
CALL sp_InsertSalesItem(:saleIdInput, :candleIdInput, :quantityInput, :unitPriceInput);

-- -----------------------------------------------------
-- UPDATE QUERIES
-- -----------------------------------------------------
UPDATE Candles SET scentId = :scentIdInput, sizeId = :sizeIdInput, price = :priceInput, stockQty = :stockQtyInput WHERE candleId = :candleIdSelected;
UPDATE Scents SET scentName = :scentNameInput, description = :descriptionInput WHERE scentId = :scentIdSelected;
UPDATE Sizes SET sizeLabel = :sizeLabelInput, volumeOz = :volumeOzInput WHERE sizeId = :sizeIdSelected;
UPDATE Customers SET firstName = :firstNameInput, lastName = :lastNameInput, email = :emailInput, phone = :phoneInput, isActive = :isActiveInput WHERE customerId = :customerIdSelected;
UPDATE Employees SET firstName = :firstNameInput, lastName = :lastNameInput, hireDate = :hireDateInput WHERE employeeId = :employeeIdSelected;
UPDATE Sales SET totalAmount = :totalAmountInput, employeeId = :employeeIdInput, customerId = :customerIdInput WHERE saleId = :saleIdSelected;
UPDATE SalesItems SET saleId = :saleIdInput, candleId = :candleIdInput, quantity = :quantityInput, unitPrice = :unitPriceInput WHERE saleItemId = :saleItemIdSelected;

-- -----------------------------------------------------
-- DELETE QUERIES
-- -----------------------------------------------------
CALL sp_DeleteCandle(:candleIdSelected);
CALL sp_DeleteScent(:scentIdSelected);
CALL sp_DeleteSize(:sizeIdSelected);
CALL sp_DeleteCustomer(:customerIdSelected);
CALL sp_DeleteEmployee(:employeeIdSelected);
CALL sp_DeleteSale(:saleIdSelected);
CALL sp_DeleteSalesItem(:saleItemIdSelected);