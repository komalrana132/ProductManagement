-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 25, 2020 at 08:11 AM
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
-- Database: `ProductManagementApp`
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
(1, 'globalPassword', 'productManageGlobalPassword', 'text', 'All', '2020-06-18 05:43:03', '2020-06-18 05:43:03', 0, '1'),
(2, 'userAgent', 'iOS,Android,Mozilla/5.0,PostmanRuntime/2.5.0,PostmanRuntime/7.25.0', 'comma-separated', 'All', '2020-06-18 05:43:03', '2020-06-18 05:43:03', 0, '1'),
(3, 'tempToken', 'allowAccessToApp', 'text', 'All', '2020-06-18 05:43:03', '2020-06-18 05:43:03', 0, '1'),
(4, 'expiry_duration', '3600', 'second', 'All', '2020-06-18 05:43:03', '2020-06-18 05:43:03', 0, '1'),
(5, 'autologout', '1', 'boolean', 'All', '2020-06-18 05:43:03', '2020-06-18 05:43:03', 0, '1');

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
(1, 1, 'KcNFHLd4', 'access_token', 'active', '2025-06-20 06:55:34', NULL, '', 1, '2020-06-25 05:55:34', '2020-06-25 11:25:34', 0, 1),
(2, 2, 'buJOxOeJ', 'access_token', 'active', '2022-06-20 12:54:04', NULL, '', 3, '2020-06-22 11:54:04', '2020-06-22 17:24:04', 0, 1),
(3, 3, 'iDBX078H', 'access_token', 'active', '2022-06-20 13:21:36', NULL, '', 1, '2020-06-22 12:21:36', '2020-06-22 17:51:36', 0, 1),
(4, 4, 'treohlpn', 'access_token', 'active', '2022-06-20 13:32:13', NULL, '', 1, '2020-06-22 12:32:13', '2020-06-22 18:02:13', 0, 1),
(5, 5, 'T6y2Uvaj', 'access_token', 'active', '2022-06-20 13:34:11', NULL, '', 0, '2020-06-22 12:34:11', '2020-06-22 18:04:11', 0, 1),
(6, 6, 'N2Jwxh2e', 'access_token', 'active', '2022-06-20 13:45:34', NULL, '', 1, '2020-06-22 12:45:34', '2020-06-22 18:15:34', 0, 1),
(7, 7, 'Dn8s7pVt', 'access_token', 'active', '2022-06-20 13:47:15', NULL, '', 0, '2020-06-22 12:47:15', '2020-06-22 18:17:15', 0, 1),
(8, 8, 'zR202Xib', 'access_token', 'active', '2022-06-20 13:57:33', NULL, '', 1, '2020-06-22 12:57:33', '2020-06-22 18:27:33', 0, 1),
(9, 9, 'zzuVaVJ8', 'access_token', 'active', '2022-06-20 13:59:04', NULL, '', 0, '2020-06-22 12:59:04', '2020-06-22 18:29:04', 0, 1),
(10, 10, 'egQaNmnX', 'access_token', 'active', '2022-06-20 14:00:38', NULL, '', 0, '2020-06-22 13:00:38', '2020-06-22 18:30:38', 0, 1),
(11, 11, '1DqOZf0z', 'access_token', 'active', '2022-06-20 14:01:55', NULL, '', 0, '2020-06-22 13:01:55', '2020-06-22 18:31:55', 0, 1),
(12, 12, '5Ez8NVTY', 'access_token', 'active', '2024-06-20 08:57:18', NULL, '', 3, '2020-06-24 07:57:18', '2020-06-24 13:27:18', 0, 1),
(13, 13, 'GybV0voJ', 'access_token', 'active', '2024-06-20 08:58:17', NULL, '', 3, '2020-06-24 07:58:17', '2020-06-24 13:28:17', 0, 1),
(14, 14, 'AWKg5UK2', 'access_token', 'active', '2024-06-20 08:59:38', NULL, '', 3, '2020-06-24 07:59:38', '2020-06-24 13:29:38', 0, 1),
(15, 15, 'PJiTyad5', 'access_token', 'active', '2024-06-20 12:01:24', NULL, '', 1, '2020-06-24 11:01:24', '2020-06-24 16:31:24', 0, 1),
(16, 16, 'bWLQp0yJ', 'access_token', 'active', '2024-06-20 12:09:43', NULL, '', 1, '2020-06-24 11:09:43', '2020-06-24 16:39:43', 0, 1),
(17, 17, 'd5R6A5gk', 'access_token', 'active', '2024-06-20 12:15:32', NULL, '', 1, '2020-06-24 11:15:32', '2020-06-24 16:45:32', 0, 1),
(18, 18, '1xuFYF66', 'access_token', 'active', '2024-06-20 12:18:32', NULL, '', 1, '2020-06-24 11:18:32', '2020-06-24 16:48:32', 0, 1),
(19, 19, 'poMbvO4V', 'access_token', 'active', '2024-06-20 12:21:15', NULL, '', 1, '2020-06-24 11:21:15', '2020-06-24 16:51:15', 0, 1),
(20, 20, 'y605dCV8', 'access_token', 'active', '2024-06-20 12:23:06', NULL, '', 1, '2020-06-24 11:23:06', '2020-06-24 16:53:06', 0, 1),
(21, 21, 'huhvWQlT', 'access_token', 'active', '2024-06-20 12:37:35', NULL, '', 1, '2020-06-24 11:37:35', '2020-06-24 17:07:35', 0, 1),
(22, 22, 'WfNrEuA1', 'access_token', 'active', '2024-06-20 12:41:16', NULL, '', 1, '2020-06-24 11:41:16', '2020-06-24 17:11:16', 0, 1),
(23, 23, 'AecYeMFu', 'access_token', 'active', '2024-06-20 12:42:52', NULL, '', 1, '2020-06-24 11:42:52', '2020-06-24 17:12:52', 0, 1),
(24, 24, 'v5ULgoTo', 'access_token', 'active', '2024-06-20 12:43:49', NULL, '', 1, '2020-06-24 11:43:49', '2020-06-24 17:13:49', 0, 1),
(25, 25, 'Qt210EcW', 'access_token', 'active', '2024-06-20 12:47:39', NULL, '', 1, '2020-06-24 11:47:39', '2020-06-24 17:17:39', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `description` int(11) NOT NULL,
  `price` float NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product_image_detail`
--

CREATE TABLE `product_image_detail` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `product_url` varchar(2556) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `gender` varchar(25) NOT NULL,
  `contact` varchar(25) NOT NULL,
  `guid` varchar(256) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isDelete` tinyint(4) NOT NULL DEFAULT 0,
  `isTestdata` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `profile_image`, `profile_url`, `gender`, `contact`, `guid`, `createdDate`, `modifiedDate`, `isDelete`, `isTestdata`) VALUES
