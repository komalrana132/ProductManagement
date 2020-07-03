-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 18, 2020 at 06:41 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ClassJockeyApp`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_config`
--

CREATE TABLE `admin_config` (
  `id` int(11) NOT NULL,
  `configKey` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `configValue` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `valueUnit` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `scope` enum('All','Web','iOS','Android') CHARACTER SET utf8 NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(1) NOT NULL DEFAULT 0,
  `isTestdata` enum('0','1') CHARACTER SET utf8 NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_config`
--

INSERT INTO `admin_config` (`id`, `configKey`, `configValue`, `valueUnit`, `scope`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 'globalPassword', 'ClassjockeyGlobalPassword', 'text', 'All', '2020-05-29 12:45:47', '2020-05-29 12:45:47', 0, '1'),
(2, 'userAgent', 'iOS,Android,Mozilla/5.0,PostmanRuntime/2.5.0,PostmanRuntime/7.25.0', 'comma-separated', 'All', '2020-05-29 12:45:47', '2020-05-29 12:45:47', 0, '1'),
(3, 'tempToken', 'allowAccessToApp', 'text', 'All', '2020-05-29 12:45:47', '2020-05-29 12:45:47', 0, '1'),
(4, 'expiry_duration', '3600', 'second', 'All', '2020-05-29 12:45:47', '2020-05-29 12:45:47', 0, '1'),
(5, 'autologout', '1', 'boolean', 'All', '2020-05-29 12:45:47', '2020-05-29 12:45:47', 0, '1');

-- --------------------------------------------------------

--
-- Table structure for table `allergy`
--

CREATE TABLE `allergy` (
  `id` int(11) NOT NULL,
  `title` varchar(25) NOT NULL,
  `description` varchar(256) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL,
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `allergy`
--

INSERT INTO `allergy` (`id`, `title`, `description`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 'Allergic Ashthma', 'triggered by exposure Requires a medical diagnosis', '2020-06-05 13:10:03', '0000-00-00 00:00:00', 0, 1),
(2, 'Anaphylaxis', 'potentially life-threatning allergic reaction Treatable by a medical professional', '2020-06-05 13:11:36', '0000-00-00 00:00:00', 0, 1),
(3, 'Food allergies', 'potentially life-threatning allergic reaction Treatable by a medical professional', '2020-06-05 13:12:10', '0000-00-00 00:00:00', 0, 1),
(4, 'Latex allergy', 'potentially life-threatning allergic reaction Treatable by a medical professional', '2020-06-05 13:12:26', '0000-00-00 00:00:00', 0, 1),
(5, 'Drug allergy', 'potentially life-threatning allergic reaction Treatable by a medical professional', '2020-06-05 13:12:41', '0000-00-00 00:00:00', 0, 1),
(6, 'Contact dermatitis', 'potentially life-threatning allergic reaction Treatable by a medical professional', '2020-06-05 13:13:09', '0000-00-00 00:00:00', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `apptokens`
--

CREATE TABLE `apptokens` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `tokenType` enum('access_token') CHARACTER SET utf8 NOT NULL DEFAULT 'access_token',
  `status` enum('active','expired') CHARACTER SET utf8 NOT NULL DEFAULT 'active',
  `expiry` datetime DEFAULT NULL,
  `access_count` int(11) DEFAULT NULL,
  `deviceToken` varchar(255) CHARACTER SET utf8 NOT NULL,
  `deviceType` tinyint(4) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `apptokens`
--

INSERT INTO `apptokens` (`id`, `userId`, `token`, `tokenType`, `status`, `expiry`, `access_count`, `deviceToken`, `deviceType`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 1, 'DXcSlfgw', 'access_token', 'active', '2004-06-20 10:43:11', NULL, '', 0, '2020-06-04 09:43:11', '2020-06-04 15:13:11', 0, 1),
(2, 2, 'HnNIUnZ2', 'access_token', 'active', '2004-06-20 10:31:30', NULL, '', 3, '2020-06-04 09:31:30', '2020-06-04 15:01:30', 0, 1),
(3, 3, '5MvYAjpm', 'access_token', 'active', '2004-06-20 10:31:55', NULL, '', 3, '2020-06-04 09:31:55', '2020-06-04 15:01:55', 0, 1),
(4, 6, '8pfw0DeX', 'access_token', 'active', '2016-06-20 07:52:55', NULL, '', 0, '2020-06-16 06:52:55', '2020-06-16 12:22:55', 0, 1),
(5, 7, 'HJfg4tQf', 'access_token', 'active', '2004-06-20 18:16:12', NULL, '', 3, '2020-06-04 17:16:12', '2020-06-04 22:46:12', 0, 1),
(6, 8, 'WhmtdyUA', 'access_token', 'active', '2004-06-20 18:18:29', NULL, '', 3, '2020-06-04 17:18:29', '2020-06-04 22:48:29', 0, 1),
(7, 9, 'tNoKbiw2', 'access_token', 'active', '2005-06-20 07:56:10', NULL, '', 3, '2020-06-05 06:56:10', '2020-06-05 12:26:10', 0, 1),
(8, 10, 'aSx4KTpo', 'access_token', 'active', '2011-06-20 07:41:02', NULL, '', 3, '2020-06-11 06:41:02', '2020-06-11 12:11:02', 0, 1),
(9, 11, 'zgo8vRA7', 'access_token', 'active', '2011-06-20 07:41:24', NULL, '', 3, '2020-06-11 06:41:24', '2020-06-11 12:11:24', 0, 1),
(10, 12, 'eklkYDGr', 'access_token', 'active', '2011-06-20 07:41:32', NULL, '', 3, '2020-06-11 06:41:32', '2020-06-11 12:11:32', 0, 1),
(11, 13, 'qhhTn3K6', 'access_token', 'active', '2011-06-20 07:41:41', NULL, '', 3, '2020-06-11 06:41:41', '2020-06-11 12:11:41', 0, 1),
(12, 14, 'IffGiNx3', 'access_token', 'active', '2015-06-20 06:58:13', NULL, '', 3, '2020-06-15 05:58:13', '2020-06-15 11:28:13', 0, 1),
(13, 15, 'etdQD7xp', 'access_token', 'active', '2015-06-20 13:18:29', NULL, '', 3, '2020-06-15 12:18:29', '2020-06-15 17:48:29', 0, 1),
(14, 16, 'La408aEU', 'access_token', 'active', '2017-06-20 10:15:54', NULL, '', 3, '2020-06-17 09:15:54', '2020-06-17 14:45:54', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `attendance_status` set('1','0','3') NOT NULL,
  `date` datetime NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `class_id`, `teacher_id`, `student_id`, `attendance_status`, `date`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 1, 6, 7, '0', '2020-12-02 00:00:00', '2020-06-11 06:38:06', '2020-06-16 10:10:57', 0, 1),
(2, 4, 6, 10, '0', '2020-12-02 00:00:00', '2020-06-11 10:10:38', '2020-06-16 12:37:54', 0, 1),
(3, 4, 6, 11, '1', '2020-12-02 00:00:00', '2020-06-11 10:10:44', '2020-06-11 15:40:44', 0, 1),
(4, 4, 6, 12, '0', '2020-12-02 00:00:00', '2020-06-11 10:10:55', '2020-06-11 15:40:55', 0, 1),
(5, 1, 6, 2, '1', '2020-12-03 00:00:00', '2020-06-11 10:45:49', '2020-06-17 12:17:58', 0, 1),
(6, 2, 8, 10, '1', '2020-12-03 00:00:00', '2020-06-11 10:52:32', '2020-06-17 14:47:08', 0, 1),
(7, 2, 8, 10, '1', '2020-12-02 00:00:00', '2020-06-11 10:53:57', '2020-06-11 16:23:57', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `bus_attendance`
--

CREATE TABLE `bus_attendance` (
  `id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `attandance_status` set('1','0','3') NOT NULL DEFAULT '3',
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bus_attendance`
--

INSERT INTO `bus_attendance` (`id`, `driver_id`, `student_id`, `date`, `attandance_status`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 15, 10, '2020-06-15 00:00:00', '1', '2020-06-15 12:18:39', '2020-06-15 17:48:39', 0, 1),
(2, 15, 2, '2020-06-15 00:00:00', '1', '2020-06-15 12:34:13', '2020-06-15 18:04:13', 0, 1),
(3, 15, 10, '2020-06-17 00:00:00', '3', '2020-06-17 12:11:36', '2020-06-17 12:13:27', 0, 1),
(5, 15, 2, '2020-06-17 00:00:00', '1', '2020-06-17 06:47:34', '2020-06-17 12:17:34', 0, 1),
(6, 16, 10, '2020-06-17 00:00:00', '1', '2020-06-17 09:16:38', '2020-06-17 14:46:38', 0, 1),
(7, 15, 11, '2020-06-17 00:00:00', '1', '2020-06-17 09:23:38', '2020-06-17 14:53:38', 0, 1),
(8, 15, 13, '2020-06-17 00:00:00', '1', '2020-06-17 09:24:34', '2020-06-17 14:54:34', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `challenges`
--

CREATE TABLE `challenges` (
  `id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(2556) NOT NULL,
  `subject_info` varchar(255) NOT NULL,
  `other_info` varchar(2556) NOT NULL,
  `completion_date` datetime NOT NULL,
  `notes` varchar(2556) NOT NULL,
  `points_of_completion` int(11) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `challenges`
--

INSERT INTO `challenges` (`id`, `created_by`, `title`, `description`, `subject_info`, `other_info`, `completion_date`, `notes`, `points_of_completion`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 1, 'parents challenge', 'demo challenge register', 'all subjects', 'sdssssdsdsds', '2020-12-06 06:45:00', 'fcsdfdxfdxfdxfdx', 500, '2020-06-12 12:01:18', '2020-06-12 18:45:49', 0, 1),
(2, 6, 'quiz challenge', 'demo challenge register', 'all subjects', 'sdssssdsdsds', '2020-12-07 12:45:00', 'fcsdfdxfdxfdxfdx', 1500, '2020-06-12 12:03:46', '2020-06-12 18:41:01', 0, 1),
(3, 6, 'quiz challenge', 'demo challenge register', 'all subjects', 'sdssssdsdsds', '2020-12-07 12:45:00', 'fcsdfdxfdxfdxfdx', 1500, '2020-06-12 13:08:13', '2020-06-13 10:09:20', 0, 1),
(4, 8, 'math challenge', 'demo challenge register', 'all subjects', 'sdssssdsdsds', '2020-09-08 16:00:00', '', 1500, '2020-06-12 13:41:34', '2020-06-12 19:27:24', 0, 1),
(5, 14, 'drawing-competion', 'demo challenge register', 'all subjects', 'sdssssdsdsds', '2020-09-08 16:00:00', '', 1500, '2020-06-16 07:00:47', '2020-06-16 12:30:47', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `challenge_accept_detail`
--

CREATE TABLE `challenge_accept_detail` (
  `id` int(11) NOT NULL,
  `challenge_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestData` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `challenge_accept_detail`
--

INSERT INTO `challenge_accept_detail` (`id`, `challenge_id`, `student_id`, `createdDate`, `modifiedDate`, `isDelete`, `isTestData`) VALUES
(1, 1, 10, '2020-06-13 05:43:12', '2020-06-13 11:13:12', 0, 1),
(2, 1, 11, '2020-06-13 05:48:11', '2020-06-13 11:18:11', 0, 1),
(3, 1, 2, '2020-06-13 05:48:16', '2020-06-13 11:18:16', 0, 1),
(4, 3, 12, '2020-06-13 05:48:24', '2020-06-13 11:18:24', 0, 1),
(5, 3, 13, '2020-06-13 05:48:34', '2020-06-13 11:18:34', 0, 1),
(6, 3, 2, '2020-06-16 04:17:55', '2020-06-16 09:47:55', 0, 1),
(7, 4, 2, '2020-06-16 04:21:07', '2020-06-16 09:51:07', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `title` varchar(25) NOT NULL,
  `description` varchar(256) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `teacher_id`, `title`, `description`, `createdDate`, `modified`, `isDelete`, `isTestdata`) VALUES
(1, 6, 'first', 'this is demo class', '2020-06-04 11:45:54', '2020-06-04 17:15:54', 0, 1),
(2, 8, 'second class', 'this is demo class used for development purpose', '2020-06-04 17:19:20', '2020-06-04 22:49:20', 0, 1),
(3, 6, 'demo 2', 'this is demo class used for development purpose', '2020-06-05 05:14:24', '2020-06-05 10:44:24', 0, 1),
(4, 6, 'class Money heist', 'this is demo class used for development purpose', '2020-06-11 06:43:35', '2020-06-11 12:13:35', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `class_student_detail`
--

CREATE TABLE `class_student_detail` (
  `id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `class_student_detail`
--

INSERT INTO `class_student_detail` (`id`, `class_id`, `student_id`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 1, 2, '2020-06-04 14:48:52', '2020-06-11 12:09:36', 0, 1),
(2, 1, 7, '2020-06-04 17:30:02', '2020-06-04 23:00:02', 0, 1),
(3, 2, 2, '2020-06-04 17:32:03', '2020-06-06 10:35:07', 0, 1),
(4, 4, 10, '2020-06-11 06:44:39', '2020-06-11 12:15:58', 1, 1),
(5, 4, 11, '2020-06-11 06:44:47', '2020-06-11 12:14:47', 0, 1),
(6, 4, 12, '2020-06-11 06:44:52', '2020-06-11 12:14:52', 0, 1),
(7, 4, 13, '2020-06-11 06:44:57', '2020-06-11 12:14:57', 0, 1),
(9, 4, 10, '2020-06-11 06:55:09', '2020-06-11 12:25:09', 0, 1),
(10, 2, 10, '2020-06-11 10:31:24', '2020-06-11 16:01:24', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `comments_challenges`
--

CREATE TABLE `comments_challenges` (
  `id` int(11) NOT NULL,
  `challenge_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(2556) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments_challenges`
--

INSERT INTO `comments_challenges` (`id`, `challenge_id`, `user_id`, `title`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 1, 1, 'this is comments demo', '2020-06-15 04:28:09', '2020-06-15 09:58:09', 0, 1),
(2, 1, 2, 'comment 2', '2020-06-15 04:33:41', '2020-06-15 10:03:41', 0, 1),
(3, 1, 10, 'comment 3', '2020-06-15 04:33:54', '2020-06-15 10:03:54', 0, 1),
(4, 2, 10, 'comment for test', '2020-06-15 04:34:09', '2020-06-15 10:04:09', 0, 1),
(5, 2, 10, 'comment for test', '2020-06-15 04:34:09', '2020-06-15 10:04:09', 0, 1),
(6, 2, 10, 'comment for test', '2020-06-15 04:34:10', '2020-06-15 10:04:10', 0, 1),
(7, 2, 10, 'comment for test', '2020-06-15 04:34:11', '2020-06-15 10:04:11', 0, 1),
(8, 2, 12, 'comment for test', '2020-06-15 04:39:48', '2020-06-15 10:09:48', 0, 1),
(9, 2, 13, 'comment for test', '2020-06-15 04:40:06', '2020-06-15 10:10:06', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `comments_events`
--

CREATE TABLE `comments_events` (
  `id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(2556) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments_events`
--

INSERT INTO `comments_events` (`id`, `event_id`, `user_id`, `title`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 1, 1, 'this is comments demo on event ', '2020-06-15 04:33:08', '2020-06-15 10:03:08', 0, 1),
(2, 1, 1, 'this is comments demo on event ', '2020-06-15 04:34:27', '2020-06-15 10:04:27', 0, 1),
(3, 1, 2, 'this is comments demo on event ', '2020-06-15 04:34:33', '2020-06-15 10:04:33', 0, 1),
(4, 2, 6, 'this is comments demo on event ', '2020-06-15 04:34:54', '2020-06-15 10:04:54', 0, 1),
(5, 2, 12, 'this is comments demo on event', '2020-06-15 04:40:23', '2020-06-15 10:10:23', 0, 1),
(6, 2, 11, 'this is comments demo on event', '2020-06-15 04:40:33', '2020-06-15 10:10:33', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `driver_location`
--

CREATE TABLE `driver_location` (
  `id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `latitude` varchar(200) NOT NULL,
  `longitude` varchar(200) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `driver_location`
--

INSERT INTO `driver_location` (`id`, `driver_id`, `latitude`, `longitude`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 15, '19.0760', '72.8777', '2020-06-17 11:30:12', '2020-06-17 14:43:52', 0, 1),
(2, 16, '25.0760', '90.8777', '2020-06-17 09:39:33', '2020-06-17 15:09:33', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` varchar(2556) NOT NULL,
  `event_date` datetime NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `venue` varchar(2556) NOT NULL,
  `other_info` varchar(2556) DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `event_date`, `start_time`, `end_time`, `venue`, `other_info`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 'event one', 'demo event2 register', '2020-06-17 00:00:00', '2020-06-12 12:00:00', '2020-06-12 04:00:00', 'surat', '', '2020-06-12 11:26:12', '2020-06-12 17:07:55', 0, 1),
(2, 'tragerhunt', 'tragerhunt event register description', '2020-06-29 00:00:00', '2020-06-29 12:00:00', '2020-06-29 08:00:00', 'surat', '', '2020-06-12 11:34:18', '2020-06-12 17:04:18', 0, 1),
(3, 'Paper-presentation', 'paper presentation description', '2020-09-15 00:00:00', '2020-09-15 01:00:00', '2020-09-15 08:00:00', 'surat', '', '2020-06-15 04:56:49', '2020-06-15 10:26:49', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `event_subscribe_detail`
--

CREATE TABLE `event_subscribe_detail` (
  `id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event_subscribe_detail`
--

INSERT INTO `event_subscribe_detail` (`id`, `event_id`, `student_id`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 1, 2, '2020-06-12 07:21:15', '2020-06-12 12:51:15', 0, 1),
(3, 3, 2, '2020-06-12 07:26:03', '2020-06-12 12:56:03', 0, 1),
(4, 3, 10, '2020-06-12 07:28:05', '2020-06-12 12:58:05', 0, 1),
(5, 5, 11, '2020-06-12 10:01:02', '2020-06-12 15:31:02', 0, 1),
(6, 5, 12, '2020-06-12 10:01:09', '2020-06-12 15:31:09', 0, 1),
(7, 5, 13, '2020-06-12 10:01:19', '2020-06-12 15:31:19', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `holidays`
--

CREATE TABLE `holidays` (
  `id` int(11) NOT NULL,
  `title` varchar(25) NOT NULL,
  `date` datetime NOT NULL,
  `year` int(11) NOT NULL,
  `description` varchar(2556) DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `holidays`
--

INSERT INTO `holidays` (`id`, `title`, `date`, `year`, `description`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 'christmas', '2021-12-25 12:36:01', 2019, '', '2020-06-11 12:38:16', '2020-06-11 12:38:16', 0, 1),
(2, 'christmas', '2021-12-25 12:36:01', 2020, '', '2020-06-11 12:39:34', '2020-06-11 12:39:47', 0, 1),
(3, 'diwali', '2020-10-30 12:39:53', 2020, NULL, '2020-06-11 12:40:25', '2020-06-11 12:40:25', 0, 1),
(4, 'diwali', '2020-10-30 12:39:53', 2020, NULL, '2020-06-11 12:40:39', '2020-06-11 12:40:39', 0, 1),
(5, 'bhaiduj', '2020-10-31 12:39:53', 2020, NULL, '2020-06-11 12:41:00', '2020-06-11 12:41:00', 0, 1),
(6, 'bhaiduj', '2020-10-31 12:39:53', 2019, NULL, '2020-06-11 12:41:09', '2020-06-11 12:41:09', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `type` varchar(25) NOT NULL,
  `description` varchar(256) NOT NULL,
  `note_url` varchar(2556) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `class_id`, `title`, `type`, `description`, `note_url`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 1, 'geography note', 'document', 'snskwd xsmdbdsbdisbdnskndksndisdosdskndcksndwnoswncowncosncsncsnkcnskcnksncjsncksncskcnosjcosl\nscslclsmcksncksncksncksncks', 'http://localhost/ClassJockeyApp/uploads/notes_files/15918604536760do3F7C.pdf', '2020-06-11 07:27:33', '2020-06-11 12:57:33', 0, 1),
(2, 4, 'heist note', 'video', 'snskwd xsmdbdsbdisbdnskndksndisdosdskndcksndwnoswncowncosncsncsnkcnskcnksncjsncksncskcnosjcosl\nscslclsmcksncksncksncksncks', 'http://localhost/ClassJockeyApp/uploads/notes_video/1591866279272OfJcw3z.mov', '2020-06-11 09:04:39', '2020-06-11 14:34:39', 0, 1),
(3, 4, 'heist note', 'video', 'snskwd xsmdbdsbdisbdnskndksndisdosdskndcksndwnoswncowncosncsncsnkcnskcnksncjsncksncskcnosjcosl\nscslclsmcksncksncksncksncks', 'http://localhost/ClassJockeyApp/uploads/notes_video/1591866394583A2fdjih.mov', '2020-06-11 09:06:34', '2020-06-11 14:36:34', 0, 1),
(4, 1, 'geography note', 'video', 'snskwd xsmdbdsbdisbdnskndksndisdosdskndcksndwnoswncowncosncsncsnkcnskcnksncjsncksncskcnosjcosl\nscslclsmcksncksncksncksncks', 'http://localhost/ClassJockeyApp/uploads/notes_video/1592281729733cq90Fy0.mov', '2020-06-16 04:28:49', '2020-06-16 09:58:49', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `notice`
--

CREATE TABLE `notice` (
  `id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(2556) NOT NULL,
  `expiry` datetime NOT NULL,
  `notice_for` set('students','parents','all') NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notice`
--

INSERT INTO `notice` (`id`, `teacher_id`, `title`, `description`, `expiry`, `notice_for`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 6, 'maths class metting', 'description of demo notice for parents', '2020-10-20 02:00:00', 'students', '2020-06-11 12:52:01', '2020-06-11 12:52:01', 0, 1),
(2, 8, 'science class metting', 'description of demo notice for parents', '2020-10-20 02:00:00', 'students', '2020-06-12 16:55:40', '2020-06-12 16:55:40', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `parents_contact_detail`
--

CREATE TABLE `parents_contact_detail` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `alternative_contact` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL,
  `isTestdata` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `parents_contact_detail`
--

INSERT INTO `parents_contact_detail` (`id`, `parent_id`, `contact`, `alternative_contact`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 1, '1234', '', '2020-06-16 05:27:17', '2020-06-16 10:58:16', 0, 1),
(3, 14, '19898989898', '1234', '2020-06-16 05:55:00', '2020-06-16 11:25:00', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `student_allergy_detail`
--

CREATE TABLE `student_allergy_detail` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `allergy_id` int(11) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student_allergy_detail`
--

INSERT INTO `student_allergy_detail` (`id`, `student_id`, `updated_by`, `allergy_id`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 10, 1, 3, '2020-06-11 06:58:27', '2020-06-11 12:28:27', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `student_parent_detail`
--

CREATE TABLE `student_parent_detail` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_parent_detail`
--

INSERT INTO `student_parent_detail` (`id`, `parent_id`, `student_id`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 1, 10, '2020-06-15 05:54:12', '2020-06-15 11:24:12', 0, 1),
(2, 1, 12, '2020-06-15 05:54:21', '2020-06-15 11:24:21', 0, 1),
(3, 14, 12, '2020-06-15 05:59:29', '2020-06-15 11:29:29', 0, 1),
(4, 14, 13, '2020-06-15 05:59:37', '2020-06-15 11:29:37', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(256) NOT NULL,
  `lastname` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(2048) NOT NULL,
  `profile_image` varchar(2456) NOT NULL,
  `profile_url` varchar(2556) NOT NULL,
  `userType` set('teacher','student','driver','parents') NOT NULL,
  `guid` varchar(256) NOT NULL,
  `isActive` set('1','0') NOT NULL DEFAULT '0',
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `profile_image`, `profile_url`, `userType`, `guid`, `isActive`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 'parent', 'narola', 'test@test.com', '5f4dcc3b5aa765d61d8327deb882cf99', '1591256662682LRuBb4a.jpg', '', 'parents', '8004dd6b-cc9e-43b5-95ae-6c6c74a5', '0', '2020-06-04 07:44:27', '2020-06-16 09:52:33', 0, 1),
(2, 'test', 'narola', 'test1@test.com', '5f4dcc3b5aa765d61d8327deb882cf99', '15913560141140mGbHHz.jpg', 'http://localhost/ClassJockeyApp/uploads/profile_image/15913560141140mGbHHz.jpg', 'student', 'a893e61d-aee3-4834-977d-49b5455a', '0', '2020-06-04 09:31:30', '2020-06-05 16:50:15', 0, 1),
(6, 'proffesor', 'narola', 'kkr@narola.email', 'a4bbbfcb4d5c292840e6d107cefebc00', '1591857776753Z2ZYzRH.jpg', 'http://localhost/ClassJockeyApp/uploads/profile_image/1591857776753Z2ZYzRH.jpg', 'teacher', 'd79724e7-c91a-4b3d-a506-f3f51267', '0', '2020-06-04 10:58:54', '2020-06-18 10:08:42', 0, 1),
(7, 'kkr', 'narola', 'kkr1@narola.email', '5f4dcc3b5aa765d61d8327deb882cf99', '', '', 'student', '9b35147b-4274-402b-81f5-e0dfba0e', '0', '2020-06-04 17:16:12', '2020-06-04 22:46:12', 0, 1),
(8, 'kkr', 'narola', 'testteacher@narola.email', '5f4dcc3b5aa765d61d8327deb882cf99', '', '', 'teacher', '9fec05b9-f491-443f-9353-691f4600', '0', '2020-06-04 17:18:29', '2020-06-04 22:48:29', 0, 1),
(9, 'kkr', 'test', 'teststudent@narola.email', '5f4dcc3b5aa765d61d8327deb882cf99', '1591355612983D75F8r6.jpg', 'http://localhost/ClassJockeyApp/uploads/profile_image/1591355612983D75F8r6.jpg', 'student', 'a9becc1c-36a4-4840-83a3-b5cd2bf9', '0', '2020-06-05 06:56:09', '2020-06-05 16:43:34', 0, 1),
(10, 'jolly', 'mario', 'student1@narola.email', '5f4dcc3b5aa765d61d8327deb882cf99', '', '', 'student', 'ec321a78-3b85-4f6c-bf22-047b4219', '0', '2020-06-11 06:41:02', '2020-06-18 10:11:33', 0, 1),
(11, 'jonny', 'shah', 'student2@narola.email', '5f4dcc3b5aa765d61d8327deb882cf99', '', '', 'student', '4591983b-d1e8-4f59-8ebc-58fcbd1a', '0', '2020-06-11 06:41:24', '2020-06-18 10:11:33', 0, 1),
(12, 'raquel', 'shah', 'student3@narola.email', '5f4dcc3b5aa765d61d8327deb882cf99', '', '', 'student', '883dddd7-90da-4c40-bf6c-d5ad37f3', '0', '2020-06-11 06:41:32', '2020-06-18 10:11:33', 0, 1),
(13, 'meet', 'mehta', 'studen4@narola.email', '5f4dcc3b5aa765d61d8327deb882cf99', '', '', 'student', '658c754a-501e-4e6e-bc76-193ae575', '0', '2020-06-11 06:41:41', '2020-06-18 10:11:33', 0, 1),
(14, 'john', 'meist', 'johnmeist@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', '', '', 'parents', 'f4a58733-701e-4cd7-a0c1-a95e3aa5', '0', '2020-06-15 05:58:13', '2020-06-15 11:28:13', 0, 1),
(15, 'driver', 'test', 'drivertest@narola.email', '5f4dcc3b5aa765d61d8327deb882cf99', '', '', 'driver', 'd6058711-565e-4526-8b1e-ee324654', '0', '2020-06-15 12:18:29', '2020-06-15 17:48:29', 0, 1),
(16, 'riyansh', 'rehani', 'mkr@narola.email', '5f4dcc3b5aa765d61d8327deb882cf99', '', '', 'driver', 'b9406871-fb6f-48a5-9986-8d608666', '0', '2020-06-17 09:15:54', '2020-06-18 10:11:33', 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `allergy`
--
ALTER TABLE `allergy`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `apptokens`
--
ALTER TABLE `apptokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bus_attendance`
--
ALTER TABLE `bus_attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `challenges`
--
ALTER TABLE `challenges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `challenge_accept_detail`
--
ALTER TABLE `challenge_accept_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class_student_detail`
--
ALTER TABLE `class_student_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments_challenges`
--
ALTER TABLE `comments_challenges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments_events`
--
ALTER TABLE `comments_events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver_location`
--
ALTER TABLE `driver_location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_subscribe_detail`
--
ALTER TABLE `event_subscribe_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `holidays`
--
ALTER TABLE `holidays`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notice`
--
ALTER TABLE `notice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parents_contact_detail`
--
ALTER TABLE `parents_contact_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_allergy_detail`
--
ALTER TABLE `student_allergy_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_parent_detail`
--
ALTER TABLE `student_parent_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `allergy`
--
ALTER TABLE `allergy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `apptokens`
--
ALTER TABLE `apptokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `bus_attendance`
--
ALTER TABLE `bus_attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `challenges`
--
ALTER TABLE `challenges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `challenge_accept_detail`
--
ALTER TABLE `challenge_accept_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `class_student_detail`
--
ALTER TABLE `class_student_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `comments_challenges`
--
ALTER TABLE `comments_challenges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `comments_events`
--
ALTER TABLE `comments_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `driver_location`
--
ALTER TABLE `driver_location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `event_subscribe_detail`
--
ALTER TABLE `event_subscribe_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `holidays`
--
ALTER TABLE `holidays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `notice`
--
ALTER TABLE `notice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `parents_contact_detail`
--
ALTER TABLE `parents_contact_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `student_allergy_detail`
--
ALTER TABLE `student_allergy_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `student_parent_detail`
--
ALTER TABLE `student_parent_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
