create table users (
id serial primary key not null,
email varchar(255) not null unique,
password varchar(1000) not null,
created_date date not null default now()
)

create table users_info (
id serial primary key not null,
user_id INTEGER REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL unique,
first_name varchar(255) not null,
last_name varchar(255) not null,
city varchar(255) not null,
birth_date DATE not null,
gender varchar(50) not null CHECK (gender IN ('female' , 'male', 'other')),
info text
)


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

create table tasks (
id serial primary key not null unique,
user_id INTEGER REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
title varchar(255) not null,
description text not null,
category INTEGER REFERENCES categories (id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
city varchar(255) not null,
address varchar(255) not null,
start_date TIMESTAMP not null CHECK (start_date >= CURRENT_DATE),
finish_date TIMESTAMP not null CHECK (finish_date >= start_date),
post_date DATE not null CHECK (post_date >= CURRENT_DATE) default CURRENT_DATE,
salary INTEGER not null CHECK (salary > 0 ),
is_bargain boolean not null CHECK (is_bargain IN ('true' , 'false')),
status varchar(255) not null check (status IN ('open','in proccess','completed')),
helper INTEGER REFERENCES users_info (id) ON DELETE CASCADE ON UPDATE CASCADE)

drop table tasks

create table tasks (
id serial primary key not null unique,
user_id INTEGER REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
title varchar(255) not null,
description text not null,
category_id INTEGER REFERENCES categories (id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
city varchar(255) not null,
address varchar(255) not null,
start_date TIMESTAMP not null CHECK (start_date >= CURRENT_DATE),
finish_date TIMESTAMP not null CHECK (finish_date >= start_date),
post_date DATE not null  default CURRENT_DATE,
salary INTEGER not null CHECK (salary > 0 ),
is_bargain boolean not null CHECK (is_bargain IN (true, false)),
status varchar(255) not null check (status IN ('open','in proccess','completed')),
helper_id INTEGER REFERENCES users_info (id) ON DELETE CASCADE ON UPDATE CASCADE)

INSERT INTO tasks(user_id, title, description, category_id, city, address, start_date, finish_date, salary, is_bargain, status )
values (8,'Task 1','desription', 1, 'Tel Aviv','Arlozorov 11','2023-04-17 19:42:37','2023-04-18 19:42:37',200,false,'open')


create table cities_israel (
id serial primary key not null unique,
title varchar(255) not null,
district varchar(255) not null
)
INSERT INTO cities_israel (title, district)
VALUES
('Akko', 'North'),
('Afula', 'North'),
('Arad', 'South'),
('Ariel', 'Judea & Samaria'),
('Ashdod', 'South'),
('Ashkelon', 'South'),
('Baqa-Jatt', 'Haifa'),
('Bat Yam', 'Tel Aviv'),
('Beersheba', 'South'),
('Beit Shean', 'North'),
('Beit Shemesh', 'Jerusalem'),
('Beitar Illit', 'Judea & Samaria'),
('Bnei Brak', 'Tel Aviv'),
('Dimona', 'South'),
('Eilat', 'South'),
('Elad', 'Center'),
('Givatayim', 'Tel Aviv'),
('Givat Shmuel', 'Center'),
('Hadera', 'Haifa'),
('Haifa', 'Haifa'),
('Herzliya', 'Tel Aviv'),
('Hod HaSharon', 'Center'),
('Holon', 'Tel Aviv'),
('Jerusalem', 'Jerusalem'),
('Karmiel', 'North'),
('Kafr Qasim', 'Center'),
('Kfar Saba', 'Center'),
('Kiryat Ata', 'Haifa'),
('Kiryat Bialik', 'Haifa'),
('Kiryat Gat', 'South'),
('Kiryat Malakhi', 'South'),
('Kiryat Motzkin', 'Haifa'),
('Kiryat Ono', 'Tel Aviv'),
('Kiryat Shmona', 'North'),
('Kiryat Yam', 'Haifa'),
('Lod', 'Center'),
('Maale Adumim', 'Judea & Samaria'),
('Maalot-Tarshiha', 'North'),
('Migdal HaEmek', 'North'),
('Modiin Illit', 'Judea & Samaria'),
('Modiin-Maccabim-Reut', 'Center'),
('Nahariya', 'North'),
('Nazareth', 'North'),
('Nazareth Illit', 'North'),
('Nesher', 'Haifa'),
('Ness Ziona', 'Center'),
('Netanya', 'Center'),
('Netivot', 'South'),
('Ofakim', 'South'),
('Or Akiva', 'Haifa'),
('Or Yehuda', 'Tel Aviv'),
('Petah Tikva', 'Center'),
('Qalansawe', 'Center'),
('Raanana', 'Center'),
('Rahat', 'South'),
('Ramat Gan', 'Tel Aviv'),
('Ramat HaSharon', 'Tel Aviv'),
('Ramla', 'Center'),
('Rehovot', 'Center'),
('Rishon LeZion', 'Center'),
('Rosh HaAyin', 'Center'),
('Safed', 'North'),
('Sakhnin', 'North'),
('Sderot', 'South'),
('Shefa-Amr', 'North'),
('Tamra', 'North'),
('Tayibe', 'Center'),
('Tel Aviv', 'Tel Aviv'),
('Tiberias', 'North'),
('Tira', 'Center'),
('Tirat Carmel', 'Haifa'),
('Umm al-Fahm', 'Haifa'),
('Yavne', 'Center'),
('Yehud-Monosson', 'Center'),
('Yokneam','North')

create table offers (
id serial primary key not null unique,
task_id INTEGER REFERENCES tasks (id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
helper_id INTEGER REFERENCES users_info (id) ON DELETE CASCADE ON UPDATE CASCADE,
price INTEGER,
comment text,
post_date date not null default now(),
is_read Boolean not null default false
)


create table conversations (
id SERIAL primary key Unique not null,
sender_id INTEGER REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE check (sender_id != receiver_id),
receiver_id INTEGER REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE check (sender_id != receiver_id),
Unique (sender_id,receiver_id)
)

create table messages (
id SERIAL primary key Unique not null,
conversation_id INTEGER REFERENCES "conversations" (id) ON DELETE CASCADE ON UPDATE CASCADE,
message TEXT not null,
post_date TIMESTAMPTZ default now() not null,
sender_id INTEGER REFERENCES "users_info" (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
sender_name varchar(255) not null
)


SELECT  c.id, sender_id, us.first_name as sender_name, receiver_id, ur.first_name as receiver_name  FROM "public"."conversations" as c
left join "public"."users_info" as us
 ON us.user_id = c. sender_id
left join "public"."users_info" as ur
 ON ur.user_id = c. receiver_id
Where sender_id = 8 OR receiver_id=8

create table rating_reviews (
id SERIAL primary key Unique not null,
user_id INTEGER REFERENCES "users_info" (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
rating integer not null check (rating in (1,2,3,4,5)),
review TEXT not null,
post_date TIMESTAMPTZ default now() not null,
sender_name varchar(255) not null
)

create table helpers (
user_id INTEGER REFERENCES "users_info" (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
category_id INTEGER REFERENCES "categories" (id) ON DELETE CASCADE ON UPDATE CASCADE,
Unique (user_id,category_id)
)

