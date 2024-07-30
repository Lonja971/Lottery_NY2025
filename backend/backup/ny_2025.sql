-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Час створення: Лип 30 2024 р., 13:59
-- Версія сервера: 10.4.28-MariaDB
-- Версія PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База даних: `ny_2025`
--

-- --------------------------------------------------------

--
-- Структура таблиці `cases`
--

CREATE TABLE `cases` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `gold` int(11) DEFAULT NULL,
  `tokens` int(11) DEFAULT NULL,
  `red_tokens` int(11) DEFAULT NULL,
  `unique_currency` varchar(255) DEFAULT NULL,
  `unique_price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `cases`
--

INSERT INTO `cases` (`id`, `name`, `gold`, `tokens`, `red_tokens`, `unique_currency`, `unique_price`) VALUES
(1, 'main_cases', 200, 2, NULL, NULL, NULL),
(2, 'regular_cases', NULL, NULL, NULL, 'regular_cases', 1),
(3, 'special_cases', NULL, NULL, NULL, 'special_cases', 1),
(4, 'rare_cases', NULL, NULL, NULL, 'rare_cases', 1),
(5, 'mythical_cases', NULL, NULL, NULL, 'mythical_cases', 1),
(6, 'legendary_cases', NULL, NULL, NULL, 'legendary_cases', 1);

-- --------------------------------------------------------

--
-- Структура таблиці `codes`
--

CREATE TABLE `codes` (
  `id` int(11) NOT NULL,
  `code_name` varchar(255) NOT NULL,
  `get_type` varchar(255) NOT NULL,
  `get_name` varchar(255) NOT NULL,
  `get_value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `codes`
--

INSERT INTO `codes` (`id`, `code_name`, `get_type`, `get_name`, `get_value`) VALUES
(1, '5oo', 'resource', 'gold', '500'),
(2, '2000', 'resource', 'silver', '2000'),
(3, 'tankk', 'tank', '2', '1');

-- --------------------------------------------------------

--
-- Структура таблиці `tanks`
--

CREATE TABLE `tanks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `transcription` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `land` varchar(255) NOT NULL,
  `conversion_value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `tanks`
--

