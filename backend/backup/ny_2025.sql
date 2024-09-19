-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3307
-- Час створення: Вер 16 2024 р., 17:36
-- Версія сервера: 5.7.39
-- Версія PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База даних: `NY_2025`
--

-- --------------------------------------------------------

--
-- Структура таблиці `cases`
--

CREATE TABLE `cases` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gold` int(11) DEFAULT NULL,
  `tokens` int(11) DEFAULT NULL,
  `red_tokens` int(11) DEFAULT NULL,
  `drawings` int(11) DEFAULT NULL,
  `unique_currency` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unique_price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `cases`
--

INSERT INTO `cases` (`id`, `name`, `gold`, `tokens`, `red_tokens`, `drawings`, `unique_currency`, `unique_price`) VALUES
(1, 'main_cases', 250, 1, NULL, NULL, NULL, NULL),
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
(12, 'new_years_camo2', NULL, NULL, NULL, 6, NULL, NULL),
(13, 'china_new_year_cases', 200, 1, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблиці `codes`
--

CREATE TABLE `codes` (
  `id` int(11) NOT NULL,
  `code_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `get_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `get_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `get_value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `codes`
--

INSERT INTO `codes` (`id`, `code_name`, `get_type`, `get_name`, `get_value`) VALUES
(1, '5oo', 'resource', 'gold', '500'),
(3, 'tankk', 'tank', '2', '1'),
(4, 'na_vse_dobre)', 'resource', 'gold', '1000'),
(5, 'z_novim_rokom', 'tank', '77', '1');

-- --------------------------------------------------------

--
-- Структура таблиці `exchange_gold`
--

CREATE TABLE `exchange_gold` (
  `id` int(11) NOT NULL,
  `exchange_resource` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `exchange_value` int(11) NOT NULL,
  `get_value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `exchange_gold`
--

INSERT INTO `exchange_gold` (`id`, `exchange_resource`, `exchange_value`, `get_value`) VALUES
(1, 'silver', 3500, 100),
(2, 'counters', 10, 200),
(3, 'premium_akk', 5, 500),
(4, 'drawings', 1, 400),
(5, 'tokens', 1, 100),
(6, 'red_tokens', 1, 200);

-- --------------------------------------------------------

--
-- Структура таблиці `exchange_red_tokens`
--

