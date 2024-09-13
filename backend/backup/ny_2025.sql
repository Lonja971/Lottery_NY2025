-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Sep 13, 2024 at 01:20 PM
-- Server version: 8.0.35
-- PHP Version: 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `NY_2025`
--

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

CREATE TABLE `cases` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `gold` int DEFAULT NULL,
  `tokens` int DEFAULT NULL,
  `red_tokens` int DEFAULT NULL,
  `drawings` int DEFAULT NULL,
  `unique_currency` varchar(255) DEFAULT NULL,
  `unique_price` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cases`
--

INSERT INTO `cases` (`id`, `name`, `gold`, `tokens`, `red_tokens`, `drawings`, `unique_currency`, `unique_price`) VALUES
(1, 'main_cases', 200, 2, NULL, NULL, NULL, NULL),
(2, 'regular_cases', NULL, NULL, NULL, NULL, 'regular_cases', 1),
(3, 'special_cases', NULL, NULL, NULL, NULL, 'special_cases', 1),
(4, 'rare_cases', NULL, NULL, NULL, NULL, 'rare_cases', 1),
(5, 'mythical_cases', NULL, NULL, NULL, NULL, 'mythical_cases', 1),
(6, 'legendary_cases', NULL, NULL, NULL, NULL, 'legendary_cases', 1),
(7, 'waff_cases', NULL, NULL, 2, NULL, NULL, NULL),
(8, 'new_years_tank1', NULL, NULL, NULL, 12, NULL, NULL),
(9, 'new_years_tank2', NULL, NULL, NULL, 12, NULL, NULL),
(10, 'france_nation_cases', NULL, NULL, 2, NULL, NULL, NULL),
(11, 'new_years_camo1', NULL, NULL, NULL, 6, NULL, NULL),
(12, 'new_years_camo2', NULL, NULL, NULL, 6, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `codes`
--

CREATE TABLE `codes` (
  `id` int NOT NULL,
  `code_name` varchar(255) NOT NULL,
  `get_type` varchar(255) NOT NULL,
  `get_name` varchar(255) NOT NULL,
  `get_value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `codes`
--

INSERT INTO `codes` (`id`, `code_name`, `get_type`, `get_name`, `get_value`) VALUES
(1, '5oo', 'resource', 'gold', '500'),
(3, 'tankk', 'tank', '2', '1'),
(4, 'na_vse_dobre)', 'resource', 'gold', '1000'),
(5, 'z_novim_rokom', 'tank', '77', '1');

-- --------------------------------------------------------

--
-- Table structure for table `exchange_gold`
--