(1, 'kkr', 'test', 'kkr@narola.email', '5f4dcc3b5aa765d61d8327deb882cf99', '1592471110737VCM6540.jpg', 'http://localhost/ProductManagement/uploads/profile_image/1592471110737VCM6540.jpg', 'female', '1234', '124e77d4-acb8-460e-a64e-458df8d0', '2020-06-18 09:05:11', '2020-06-18 14:45:51', 0, 1),
(2, 'kkr', 'test', 'kkr2@narola.email', '5f4dcc3b5aa765d61d8327deb882cf99', '15928268438501KiI90w.jpg', 'http://localhost/ProductManagement/uploads/profile_image/15928268438501KiI90w.jpg', '', '', 'e767df6c-2934-4ce7-9492-840289b9', '2020-06-22 11:54:04', '2020-06-22 17:24:04', 0, 1),
(3, 'komal', '', 'test@test.com', '1a1dc91c907325c69271ddf0c944bc72', '', '', '', '', '57a61b23-f107-433b-835e-ad19bfd1', '2020-06-22 12:21:36', '2020-06-22 17:51:36', 0, 1),
(4, 'test', '', 'test@test.co', '202cb962ac59075b964b07152d234b70', '15928291331903Q8tE32.jpg', 'http://localhost/ProductManagement/uploads/profile_image/15928291331903Q8tE32.jpg', '', '', '8a8d77f4-f56a-4296-bd4d-d719c430', '2020-06-22 12:32:13', '2020-06-22 18:02:13', 0, 1),
(5, 'test', '', 'test1@test.co', '5f4dcc3b5aa765d61d8327deb882cf99', '1592829251461A2bntPV.jpg', 'http://localhost/ProductManagement/uploads/profile_image/1592829251461A2bntPV.jpg', '', '', '3260fd2d-d899-46d1-8bbe-643f1fc0', '2020-06-22 12:34:11', '2020-06-22 18:04:11', 0, 1),
(6, 'komal', '', 'test@test2.co', '5f4dcc3b5aa765d61d8327deb882cf99', '1592829934756XeAMpG1.jpg', 'http://localhost/ProductManagement/uploads/profile_image/1592829934756XeAMpG1.jpg', '', '', 'badb9a20-5bc2-484f-9195-67fb75d6', '2020-06-22 12:45:34', '2020-06-22 18:15:34', 0, 1),
(7, 'test', '', 'test2@test.co', '5f4dcc3b5aa765d61d8327deb882cf99', '15928300346282a06Si7.jpg', 'http://localhost/ProductManagement/uploads/profile_image/15928300346282a06Si7.jpg', '', '', 'd65e4da4-fc65-4963-846a-dcc77a34', '2020-06-22 12:47:14', '2020-06-22 18:17:14', 0, 1),
(8, 'edf', '', 'abc@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', '1592830653546Aqa1CA3.jpg', 'http://localhost/ProductManagement/uploads/profile_image/1592830653546Aqa1CA3.jpg', '', '', 'f8cf2398-629f-4ca0-b331-9cb24712', '2020-06-22 12:57:33', '2020-06-22 18:27:33', 0, 1),
(9, 'test', '', 'test3@test.co', '5f4dcc3b5aa765d61d8327deb882cf99', '1592830743872qhTb9R2.jpg', 'http://localhost/ProductManagement/uploads/profile_image/1592830743872qhTb9R2.jpg', '', '', '29f6f553-544d-473b-bd94-207c2177', '2020-06-22 12:59:04', '2020-06-22 18:29:04', 0, 1),
(10, 'test', '', 'test23@test.co', '5f4dcc3b5aa765d61d8327deb882cf99', '15928308383407B0ASQT.jpg', 'http://localhost/ProductManagement/uploads/profile_image/15928308383407B0ASQT.jpg', '', '', '9150ae74-309c-4947-89e9-daac0ead', '2020-06-22 13:00:38', '2020-06-22 18:30:38', 0, 1),
(11, 'test', '', 'test24@test.co', '5f4dcc3b5aa765d61d8327deb882cf99', '1592830914931doD250j.jpg', 'http://localhost/ProductManagement/uploads/profile_image/1592830914931doD250j.jpg', '', '', '656384bb-cbb8-4268-8ee2-9a70cfb6', '2020-06-22 13:01:55', '2020-06-22 18:31:55', 0, 1),
(14, 'komal', 'narola', 'fileTest@gmail.com', 'password', '1593024968254FE4TPk5.png', 'http://localhost/ProductManagement/uploads/profile_image/1593024968254FE4TPk5.png', '', '', 'ae3582fa-8e29-4c75-8de0-77b1eaf6', '2020-06-24 07:59:37', '2020-06-25 00:26:08', 0, 1),
(15, 'a', '', 'a@a.com', 'a', '1592996484530QPvSY11.JPG', 'http://localhost/ProductManagement/uploads/profile_image/1592996484530QPvSY11.JPG', '', '', '14a86bf4-7abb-4842-a220-cb9d2e1f', '2020-06-24 11:01:24', '2020-06-24 16:31:24', 0, 1),
(17, 'f', '', 'b@b.com', '1', '', '', '', '', '153af265-7973-4379-bb2f-a5bca106', '2020-06-24 11:15:32', '2020-06-24 16:45:32', 0, 1),
(18, '1', '', 'c@c.com', '1', '', '', '', '', 'e749e239-2de8-42b8-b3de-52f7a1d5', '2020-06-24 11:18:32', '2020-06-24 16:48:32', 0, 1),
(25, 'e', '', 'e@e.com', '1', '', '', '', '', '4064d6d4-2f11-4f46-a568-a56c63b2', '2020-06-24 11:47:39', '2020-06-24 17:17:39', 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `apptokens`
--
ALTER TABLE `apptokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_image_detail`
--
ALTER TABLE `product_image_detail`
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
-- AUTO_INCREMENT for table `apptokens`
--
ALTER TABLE `apptokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_image_detail`
--
ALTER TABLE `product_image_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
