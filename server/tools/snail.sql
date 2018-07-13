-- show create table books

DROP TABLE IF EXISTS `books`;

CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` varchar(20) NOT NULL,
  `openid` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `alt` varchar(100) NOT NULL,
  `publisher` varchar(100) NOT NULL,
  `summary` varchar(1000) NOT NULL,
  `price` varchar(100) DEFAULT NULL,
  `rate` varchar(200) DEFAULT NULL,
  `tags` varchar(100) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `count` int(11) NOT NULL DEFAULT '0',
  `pubdate` varchar(100) DEFAULT NULL,
  `author_intro` varchar(1000) DEFAULT NULL,
  `catalog` varchar(10000) DEFAULT NULL,
  `subtitle` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`openid` varchar(100) NOT NULL,
`bookid` varchar(100) NOT NULL,
`comment` varchar(200) NOT NULL,
`phone` varchar(20) DEFAULT NULL,
`location` varchar(20) DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