INSERT INTO `tanks` (`id`, `name`, `transcription`, `type`, `land`, `conversion_value`) VALUES
(2, 'Об\'єкт 490', 'obj_490', 'ht', 'ua', 7600),
(3, 'Об\'єкт 490 Білка', 'obj_490_squirrel', 'camo', 'ua', 1500),
(5, 'PZ 5/4', 'pz_5-4', 'lt', 'ge', 5600),
(6, 'Т-20-22', 't_20_22', 'lt', 'ussr', 6800),
(7, 'Sheridan', 'sheridan', 'lt', 'usa', 7200),
(8, 'БТ-СВ', 'bt_sv', 'lt', 'ussr', 7000),
(9, 'AMX ELS bic', 'amx_els_bic', 'lt', 'fr', 6400),
(10, 'ELS EVEN 90', 'els_even_90', 'lt', 'fr', 6800),
(11, 'Progetto 46', 'progetto_46', 'lt', 'it', 6800),
(12, 'Т-34 Харків', 't_34_kharkiv', 'lt', 'ua', 6400),
(13, 'Т-54', 't_54', 'lt', 'ua', 6800),
(14, 'Kranwagn', 'kranwagn', 'ht', 'sw', 7600),
(15, 'AMX M4 54', 'amx_m4_54', 'ht', 'fr', 7200),
(16, 'Maus', 'maus', 'ht', 'ge', 7600),
(17, 'Tiger (P)', 'tiger_p', 'ht', 'ge', 6800),
(18, 'Tiger Titan', 'tiger_titan', 'ht', 'ge', 6800),
(19, 'M5 Yoh', 'm5_yoh', 'ht', 'usa', 7600),
(20, 'Bisonte C45', 'bisonte_c45', 'ht', 'it', 7200),
(21, 'Type 5 Heavy', 'type_5_heavy', 'ht', 'jp', 7600),
(22, 'Т-64 БМ Оплот', 't_64_bm_oplot', 'ht', 'ua', 7600),
(23, 'КВ-2', 'kv_2', 'ht', 'ussr', 6400),
(24, 'ИС-2 Варіант ||', 'is_2_var2', 'ht', 'ussr', 6800),
(25, 'T-95', 't_95', 'td', 'usa', 7200),
(26, 'Grill 15', 'grill_15', 'td', 'ge', 7600),
(27, 'Віндікатор', 'vindicator', 'td', 'inter', 6800),
(28, 'Minotauro', 'minotauro', 'td', 'it', 7600),
(29, 'Bat-Chat 25t', 'bat_chat_25t', 'lt', 'fr', 6400),
(30, 'T-57 Heavy', 't_57_heavy', 'ht', 'usa', 7200),
(31, 'Togg ||*', 'togg_2', 'ht', 'br', 6400),
(32, 'ИС-7', 'is_7', 'ht', 'ussr', 7600),
(33, 'Дробар', 'crusher', 'ht', 'inter', 6800),
(34, 'СУ-152', 'sy_152', 'td', 'ussr', 6000),
(35, 'S 35 CA', 's_35_ca', 'td', 'fr', 5600),
(36, 'Cherchill GC', 'cherchill_gc', 'td', 'br', 5600),
(37, 'AMX 30 1-prot', 'amx_30_1prot', 'lt', 'fr', 6800),
(38, 'PZ B2', 'pz_b2', 'ht', 'ge', 6400),
(39, 'WZ 111', 'wz_111', 'ht', 'ch', 6400),
(40, 'СУ-130 ПМ', 'sy_130_pm', 'td', 'ussr', 6800),
(41, 'Strv 103b', 'strv_103b', 'td', 'sw', 7600),
(42, 'Turbo Räumpanzer', 'turbo_raumpanzer', 'ht', 'ge', 6800),
(43, 'Шерідан Ракетний', 'sheridan_rocket', 'camo', 'usa', 1500),
(44, 'ELS EVEN 90 Мандарин', 'els_even_90_tangerine', 'camo', 'fr', 1500),
(45, 'Т-34 Харків Зимній снайпер', 't_34_kharkiv_winter', 'camo', 'ua', 2000),
(46, 'Т-54 Патріот1', 't_54_patriot1', 'camo', 'ua', 500),
(47, 'Т-54 Патріот2', 't_54_patriot2', 'camo', 'ua', 500),
(48, 'AMX M4 54 Новорічний', 'amx_m4_54_newyear', 'camo', 'fr', 2000),
(49, 'Maus Легіонер', 'maus_legionary', 'camo', 'ge', 1500),
(50, 'Maus Привид', 'maus_ghost', 'camo', 'ge', 2000),
(51, 'Золотий Тигр', 'golden_tiger', 'camo', 'ge', 2000),
(52, 'Тигр \"Чорний Ліс\"', 'tiger_blackforest', 'camo', 'ge', 1500),
(53, 'Tiger (P) GT', 'tiger_p_gt', 'camo', 'ge', 1500),
(54, 'T-95 Незламний', 't_95_unbreakable', 'camo', 'usa', 1500),
(55, 'Grill 15 Новорічний Рейдер', 'grill_15_newyear_raider', 'camo', 'ge', 2500),
(56, 'Віндікатор \"Темні янголи\"', 'vindicator_dark_angels', 'camo', 'inter', 1500),
(57, 'Віндікатор \"Імперський кулак\"', 'vindicator_imperial_fist', 'camo', 'inter', 1500),
(58, 'Minotauro Новорічний', 'minotauro_newyear', 'camo', 'it', 1500);

-- --------------------------------------------------------

--
-- Структура таблиці `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `identifier` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `device` varchar(255) DEFAULT NULL,
  `created_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `tokens`
--

INSERT INTO `tokens` (`id`, `identifier`, `user_id`, `device`, `created_at`) VALUES
(3, '583e282fa0c45e86d288a6bb9f1b5a5f', 4, '::1_Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0', 1722327620),
(4, '4ca84c08550d5722c784cc6a85ccdc3e', 5, '::1_Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0', 1722327857),
(5, 'b08b2ddc7c6339584e6e08675ed66214', 6, '::1_Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0', 1722328014),
(6, 'a5745c44357fb8b9b2e10ad8c830c861', 7, '::1_Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0', 1722328170),
(7, 'b90bbbe5d46de679e901fb0e3022920e', 8, '::1_Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0', 1722328246),
(8, '89e0e50daf91fcfd32853bd2ed0d028c', 3, '::1_Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0', 1722328395),
(9, '087f932c57b524811093898f22143f51', 2, '::1_Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0', 1722329621);

-- --------------------------------------------------------

--
-- Структура таблиці `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gold` int(11) NOT NULL,
  `silver` int(11) NOT NULL,
  `tokens` int(11) NOT NULL,
  `red_tokens` int(11) NOT NULL,
  `tanks` int(11) NOT NULL,
  `premium_akk` int(11) NOT NULL,
  `drawings` int(11) NOT NULL,
  `regular_cases` int(11) NOT NULL,
  `special_cases` int(11) NOT NULL,
  `rare_cases` int(11) NOT NULL,
  `mythical_cases` int(11) NOT NULL,
  `legendary_cases` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `gold`, `silver`, `tokens`, `red_tokens`, `tanks`, `premium_akk`, `drawings`, `regular_cases`, `special_cases`, `rare_cases`, `mythical_cases`, `legendary_cases`) VALUES
