CREATE TABLE bsb (
	bsbNumber VARCHAR(6) PRIMARY KEY, 
	bankCode VARCHAR(10), 
	bankName VARCHAR(255), 
	address VARCHAR(255), 
	suburb VARCHAR(255), 
	postcode INT, 
	state VARCHAR(100), 
	payments VARCHAR(3)
);