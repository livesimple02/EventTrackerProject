-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema timedb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `timedb` ;

-- -----------------------------------------------------
-- Schema timedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `timedb` DEFAULT CHARACTER SET utf8 ;
USE `timedb` ;

-- -----------------------------------------------------
-- Table `job`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `job` ;

CREATE TABLE IF NOT EXISTS `job` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `job_number` VARCHAR(45) NULL,
  `customer` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `job_number_UNIQUE` (`job_number` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `task`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `task` ;

CREATE TABLE IF NOT EXISTS `task` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NULL,
  `description` TEXT NULL,
  `total_time` INT NULL,
  `job_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_task_job1_idx` (`job_id` ASC),
  CONSTRAINT `fk_task_job1`
    FOREIGN KEY (`job_id`)
    REFERENCES `job` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `timer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `timer` ;

CREATE TABLE IF NOT EXISTS `timer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `start` DATETIME NULL,
  `end` DATETIME NULL,
  `duration` INT NULL,
  `task_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_timer_task1_idx` (`task_id` ASC),
  CONSTRAINT `fk_timer_task1`
    FOREIGN KEY (`task_id`)
    REFERENCES `task` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS timeuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'timeuser'@'localhost' IDENTIFIED BY 'timeuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'timeuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `job`
-- -----------------------------------------------------
START TRANSACTION;
USE `timedb`;
INSERT INTO `job` (`id`, `job_number`, `customer`) VALUES (1, 'SD001001', 'Skill Distillery');
INSERT INTO `job` (`id`, `job_number`, `customer`) VALUES (2, 'AM001001', 'Amazon');
INSERT INTO `job` (`id`, `job_number`, `customer`) VALUES (3, 'YA001001', 'Yahoo');
INSERT INTO `job` (`id`, `job_number`, `customer`) VALUES (4, 'SD001002', 'Skill Distillery');

COMMIT;


-- -----------------------------------------------------
-- Data for table `task`
-- -----------------------------------------------------
START TRANSACTION;
USE `timedb`;
INSERT INTO `task` (`id`, `title`, `description`, `total_time`, `job_id`) VALUES (1, 'Build Backend', 'Build a REST api backend for an event tracker.', 360, 1);
INSERT INTO `task` (`id`, `title`, `description`, `total_time`, `job_id`) VALUES (2, 'Build Frontend', 'Build a Frontend for event tracker using HTML/CSS/Javascript', 300, 1);
INSERT INTO `task` (`id`, `title`, `description`, `total_time`, `job_id`) VALUES (3, 'Improve Recommendations', 'Make improvements to Amazon recommendations based on items in cart', 185, 2);
INSERT INTO `task` (`id`, `title`, `description`, `total_time`, `job_id`) VALUES (4, 'Make email view size larger', 'Customers have complained about email preview window being too small. Make larger', 68, 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `timer`
-- -----------------------------------------------------
START TRANSACTION;
USE `timedb`;
INSERT INTO `timer` (`id`, `start`, `end`, `duration`, `task_id`) VALUES (1, '2021-8-1 8:00:00', '2021-8-1 12:00:00', 240, 1);
INSERT INTO `timer` (`id`, `start`, `end`, `duration`, `task_id`) VALUES (2, '2021-8-7 15:00:00', '2021-8-7 20:00:00', 300, 2);
INSERT INTO `timer` (`id`, `start`, `end`, `duration`, `task_id`) VALUES (3, '2021-7-30 13:00:00', '2021-7-30 16:05:00', 185, 3);
INSERT INTO `timer` (`id`, `start`, `end`, `duration`, `task_id`) VALUES (4, '2021-7-26 10:10:00', '2021-7-26 11:18:00', 68, 4);
INSERT INTO `timer` (`id`, `start`, `end`, `duration`, `task_id`) VALUES (5, '2021-8-1 20:00:00', '2021-8-1 22:00:00', 120, 1);

COMMIT;