(2, '--Bogach', '$2y$10$TDM4ItQD9kiMYICbyK5XceAAsBX2cE7zygdc6z4E8AOfan8pszKlC', 5500, 2000, 16, 8, 5, 0, 4, 1, 0, 1, 0, 12),
(3, 'Залізний Панцир', '$2y$10$AqtdnlDsmPiTOeatpYe/VOyPgzeCQgUdtzNDYbOcJAGe7TeMKZfx2', 3000, 26500, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0),
(4, 'Вогнений тапок', '$2y$10$fqZ02AHrHhASSa32SekpKuaXTR4hUQp/cz3JwSW9LVMJcjwBBrJey', 0, 2500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(5, 'Killua', '$2y$10$9RcfARbasxfCPBFxnr3voew1uxvaKkf6cmx8.xLk0g/XF5PQKqGZ.', 8500, 4000, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0),
(6, 'Davidk104', '$2y$10$ZrDIgq5LrRt9ilVOcRC5Se6xprv415k.2I6u53Jw36Kk3k1Y4bu9i', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(7, 'Відкривачкін', '$2y$10$tn2831PC9wnJ8jjVMELN6eKxwHwdg6EXq4Q4C0k1t1NHpXRvqO4sy', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(8, 'MrStinger__', '$2y$10$kYk/RVabewLat0.kF0Xg6OC8CJ/G6KYJKA4tyH0KueCWxXYPk3ILK', 38500, 23000, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Структура таблиці `user_codes`
--

CREATE TABLE `user_codes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `code_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `user_codes`
--

INSERT INTO `user_codes` (`id`, `user_id`, `code_id`) VALUES
(1, 2, 1),
(2, 2, 2),
(3, 2, 3);

-- --------------------------------------------------------

--
-- Структура таблиці `user_tanks`
--

CREATE TABLE `user_tanks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `tank_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `user_tanks`
--

INSERT INTO `user_tanks` (`id`, `user_id`, `tank_id`) VALUES
(1, 3, 5),
(2, 3, 6),
(3, 3, 7),
(4, 3, 8),
(5, 3, 9),
(6, 3, 10),
(7, 3, 11),
(8, 3, 12),
(9, 3, 13),
(10, 3, 14),
(11, 3, 15),
(12, 3, 16),
(13, 3, 17),
(14, 3, 18),
(15, 3, 19),
(16, 3, 20),
(17, 3, 21),
(18, 3, 22),
(19, 3, 23),
(20, 3, 24),
(21, 3, 25),
(22, 3, 26),
(23, 3, 27),
(24, 3, 28),
(25, 3, 43),
(26, 3, 44),
(27, 3, 45),
(28, 3, 46),
(29, 3, 47),
(30, 3, 48),
(31, 3, 49),
(32, 3, 50),
(33, 3, 51),
(34, 3, 52),
(35, 3, 53),
(36, 3, 54),
(37, 3, 55),
(38, 3, 57),
(39, 3, 56),
(40, 3, 58),
(41, 4, 29),
(42, 4, 12),
(43, 4, 14),
(44, 4, 15),
(45, 4, 16),
(46, 4, 30),
(47, 4, 31),
(48, 4, 32),
(49, 4, 21),
(50, 4, 33),
(51, 4, 34),
(52, 4, 35),
(53, 4, 36),
(54, 4, 48),
(55, 4, 49),
(56, 4, 45),
(57, 5, 10),
(58, 5, 28),
(59, 5, 58),
(60, 5, 44),
(61, 6, 37),
(62, 6, 9),
(63, 6, 13),
(64, 6, 12),
(65, 6, 22),
(66, 6, 38),
(67, 6, 39),
(68, 6, 30),
(69, 6, 40),
(70, 6, 41),
(71, 6, 47),
(72, 2, 2);

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `codes`
--
ALTER TABLE `codes`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `tanks`
--
ALTER TABLE `tanks`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Індекси таблиці `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `user_codes`
--
ALTER TABLE `user_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `code_id` (`code_id`);

--
-- Індекси таблиці `user_tanks`
--
ALTER TABLE `user_tanks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `tank_id` (`tank_id`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `cases`
--
ALTER TABLE `cases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблиці `codes`
--
ALTER TABLE `codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблиці `tanks`
--
ALTER TABLE `tanks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT для таблиці `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблиці `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблиці `user_codes`
--
ALTER TABLE `user_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблиці `user_tanks`
--
ALTER TABLE `user_tanks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Обмеження зовнішнього ключа таблиці `user_codes`
--
ALTER TABLE `user_codes`
  ADD CONSTRAINT `user_codes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_codes_ibfk_2` FOREIGN KEY (`code_id`) REFERENCES `codes` (`id`);

--
-- Обмеження зовнішнього ключа таблиці `user_tanks`
--
ALTER TABLE `user_tanks`
  ADD CONSTRAINT `user_tanks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_tanks_ibfk_2` FOREIGN KEY (`tank_id`) REFERENCES `tanks` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
