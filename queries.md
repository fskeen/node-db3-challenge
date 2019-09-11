# Database Queries

### Display the ProductName and CategoryName for all products in the database. Shows 76 records.

SELECT ProductName, CategoryName
FROM [Products]
join [Categories] as Cat on cat.categoryid = products.categoryID

### Display the OrderID and ShipperName for all orders placed before January 9, 1997. Shows 161 records.

SELECT OrderID, OrderDate, ShipperName
FROM [Orders]
join [Shippers] on shippers.shipperid = orders.shipperid
where orderdate < '1997-01-09'

### Display all ProductNames and Quantities placed on order 10251. Sort by ProductName. Shows 3 records.

SELECT p.productname, quantity, o.orderid
FROM [Orders] as o
join orderdetails as od on od.orderid = o.orderid
join products as p on p.productid = od.productid
where o.orderid = 10251
order by p.productname

### Display the OrderID, CustomerName and the employee's LastName for every order. All columns should be labeled clearly. Displays 196 records.

SELECT O.orderID as "Order_Number", C.customerName as "Customer", lastName as "Employee"
from [Orders] as O
join [Employees] as E on E.employeeID = O.employeeID
join [Customers] as C on C.customerID = O.customerID


### (Stretch)  Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.

SELECT products.categoryID, CategoryName, count(products.categoryid) as "# of Products in Category" 
FROM [Products] 
join [Categories] as C on C.categoryID = products.categoryID
group by products.categoryiD


### (Stretch) Display OrderID and a column called ItemCount that shows the total number of products placed on the order. Shows 196 records. 

SELECT OrderID, sum(quantity) as "Total Items"
FROM [OrderDetails]
group by orderid