CREATE TABLE `exchange_red_tokens` (
  `id` int(11) NOT NULL,
  `exchange_resource` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `exchange_value` int(11) NOT NULL,
  `get_value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `exchange_red_tokens`
--

INSERT INTO `exchange_red_tokens` (`id`, `exchange_resource`, `exchange_value`, `get_value`) VALUES
(1, 'tokens', 2, 1),
(2, 'gold', 400, 1);

-- --------------------------------------------------------

--
-- Структура таблиці `guarantors`
--

CREATE TABLE `guarantors` (
  `id` int(11) NOT NULL,
  `case_id` int(11) DEFAULT NULL,
  `discoveries_number` int(11) DEFAULT NULL,
  `guarantor_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tank_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `guarantors`
--

INSERT INTO `guarantors` (`id`, `case_id`, `discoveries_number`, `guarantor_type`, `tank_id`, `amount`) VALUES
(3, 7, 50, 'tank', 59, 1),
(4, 10, 50, 'tank', 63, 1),
(5, 13, 50, 'tank', 88, 1);

-- --------------------------------------------------------

--
-- Структура таблиці `tanks`
--

CREATE TABLE `tanks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transcription` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `land` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `conversion_value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(77, 'E 25', 'e_25', 'td', 'ge', 2000),
(78, 'ТІТТ Розанова', 'titt_rozanova', 'lt', 'ussr', 6800),
(79, 'Hori Type 3', 'hori_type_3', 'td', 'jp', 7200),
(80, 'Type 59 Gold', 'type_59_gold', 'lt', 'ch', 6800),
(81, 'WZ 113', 'wz_113', 'ht', 'ch', 7200),
(82, 'WZ Пилаючий', 'wz_pilauchii', 'td', 'ch', 5600),
(83, 'Type KV-2', 'type_kv-2', 'lt', 'ch', 6800),
(84, 'Type 5 Heavy Золотий Дракон', 'type_5_heavy_golder_dragon', 'camo', 'jp', 1500),
(85, 'Hori Type 3 Самурай', 'hori_type_3_samurai', 'camo', 'jp', 1500),
(86, 'Дракон', 'wz_111_dragon', 'camo', 'ch', 1500),
(87, 'Мідний Воїн', 'wz_113_copper_warrior', 'camo', 'ch', 1500),
(88, 'BZ-176', 'bz_176', 'ht', 'ch', 7200),
(89, '114 SP2', '114_sp2', 'td', 'ch', 7200);

-- --------------------------------------------------------

--
-- Структура таблиці `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `identifier` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `device` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `tokens`
--

INSERT INTO `tokens` (`id`, `identifier`, `user_id`, `device`, `created_at`) VALUES
(31, '03ca96a592b63883c956088b50a5f247', 3, '127.0.0.1_Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0', 1726060623),
(32, 'ec7e65ecd9f2116f41eedef7862fbbd8', 6, '127.0.0.1_Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0', 1726060833),
(33, 'd065834e4c1a62cd82acb1c6b8e9010a', 5, '127.0.0.1_Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0', 1726060925),
(34, '46296062a5b1ab00c3ade6848899a125', 4, '127.0.0.1_Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0', 1726061032),
(36, '0c8b1558ca377dd6ffd679c11748b990', 7, '127.0.0.1_Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0', 1726064595),
(37, '69dfa7fb43dd4e50e55c5fbf27f0a32e', 2, '127.0.0.1_Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0', 1726159726),
(38, '69b98f2a5ef12403d946df1bad13df7a', 2, '::1_Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36', 1726209445),
(40, '2698424bf86fd1039f05bdd91c424a1d', 8, '::1_Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', 1726236363),
(42, '228f98bdbf0f2dce73f785caed915ff2', 3, '::1_Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', 1726471081),
(43, '9af667f1ee238c109a69c5e5622ab62f', 2, '::1_Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', 1726471381),
(44, '2535448e75db09d15aa4a063f34178ca', 7, '::1_Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', 1726475117);

-- --------------------------------------------------------

--
-- Структура таблиці `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gold` int(10) UNSIGNED NOT NULL,
  `silver` int(10) UNSIGNED NOT NULL,
  `tokens` int(10) UNSIGNED NOT NULL,
  `red_tokens` int(10) UNSIGNED NOT NULL,
  `counters` int(10) UNSIGNED NOT NULL,
  `premium_akk` int(10) UNSIGNED NOT NULL,
  `drawings` int(10) UNSIGNED NOT NULL,
  `regular_cases` int(10) UNSIGNED NOT NULL,
  `special_cases` int(10) UNSIGNED NOT NULL,
  `rare_cases` int(10) UNSIGNED NOT NULL,
  `mythical_cases` int(10) UNSIGNED NOT NULL,
  `legendary_cases` int(10) UNSIGNED NOT NULL,
  `tokens_timer` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `gold`, `silver`, `tokens`, `red_tokens`, `counters`, `premium_akk`, `drawings`, `regular_cases`, `special_cases`, `rare_cases`, `mythical_cases`, `legendary_cases`, `tokens_timer`) VALUES
