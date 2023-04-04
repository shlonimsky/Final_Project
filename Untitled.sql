-- create table users_info (
-- id serial primary key not null,
-- user_id INTEGER REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL unique,
-- first_name varchar(255) not null,
-- last_name varchar(255) not null,
-- city varchar(255) not null,
-- birth_date DATE not null,
-- gender varchar(50) not null CHECK (gender IN ('female' , 'male', 'other')),
-- info text
-- )

-- create table users (
-- id serial primary key not null,
-- email varchar(255) not null unique,
-- password varchar(1000) not null,
-- created_date date not null default now()
-- )
create table categories (
id serial primary key not null,
title varchar(255) not null unique,
description varchar(255) not null
)


INSERT INTO categories(title, description)
VALUES 
('Courier services','Need a quick delivery or shipping? Find a verified courier within a few minutes.'),
('Cleaning services', 'Find a cleaning professional in just a few clicks!'),
('Repairmen','Choose the proven masters without a middleman'),
('Movers','Do you need to urgently transfer goods or perform other logistics? We have many proven performers at affordable prices!'),
('Artisans and craftsmen','Our service has a large number of proven performers. To choose a professional, just create a new task!'),
('Repair of appliances','Need help in repairing appliances for an affordable price? Are you looking for a good specialist? Just create a task and find a requirement specialist'),
('Finishing works','Repair works, building services at reasonable prices, excellent quality of work. Order our services now!'),
('Construction works','You can find construction, landscape, architectural works and budgeting on our platform'),
('Photo and video services','Photography services, videographer, aerial photography, video editing, photoshop and more are available on our website'),
('Design','Do you need to develop your style, draw a logo or design a website? Everything you can find in this category'),
('Advertising and marketing','Do you need to advertise a product? Do you want to find a specialist who will help you make the right advertisement? There are many specialists and opportunities over here!'),
('WEB and APP Development','Need s new website for your business? Do you want to quickly find a web developer? Specialists from Helper will perform the service with high quality and inexpensively!'),
('Animals','Do you need to take care of your pet while you are on vacation or away? Our executors will be happy to fulfill any of your orders.'),
('Translations','Technical, written translations and interpretations are available on Helper.'),
('Holiday Organization','Do you want to organize a one in a lifetime holiday? Entrust this to professionals! Create a task on Helper and our organizers will contact you shortly.'),
('Education','Would you like to learn a foreign language before a vacation or a business trip? Are you looking for teacher for you child? A lot of qualified educators joined Helper and are available for you'),
('Coaching','Are you thinking of playing sports? Do you want to find a professional trainer? Only verified trainers with reviews and ratings are on our service! Train with us!'),
('Beauty and health','Are you looking for a experienced specialist in the field of beauty and health? Order services from us on Helper!'),
('Business','Finance and low specialists, HRs and security services ready to solve your business issues quickly and efficiently!'),
('Miscellaneous','Could not find a category you need? Try to search here!')
RETURNING *;