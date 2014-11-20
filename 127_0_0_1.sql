-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2014 at 08:52 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cd_login`
--

-- --------------------------------------------------------

--
-- Table structure for table `businesses`
--

CREATE TABLE IF NOT EXISTS `businesses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `ip_addresses` tinytext,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `businesses`
--

INSERT INTO `businesses` (`id`, `name`, `ip_addresses`, `created_at`, `updated_at`) VALUES
(1, 'Coding Dojo', NULL, '2014-11-18 16:33:35', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE IF NOT EXISTS `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Location_Business1_idx` (`business_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `business_id`, `name`, `created_at`, `updated_at`) VALUES
(1, 1, 'Mountain View', '2014-11-18 16:33:45', NULL),
(2, 1, 'Seattle', '2014-11-18 17:16:18', NULL),
(3, 1, 'Denver', '2014-11-18 17:16:20', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE IF NOT EXISTS `members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `status` enum('active','inactive') NOT NULL,
  `note` text,
  `picture` varchar(255) DEFAULT NULL,
  `team` text,
  `supervisor_id` int(11) DEFAULT NULL,
  `type` enum('employee','contractor') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_employee_Business_idx` (`business_id`),
  KEY `fk_Contractor_Location1_idx` (`location_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `business_id`, `location_id`, `name`, `title`, `email`, `password`, `start_date`, `status`, `note`, `picture`, `team`, `supervisor_id`, `type`, `created_at`, `updated_at`, `updated_by`) VALUES
(1, 1, 1, 'Michael Choi', 'Founder', 'mchoi@gmail.com', 'password', '2014-11-18 16:37:43', 'active', NULL, NULL, 'Management', NULL, 'contractor', '2014-11-18 16:37:43', NULL, NULL),
(2, 1, 1, 'Anthony Fenech', 'Intern', 'afenech@gmail.com', 'password', '2014-11-18 16:41:35', 'active', NULL, NULL, 'development', 1, 'employee', '2014-11-18 16:41:35', NULL, NULL),
(3, 1, 1, 'Alvaro Canencia', 'Intern', 'acanencia@gmail.com', 'password', '2014-11-18 17:17:40', 'active', NULL, NULL, 'development', 1, 'employee', '2014-11-18 17:17:40', NULL, NULL),
(4, 1, 1, 'Julian Nguyen', 'Intern', 'acanencia@gmail.com', 'password', '2014-11-18 17:18:01', 'active', NULL, NULL, 'development', 1, 'employee', '2014-11-18 17:18:01', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL,
  `clock_in` datetime NOT NULL,
  `clock_out` datetime DEFAULT NULL,
  `personal_time` float DEFAULT NULL,
  `report` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Clocking_Contractor1_idx` (`member_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `member_id`, `clock_in`, `clock_out`, `personal_time`, `report`, `created_at`, `updated_at`, `updated_by`) VALUES
(1, 2, '2014-11-18 18:41:52', '2014-11-18 18:43:24', 1.5, 'Coffee break', '2014-11-18 18:41:52', '2014-11-18 18:43:24', 2);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `locations`
--
ALTER TABLE `locations`
  ADD CONSTRAINT `fk_Location_Business1` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `members`
--
ALTER TABLE `members`
  ADD CONSTRAINT `fk_Contractor_Location1` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_employee_Business` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `fk_Clocking_Contractor1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
