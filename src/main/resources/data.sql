INSERT INTO Sector (sector_name,brief) VALUES
  ('Banking', 'An industry and a section of the economy devoted to the holding of financial assets for others and investing those financial assets as a leveraged way to create more wealth.'),
  ('Information Technology', 'Information Technology in India is an industry consisting of two major components: IT services and business process outsourcing (BPO).'),
  ('Food Processing', 'Food and Beverage (F&B) segment is one segment, which would get affected most with the increase in retail players. Among all the retail segments, Food and Beverage (F&B) is the one preferred by almost all the retail players.');

INSERT INTO Company (name,ceo,board_of_directors,turnover,sector_id,company_brief) VALUES
  ('HDFC', 'Sashidhar Jagdishan','Atanu Chakraborty, Malay Patel', 120858.23, 1,'HDFC Bank is one of the largest private sector bank by assets and by market capitalisation as of April 2021.'),
  ('Britannia', 'Varun Berry','Nusli N Wadia, Avijit Deb', 123780.83, 3, 'It is an Indian food and beverage company, part of the Wadia Group headed by Nusli Wadia.'),
  ('Nestle', 'Suresh Narayanan', 'David McDaniel, Rama Bijapurkar', 150500.89, 3, 'It is a Swiss multinational food and drinks processing conglomerate corporation headquartered in Vevey, Vaud, Switzerland.' );
  
INSERT INTO Stock_Exchange (name, remark, address, brief) VALUES
	('NSE','National Stock Exchange of India Ltd','Mumbai, Maharashtra, India','National Stock Exchange of India Limited is the leading stock exchange of India. It is under the ownership of Some leading financial institutions, Banks, and Insurance companies.'),
	('BSE','Bombay Stock Exchange','Mumbai, Maharashtra, India', 'BSE Limited, also known as the Bombay Stock Exchange, is an Indian stock exchange located on Dalal Street in Mumbai. Established in 1875, it is Asia oldest stock exchange. ');
  
INSERT INTO Stock_Market_User (name,password,email,confirmed,admin,role) VALUES
	('admin', 'adminPassword', 'myroughspace@gmail.com', true, true,'ROLE_ADMIN'),
	('user03', 'userPassword', 'amisha03@gmail.com', true, false, 'ROLE_USER');
	
INSERT INTO Company_Stock_Exchange_Map(company_id, stockexchange_id, company_code) VALUES
	(1, 1, '001'),
	(2, 2, '002'),
	(1, 2, '003');
	
INSERT INTO IPO_Detail(company_id, price_per_share, total_shares, open_date_time, remark) VALUES
	(1, 100.50, 100, '2021-01-08T13:05:08', 'IPO Accepted');
	
INSERT INTO Stock_Price(company_id, company_code, stock_exchange_name, shareprice, stock_price_date, stock_price_time) VALUES
	(1, '001', 'NSE', 323.34, '2021-11-08', '11:15:08'),
	(1, '001', 'NSE', 352.34, '2021-10-08', '11:20:08'),
	(1, '001', 'NSE', 340.34, '2021-09-08', '11:35:08'),
	(1, '001', 'NSE', 362.34, '2021-08-08', '11:45:08'),
	(1, '001', 'NSE', 352.34, '2021-07-08', '11:50:08'),
	(1, '001', 'NSE', 380.34, '2021-06-08', '11:55:08'),
	(2, '002', 'BSE', 323.34, '2021-11-08', '11:15:08'),
	(2, '002', 'BSE', 152.34, '2021-10-08', '11:20:08'),
	(2, '002', 'BSE', 390.34, '2021-09-08', '11:35:08'),
	(2, '002', 'BSE', 502.34, '2021-08-08', '11:45:08'),
	(2, '002', 'BSE', 452.34, '2021-07-08', '11:50:08'),
	(2, '002', 'BSE', 380.34, '2021-06-08', '11:55:08'),
    (3, '003', 'NSE', 223.34, '2021-11-08', '11:15:08'),
	(3, '003', 'NSE', 192.34, '2021-10-08', '11:20:08'),
	(3, '003', 'NSE', 390.34, '2021-09-08', '11:35:08'),
	(3, '003', 'NSE', 302.34, '2021-08-08', '11:45:08'),
	(3, '003', 'NSE', 352.34, '2021-07-08', '11:50:08'),
	(3, '003', 'NSE', 380.34, '2021-06-08', '11:55:08');