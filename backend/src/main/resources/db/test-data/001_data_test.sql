INSERT INTO users (email, first_name, last_name, password, phone_number, role) VALUES
('customer@gmail.com', 'Joe', 'Biden', 'unsecure', '+12345678900', 'CUSTOMER'),
('agent@gmail.com', 'Donald', 'Trump', 'unsecure', '+12345678901', 'AGENT'),
('designer@gmail.com', 'Barack', 'Obama', 'unsecure', '+12345678902', 'DESIGNER'),
('worker@gmail.com', 'George', 'Bush', 'unsecure', '+12345678903', 'WORKER');

INSERT INTO contract (party_name, documents) VALUES
('Івано-Франківська муніципальна служба', '["link", "link2"]'),
('Телеканал СТБ', '["link", "link2", "link3"]'),
('Виконавчий комітет Львівської міської ради', '["link", "link2"]'),
('Виконавчий комітет Черкаської міської ради', '["link", "link2"]');

INSERT INTO warehouse (latitude, longitude, inventory) VALUES
(48.89732, 24.73069, '{"Solvent": 6, "Doctor blade": 7, "Water sprayer": 9, "Box cutter": 11}'),
(49.88233, 24.07211, '{"Solvent": 2, "Doctor blade": 5, "Water sprayer": 7, "Box cutter": 4}');

INSERT INTO ad_order (name, cost_cents, only_design, warehouse_id, status, type, designs, placements) VALUES
('Білборди ІФ, Черкаси', 921000, false, 1, 'IN_ACTION', 'BILLBOARD', '["link", "link2", "link3"]', '[{"billboardId": 12512, "latitude": 48.89986, "longitude": 24.71317, "direction": "SOUTH", "picture": "link"}, {"billboardId": 161762, "latitude": 49.4671, "longitude": 32.02115, "direction": "EAST", "picture": "link"}]'),
('СТБ 30сек', 11270000, false, NULL, 'DISCONTINUED', 'BROADCAST', '["link"]', '[{"channel": "СТБ", "isRadio": false, "nextBroadcast": "2023-10-11T15:10:53.000", "durationSec": 30}]'),
('Бургерна дизайн на машини', 23000, true, NULL, 'DESIGNING', 'TRANSPORT', '[]', '[]'),
('ITStep Академія реклама транспорт', 1157000, false, 2, 'EXECUTING', 'TRANSPORT', '["link"]', '[{"vehicleId": "2351", "type": "METRO", "description": "on left side 1m from the front"}, {"vehicleId": "6375", "type": "METRO", "description": "on left side 5m from back"}, {"vehicleId": "АТ1259ВТ", "type": "BUS", "description": "on back"}, {"vehicleId": "АТ5659ВС", "type": "BUS", "description": "on sides"}, {"vehicleId": "АТ8639СА", "type": "TRUCK", "description": "on sides"}]');

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