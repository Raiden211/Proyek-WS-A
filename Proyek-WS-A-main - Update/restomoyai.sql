-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 15, 2024 at 03:00 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restomoyai`
--
DROP DATABASE IF EXISTS restomoyai;
CREATE DATABASE IF NOT EXISTS `restomoyai` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `restomoyai`;

-- --------------------------------------------------------

--
-- Table structure for table `api_log`
--

CREATE TABLE `api_log` (
  `id` int(11) NOT NULL,
  `id_type` int(11) NOT NULL,
  `api_quota` int(11) NOT NULL,
  `api_per_use` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_log`
--

INSERT INTO `api_log` (`id`, `id_type`, `api_quota`, `api_per_use`) VALUES
(1, 1, 240, 6),
(2, 2, 1000, 5),
(3, 3, 4000, 4);

-- --------------------------------------------------------

--
-- Table structure for table `api_use`
--

CREATE TABLE `api_use` (
  `id_user` varchar(20) NOT NULL,
  `api_use` int(11) NOT NULL,
  `used_at` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `price` decimal(18,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `vitamin_c` decimal(18,4) NOT NULL,
  `sugar_amount` decimal(18,2) NOT NULL,
  `calories` decimal(18,2) NOT NULL,
  `alcohol` decimal(18,2) NOT NULL,
  `caffeine` decimal(18,2) NOT NULL,
  `protein` decimal(18,2) NOT NULL,
  `calsium` decimal(18,2) NOT NULL,
  `vitamin_d` decimal(18,4) NOT NULL,
  `vitamin_e` decimal(18,4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipe`
--

INSERT INTO `recipe` (`id`, `name`, `amount`, `price`, `image`, `vitamin_c`, `sugar_amount`, `calories`, `alcohol`, `caffeine`, `protein`, `calsium`, `vitamin_d`, `vitamin_e`) VALUES
(4, 'pear nectar', 1, '0.00', 'pear-juice.jpg', '0.0100', '0.15', '0.60', '0.00', '0.00', '0.00', '0.05', '0.0000', '0.0000'),
(5, 'pineapples', 1, '2.99', 'pineapple.jpg', '432.5900', '89.14', '452.50', '0.00', '0.00', '4.89', '117.65', '0.0000', '0.1800');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dob` varchar(20) NOT NULL,
  `profile_pic` varchar(255) NOT NULL,
  `saldo` int(11) NOT NULL,
  `api_key` varchar(15) NOT NULL,
  `api_hit` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `phone_number`, `password`, `dob`, `profile_pic`, `saldo`, `api_key`, `api_hit`, `role`, `status`, `type_id`) VALUES
('U0001', 'Budi0', 'budi@gmail.com', 2147483647, 'budi123', '22/12/2001', 'budi.jpeg', 0, 'p4r3tlrarq', 180, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `nama` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `nama`) VALUES
(1, 'administrator restoran'),
(2, 'user'),
(3, 'supplier'),
(4, 'pengurus makanan');

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`id`, `type`) VALUES
(1, 'Free'),
(2, 'Member'),
(3, 'Professional');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `vegetarian` BOOLEAN NOT NULL,
  `vegan` BOOLEAN NOT NULL,
  `glutenFree` BOOLEAN NOT NULL,
  `dairyFree` BOOLEAN NOT NULL,
  `veryHealthy` BOOLEAN NOT NULL,
  `cheap` BOOLEAN NOT NULL,
  `veryPopular` BOOLEAN NOT NULL,
  `sustainable` BOOLEAN NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `servings` INT(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_log`
--
ALTER TABLE `api_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
