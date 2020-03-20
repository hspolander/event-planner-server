USE event_planner;
CREATE USER 'event_user'@'localhost' IDENTIFIED BY 'Alkaline#Na2CO3';

CREATE TABLE `events` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `activity` varchar(255) NOT NULL,
  `startDate` varchar(255) NOT NULL,
  `endDate` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `event_dates` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `fk_event_id` int(5) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_token_event_id` (`fk_event_id`),
  CONSTRAINT `FK_token_event_id`
  FOREIGN KEY (`fk_event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

GRANT ALL PRIVILEGES ON `event_planner`.* TO 'event_user'@'localhost';

