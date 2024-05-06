-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: May 06, 2024 at 03:41 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nso`
--

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `spin_code` int DEFAULT NULL,
  `xu` mediumint UNSIGNED DEFAULT NULL,
  `bet` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `user_id`, `spin_code`, `xu`, `bet`) VALUES
(1, NULL, NULL, 12000, 'C'),
(2, NULL, NULL, 12000, 'C'),
(3, 1, NULL, 12000, 'C'),
(4, 1, 123123, 12000, 'C');

-- --------------------------------------------------------

--
-- Table structure for table `game_histories`
--

CREATE TABLE `game_histories` (
  `id` int NOT NULL,
  `spin_code` varchar(20) DEFAULT NULL,
  `rate` varchar(10) DEFAULT NULL,
  `number_people` int DEFAULT NULL,
  `result` int DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `xu` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `game_histories`
--

INSERT INTO `game_histories` (`id`, `spin_code`, `rate`, `number_people`, `result`, `status`, `xu`) VALUES
(1, '50193', '6.0359%', 33008, 4, 1, 94480),
(2, '501934', '6.0359%', 33008, 4, 1, 94480),
(3, '50195', NULL, NULL, NULL, 0, 94480);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `secret_code` int UNSIGNED DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `nickname`, `secret_code`, `email`, `password`) VALUES
(1, NULL, NULL, NULL, 'tinh31@gmail.com', '$2b$10$e0ylxUhp7kEKqtVwK2nTYemUwrbUdo4uU7kH0u3/9LrctPupgg2bm');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game_histories`
--
ALTER TABLE `game_histories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `game_histories`
--
ALTER TABLE `game_histories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
