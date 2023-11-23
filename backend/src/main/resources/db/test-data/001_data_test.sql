INSERT INTO users (email, first_name, last_name, password, phone_number, role, is_disabled) VALUES
('customer@gmail.com', 'Joe', 'Biden', '$2a$10$/na8o2yjtEo0heyv0ZOuiONhRQDdeVHzze47fe6yH70EAUiQzaRfu', '+12345678900', 'CUSTOMER', false),
('agent@gmail.com', 'Donald', 'Trump', '$2a$10$/na8o2yjtEo0heyv0ZOuiONhRQDdeVHzze47fe6yH70EAUiQzaRfu', '+12345678901', 'AGENT', false),
('designer@gmail.com', 'Barack', 'Obama', '$2a$10$/na8o2yjtEo0heyv0ZOuiONhRQDdeVHzze47fe6yH70EAUiQzaRfu', '+12345678902', 'DESIGNER', false),
('worker@gmail.com', 'George', 'Bush', '$2a$10$/na8o2yjtEo0heyv0ZOuiONhRQDdeVHzze47fe6yH70EAUiQzaRfu', '+12345678903', 'WORKER', false),
('disabled@gmail.com', 'disabled', 'disabled', '$2a$10$/na8o2yjtEo0heyv0ZOuiONhRQDdeVHzze47fe6yH70EAUiQzaRfu', '+12345678904', 'AGENT', true);

INSERT INTO contract (party_name, documents) VALUES
('Івано-Франківська муніципальна служба', '["link", "link2"]'),
('Телеканал СТБ', '["link", "link2", "link3"]'),
('Виконавчий комітет Львівської міської ради', '["link", "link2"]'),
('Виконавчий комітет Черкаської міської ради', '["link", "link2"]');

INSERT INTO warehouse (latitude, longitude, inventory) VALUES
(48.89732, 24.73069, '{"Solvent": 6, "Doctor blade": 7, "Water sprayer": 9, "Box cutter": 11}'),
(49.88233, 24.07211, '{"Solvent": 2, "Doctor blade": 5, "Water sprayer": 7, "Box cutter": 4}');

INSERT INTO ad_order (name, cost_cents, budget_cents, only_design, warehouse_id, status, type, designs, placements) VALUES
('АТБ благ акція білборди ІФ, Черкаси', 921000, 1000000, false, 1, 'IN_ACTION', 'BILLBOARD', '["https://www.myvin.com.ua/uploads/ckeditor/pictures/10967/content_Blagotvoritelnost_1200x628px.jpg"]', '[{"boardId": 12512, "latitude": 48.89986, "longitude": 24.71317, "direction": "SOUTH", "picture": "https://shyroko.com.ua/wp-content/uploads/2015/10/Bord.jpg"}, {"boardId": 161762, "latitude": 49.4671, "longitude": 32.02115, "direction": "EAST", "picture": "https://znaj.ua/crops/80106a/620x0/1/0/2021/01/12/LywLLm9jNDYPizkutvr5AvBxeZOOaXQiGYGpXtiW.jpeg"}]'),
('Еко маркет знижки на СТБ 60сек', 11270000, 12000000, false, NULL, 'DISCONTINUED', 'BROADCAST', '[]', '[{"channel": "СТБ", "isRadio": false, "nextBroadcast": "2023-10-11T15:10:53.000", "durationSec": 60}]'),
('Нова бургерна дизайн реклами', 23000, 23000, true, NULL, 'DESIGNING', 'TRANSPORT', '[]', '[]'),
('ITStep Академія реклама', 1157000, 1160000, false, 2, 'EXECUTING', 'TRANSPORT', '["https://scontent.fifo3-1.fna.fbcdn.net/v/t39.30808-6/347228058_628903015495971_1575363893281217928_n.png?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=4dXvKK0kTPQAX-sbTUw&_nc_ht=scontent.fifo3-1.fna&oh=00_AfB06n7Q_Jvz5aGcb_ZmdVgJLlo8yn3BFvHUmw6T7jOA5g&oe=6560160D", "https://dity.lviv.ua/userfiles/image/%D0%BB%D1%8C%D0%B2%D1%96%D0%B2/Screenshot_58.png", "https://instagram.fifo3-1.fna.fbcdn.net/v/t39.30808-6/401418956_18384059341067434_6939324802705474824_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyIn0&_nc_ht=instagram.fifo3-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=ZjbACYP8BwcAX9fUcYe&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzIzNjQ3OTI2ODUyMjgwNDUzNw%3D%3D.2-ccb7-5&oh=00_AfBP9Xv_-GL912sJn_YI0jkrIrpU0OLYseAjQ0uhqyzsAg&oe=655F21B8&_nc_sid=ee9879"]', '[{"vehicleId": "2351", "type": "METRO", "description": "on left side 1m from the front", "picture": "https://glavcom.ua/img/article/8461/32_main-v1652772372.jpg"}, {"vehicleId": "6375", "type": "METRO", "description": "on left side 5m from back"}, {"vehicleId": "АТ1259ВТ", "type": "BUS", "picture": "https://static.ukrinform.com/photos/2019_07/thumb_files/630_360_1563974800-245.jpg"}, {"vehicleId": "АТ5659ВС", "type": "BUS", "description": "on sides", "picture": "https://autoreview.ru/images/gallery/%D0%93%D1%80%D1%83%D0%B7%D0%BE%D0%B2%D0%B8%D0%BA%D0%B8%20%D0%B8%20%D0%B0%D0%B2%D1%82%D0%BE%D0%B1%D1%83%D1%81%D1%8B/news-2021/August/21/1%20ZAZ.JPG"}, {"vehicleId": "АТ8639СА", "type": "TRUCK", "description": "on sides", "picture": "https://defence-ua.com/media/illustration/articles/7415f5a5a39494a2.jpg"}]');

INSERT INTO ad_order_contract (ad_order_id, contract_id) VALUES
(1, 1),
(1, 4),
(2, 2),
(3, 1),
(4, 3);

INSERT INTO ad_order_user (ad_order_id, user_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 1),
(3, 2),
(3, 3),
(4, 1),
(4, 2),
(4, 4);