(2, '--Bogach', '$2y$10$TDM4ItQD9kiMYICbyK5XceAAsBX2cE7zygdc6z4E8AOfan8pszKlC', 548800, 376500, 6, 1035, 12, 63, 406, 30, 26, 15, 0, 10, 1726498696),
(3, 'Залізний Панцир', '$2y$10$AqtdnlDsmPiTOeatpYe/VOyPgzeCQgUdtzNDYbOcJAGe7TeMKZfx2', 3000, 26500, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, NULL),
(4, 'Тимофейчик', '$2y$10$fqZ02AHrHhASSa32SekpKuaXTR4hUQp/cz3JwSW9LVMJcjwBBrJey', 0, 2500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL),
(5, 'Killua', '$2y$10$9RcfARbasxfCPBFxnr3voew1uxvaKkf6cmx8.xLk0g/XF5PQKqGZ.', 8500, 4000, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, NULL),
(6, 'Davidk104', '$2y$10$ZrDIgq5LrRt9ilVOcRC5Se6xprv415k.2I6u53Jw36Kk3k1Y4bu9i', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL),
(7, 'Відкривачкін', '$2y$10$tn2831PC9wnJ8jjVMELN6eKxwHwdg6EXq4Q4C0k1t1NHpXRvqO4sy', 108450, 1220500, 1, 173, 7, 199, 17, 23, 17, 5, 22, 0, 1726495293),
(8, 'MrStinger__', '$2y$10$kYk/RVabewLat0.kF0Xg6OC8CJ/G6KYJKA4tyH0KueCWxXYPk3ILK', 38500, 23000, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Структура таблиці `user_codes`
--

CREATE TABLE `user_codes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `code_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `user_codes`
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
-- Структура таблиці `user_guarantors`
--

CREATE TABLE `user_guarantors` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `case_id` int(11) DEFAULT NULL,
  `discoveries_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `user_guarantors`
--

INSERT INTO `user_guarantors` (`id`, `user_id`, `case_id`, `discoveries_number`) VALUES
(90, 7, 7, 1),
(101, 2, 13, 3);

-- --------------------------------------------------------

--
-- Структура таблиці `user_tanks`
--

CREATE TABLE `user_tanks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `tank_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(130, 2, 60),
(131, 2, 59),
(142, 2, 2),
(154, 2, 62),
(178, 2, 42),
(179, 2, 77),
(206, 2, 63),
(207, 2, 61),
(216, 7, 61),
(217, 7, 2),
(218, 7, 62),
(219, 7, 3),
(220, 7, 60),
(224, 7, 59),
(227, 7, 73),
(228, 7, 74),
(229, 7, 9),
(230, 7, 75),
(231, 7, 63),
(232, 7, 76),
(233, 7, 72),
(234, 7, 64),
(235, 7, 78),
(236, 7, 70),
(237, 7, 71),
(238, 7, 10),
(239, 7, 69),
(240, 7, 15),
(241, 7, 35),
(248, 2, 83),
(249, 2, 82),
(250, 2, 81),
(251, 2, 80),
(252, 2, 79),
(253, 2, 84),
(254, 2, 85),
(255, 2, 86),
(256, 2, 87);

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
-- Індекси таблиці `exchange_gold`
--
ALTER TABLE `exchange_gold`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `exchange_red_tokens`
--
ALTER TABLE `exchange_red_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `guarantors`
--
ALTER TABLE `guarantors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_case` (`case_id`),
  ADD KEY `fk_tank` (`tank_id`);

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
-- Індекси таблиці `user_guarantors`
--
ALTER TABLE `user_guarantors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_guarantors_user` (`user_id`),
  ADD KEY `fk_user_guarantors_case` (`case_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблиці `codes`
--
ALTER TABLE `codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблиці `exchange_gold`
--
ALTER TABLE `exchange_gold`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблиці `exchange_red_tokens`
--
ALTER TABLE `exchange_red_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблиці `guarantors`
--
ALTER TABLE `guarantors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблиці `tanks`
--
ALTER TABLE `tanks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT для таблиці `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT для таблиці `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблиці `user_codes`
--
ALTER TABLE `user_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблиці `user_guarantors`
--
ALTER TABLE `user_guarantors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT для таблиці `user_tanks`
--
ALTER TABLE `user_tanks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=257;

--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `guarantors`
--
ALTER TABLE `guarantors`
  ADD CONSTRAINT `fk_case` FOREIGN KEY (`case_id`) REFERENCES `cases` (`id`),
  ADD CONSTRAINT `fk_tank` FOREIGN KEY (`tank_id`) REFERENCES `tanks` (`id`);

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
-- Обмеження зовнішнього ключа таблиці `user_guarantors`
--
ALTER TABLE `user_guarantors`
  ADD CONSTRAINT `fk_user_guarantors_case` FOREIGN KEY (`case_id`) REFERENCES `cases` (`id`),
  ADD CONSTRAINT `fk_user_guarantors_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

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
