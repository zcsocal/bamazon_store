create database bamazonDB;

use bamazonDB;

create table products
(

	item_id varchar (10) NOT NULL,
    product_name varchar (30) NOT NULL,
    department_name varchar (30) NOT NULL,
    price decimal(10,5) NOT NULL, 
	stock_quantity integer (10) NOT NULL,
    primary key (item_id)


)