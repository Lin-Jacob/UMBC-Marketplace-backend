CREATE TABLE umbcmarketplace.users(
id INT AUTO_INCREMENT PRIMARY KEY,
umbc_verified boolean,
cookie varchar(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
username varchar(255) UNIQUE,
profile_image varchar(255),
user_password varchar(255),
email varchar(255) UNIQUE,
phone_number varchar(255) UNIQUE
 );