CREATE TABLE `exchange_gold` (
  `id` int NOT NULL,
  `exchange_resource` varchar(255) NOT NULL,
  `exchange_value` int NOT NULL,
  `get_value` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `exchange_gold`
--

INSERT INTO `exchange_gold` (`id`, `exchange_resource`, `exchange_value`, `get_value`) VALUES
(1, 'silver', 2500, 100),
(2, 'counters', 10, 100),
(3, 'premium_akk', 5, 500),
(4, 'drawings', 1, 400),
(5, 'tokens', 1, 100),
(6, 'red_tokens', 1, 200);

-- --------------------------------------------------------

--
-- Table structure for table `exchange_red_tokens`
--

CREATE TABLE `exchange_red_tokens` (
  `id` int NOT NULL,
  `exchange_resource` varchar(255) NOT NULL,
  `exchange_value` int NOT NULL,
  `get_value` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `exchange_red_tokens`
--

INSERT INTO `exchange_red_tokens` (`id`, `exchange_resource`, `exchange_value`, `get_value`) VALUES
(1, 'tokens', 2, 1),
(2, 'gold', 400, 1);

-- --------------------------------------------------------

--
-- Table structure for table `guarantors`
--

CREATE TABLE `guarantors` (
  `id` int NOT NULL,
  `case_id` int DEFAULT NULL,
  `discoveries_number` int DEFAULT NULL,
  `guarantor_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tank_id` int DEFAULT NULL,
  `amount` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `guarantors`
--

INSERT INTO `guarantors` (`id`, `case_id`, `discoveries_number`, `guarantor_type`, `tank_id`, `amount`) VALUES
(3, 7, 50, 'tank', 59, 1),
(4, 10, 50, 'tank', 63, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tanks`
--

CREATE TABLE `tanks` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `transcription` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `land` varchar(255) NOT NULL,
  `conversion_value` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tanks`
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
(42, 'Turbo Räumpanzer', 'turbo_raumpanzer', 'ht', 'inter', 6800),
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
(58, 'Minotauro Новорічний', 'minotauro_newyear', 'camo', 'it', 1500),
(59, 'Waf. Auf E 100', 'waff_auf_e_100', 'td', 'ge', 7500),
(60, 'Останній Ваффентраген', 'waff_auf_e_100_the_last', 'camo', 'ge', 1500),
(61, 'E 100', 'e_100', 'ht', 'ge', 7500),
(62, 'E 100 Втоплений Титан', 'e_100_sinked', 'camo', 'ge', 1500),
(63, 'Char Futur 4', 'char_futur_4', 'lt', 'fr', 7500),
(64, 'Project Murat', 'project_murat', 'lt', 'fr', 7500),
(65, 'FCM 50t', 'fcm_50t', 'lt', 'fr', 5600),
(66, 'AMX CDC', 'amx_cdc', 'lt', 'fr', 5600),
(67, 'AMX 13 75', 'amx_13_75', 'lt', 'fr', 5600),
(68, 'Panhard EBR 105', 'panhard_ebr_105', 'lt', 'fr', 7600),
(69, 'AMX 50b', 'amx_50b', 'ht', 'fr', 7200),
(70, 'AMX 30b', 'amx_30b', 'ht', 'fr', 6400),
(71, 'Lorrain 40t', 'lorrain_40t', 'ht', 'fr', 6000),
(72, 'FOSH 155', 'fosh_155', 'td', 'fr', 7200),
(73, 'Богач', 'amx_50b_bogach', 'camo', 'fr', 1500),
(74, 'Сталевий Мисливець', 'amx_m4_54_steel_hunter', 'camo', 'fr', 2000),
(75, 'Королівський', 'fosh_155_king', 'camo', 'fr', 1000),
(76, 'Піщаний', 'panhard_ebr_105_sand', 'camo', 'fr', 1000),
(77, 'E 25', 'e_25', 'td', 'ge', 2000);

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int NOT NULL,
  `identifier` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `device` varchar(255) DEFAULT NULL,
  `created_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`id`, `identifier`, `user_id`, `device`, `created_at`) VALUES
(31, '03ca96a592b63883c956088b50a5f247', 3, '127.0.0.1_Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0', 1726060623),
(32, 'ec7e65ecd9f2116f41eedef7862fbbd8', 6, '127.0.0.1_Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0', 1726060833),
(33, 'd065834e4c1a62cd82acb1c6b8e9010a', 5, '127.0.0.1_Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0', 1726060925),
(34, '46296062a5b1ab00c3ade6848899a125', 4, '127.0.0.1_Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0', 1726061032),
(36, '0c8b1558ca377dd6ffd679c11748b990', 7, '127.0.0.1_Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0', 1726064595),
(37, '69dfa7fb43dd4e50e55c5fbf27f0a32e', 2, '127.0.0.1_Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0', 1726159726),
(38, '69b98f2a5ef12403d946df1bad13df7a', 2, '::1_Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36', 1726209445),
(39, '0c9ec80aa9ce0367c342a870d75a0e89', 7, '::1_Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', 1726210523);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gold` int NOT NULL,
  `silver` int NOT NULL,
  `tokens` int NOT NULL,
  `red_tokens` int NOT NULL,
  `counters` int NOT NULL,
  `premium_akk` int NOT NULL,
  `drawings` int NOT NULL,
  `regular_cases` int NOT NULL,
  `special_cases` int NOT NULL,
  `rare_cases` int NOT NULL,
  `mythical_cases` int NOT NULL,
  `legendary_cases` int NOT NULL,
  `tokens_timer` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `gold`, `silver`, `tokens`, `red_tokens`, `counters`, `premium_akk`, `drawings`, `regular_cases`, `special_cases`, `rare_cases`, `mythical_cases`, `legendary_cases`, `tokens_timer`) VALUES
(2, '--Bogach', '$2y$10$TDM4ItQD9kiMYICbyK5XceAAsBX2cE7zygdc6z4E8AOfan8pszKlC', 470700, 233500, 7, 1151, 12, 45, 394, 29, 26, 15, 0, 20, 1726213052),
(3, 'Залізний Панцир', '$2y$10$AqtdnlDsmPiTOeatpYe/VOyPgzeCQgUdtzNDYbOcJAGe7TeMKZfx2', 3000, 26500, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, NULL),
(4, 'Тимофейчик', '$2y$10$fqZ02AHrHhASSa32SekpKuaXTR4hUQp/cz3JwSW9LVMJcjwBBrJey', 0, 2500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL),
(5, 'Killua', '$2y$10$9RcfARbasxfCPBFxnr3voew1uxvaKkf6cmx8.xLk0g/XF5PQKqGZ.', 8500, 4000, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, NULL),
(6, 'Davidk104', '$2y$10$ZrDIgq5LrRt9ilVOcRC5Se6xprv415k.2I6u53Jw36Kk3k1Y4bu9i', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL),
(7, 'Відкривачкін', '$2y$10$tn2831PC9wnJ8jjVMELN6eKxwHwdg6EXq4Q4C0k1t1NHpXRvqO4sy', 17700, 1500, 1, 7, 8, 9, 56, 32, 25, 10, 0, 0, 1726236234),
(8, 'MrStinger__', '$2y$10$kYk/RVabewLat0.kF0Xg6OC8CJ/G6KYJKA4tyH0KueCWxXYPk3ILK', 38500, 23000, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_codes`
--

CREATE TABLE `user_codes` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `code_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_codes`
--

INSERT INTO `user_codes` (`id`, `user_id`, `code_id`) VALUES
(1, 2, 1),
(3, 2, 3),
(4, 7, 1),
(5, 7, 4),
(6, 7, 5),
(7, 2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `user_guarantors`
--

CREATE TABLE `user_guarantors` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `case_id` int DEFAULT NULL,
  `discoveries_number` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_guarantors`
--

INSERT INTO `user_guarantors` (`id`, `user_id`, `case_id`, `discoveries_number`) VALUES
(65, 2, 10, 8),
(73, 7, 7, 10),
(74, 7, 7, 10),
(75, 7, 10, 12);

-- --------------------------------------------------------

--
-- Table structure for table `user_tanks`
--

CREATE TABLE `user_tanks` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `tank_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_tanks`
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
(130, 2, 60),
(131, 2, 59),
(142, 2, 2),
(154, 2, 62),
(178, 2, 42),
(179, 2, 77),
(192, 7, 62),
(193, 7, 63),
(194, 7, 61),
(197, 7, 59),
(198, 7, 2),
(199, 7, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `codes`
--
ALTER TABLE `codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exchange_gold`
--
ALTER TABLE `exchange_gold`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exchange_red_tokens`
--
ALTER TABLE `exchange_red_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guarantors`
--
ALTER TABLE `guarantors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_case` (`case_id`),
  ADD KEY `fk_tank` (`tank_id`);

--
-- Indexes for table `tanks`
--
ALTER TABLE `tanks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_codes`
--
ALTER TABLE `user_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `code_id` (`code_id`);

--
-- Indexes for table `user_guarantors`
--
ALTER TABLE `user_guarantors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_guarantors_user` (`user_id`),
  ADD KEY `fk_user_guarantors_case` (`case_id`);

--
-- Indexes for table `user_tanks`
--
ALTER TABLE `user_tanks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `tank_id` (`tank_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cases`
--
ALTER TABLE `cases`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `codes`
--
ALTER TABLE `codes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `exchange_gold`
--
ALTER TABLE `exchange_gold`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `exchange_red_tokens`
--
ALTER TABLE `exchange_red_tokens`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `guarantors`
--
ALTER TABLE `guarantors`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tanks`
--
ALTER TABLE `tanks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_codes`
--
ALTER TABLE `user_codes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_guarantors`
--
ALTER TABLE `user_guarantors`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `user_tanks`
--
ALTER TABLE `user_tanks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=200;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `guarantors`
--
ALTER TABLE `guarantors`
  ADD CONSTRAINT `fk_case` FOREIGN KEY (`case_id`) REFERENCES `cases` (`id`),
  ADD CONSTRAINT `fk_tank` FOREIGN KEY (`tank_id`) REFERENCES `tanks` (`id`);

--
-- Constraints for table `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_codes`
--
ALTER TABLE `user_codes`
  ADD CONSTRAINT `user_codes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_codes_ibfk_2` FOREIGN KEY (`code_id`) REFERENCES `codes` (`id`);

--
-- Constraints for table `user_guarantors`
--
ALTER TABLE `user_guarantors`
  ADD CONSTRAINT `fk_user_guarantors_case` FOREIGN KEY (`case_id`) REFERENCES `cases` (`id`),
  ADD CONSTRAINT `fk_user_guarantors_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_tanks`
--
ALTER TABLE `user_tanks`
  ADD CONSTRAINT `user_tanks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_tanks_ibfk_2` FOREIGN KEY (`tank_id`) REFERENCES `tanks` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
