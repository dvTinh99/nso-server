-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: May 06, 2024 at 02:59 AM
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
(1, '50193', NULL, NULL, NULL, 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `game_histories`
--
ALTER TABLE `game_histories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `game_histories`
--
ALTER TABLE `game_histories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
