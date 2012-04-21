SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';


-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users` ;

CREATE  TABLE IF NOT EXISTS `users` (
  `id` BIGINT(32) UNSIGNED NOT NULL ,
  `full_name` VARCHAR(256) NOT NULL ,
  `email` VARCHAR(256) NULL ,
  `access_token` VARCHAR(256) NULL ,
  `access_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  `create_time` DATETIME NOT NULL ,
  `locale` VARCHAR(8) NULL ,
  `gender` VARCHAR(8) NULL ,
  `active` TINYINT(1)  NOT NULL ,
  `friends_count` INT NULL DEFAULT 0 ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `items` ;

CREATE  TABLE IF NOT EXISTS `items` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(256) NOT NULL ,
  `locked` TINYINT(1)  NOT NULL DEFAULT 0 ,
  `img_url` VARCHAR(64) NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `categories` ;

CREATE  TABLE IF NOT EXISTS `categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(256) NOT NULL ,
  `score_label` VARCHAR(256) NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `item_categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `item_categories` ;

CREATE  TABLE IF NOT EXISTS `item_categories` (
  `items_id` INT UNSIGNED NOT NULL ,
  `categories_id` INT UNSIGNED NOT NULL ,
  INDEX `fk_item_categories_items` (`items_id` ASC) ,
  INDEX `fk_item_categories_categories1` (`categories_id` ASC) ,
  PRIMARY KEY (`items_id`, `categories_id`) ,
  CONSTRAINT `fk_item_categories_items`
    FOREIGN KEY (`items_id` )
    REFERENCES `items` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_item_categories_categories1`
    FOREIGN KEY (`categories_id` )
    REFERENCES `categories` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sent_items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sent_items` ;

CREATE  TABLE IF NOT EXISTS `sent_items` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `items_id` INT UNSIGNED NOT NULL ,
  `publish_date` TIMESTAMP NOT NULL ,
  `recepient_id` BIGINT(32) UNSIGNED NOT NULL ,
  `sender_id` BIGINT(32) UNSIGNED NOT NULL ,
  PRIMARY KEY (`id`, `items_id`, `sender_id`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `fk_sent_items_items1` (`items_id` ASC) ,
  INDEX `fk_sent_items_users2` (`sender_id` ASC) ,
  CONSTRAINT `fk_sent_items_items1`
    FOREIGN KEY (`items_id` )
    REFERENCES `items` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sent_items_users2`
    FOREIGN KEY (`sender_id` )
    REFERENCES `users` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unlocked_items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `unlocked_items` ;

CREATE  TABLE IF NOT EXISTS `unlocked_items` (
  `items_id` INT UNSIGNED NOT NULL ,
  `users_id` BIGINT(32) UNSIGNED NOT NULL ,
  PRIMARY KEY (`items_id`, `users_id`) ,
  INDEX `fk_unlocked_items_users1` (`users_id` ASC) ,
  CONSTRAINT `fk_uncloked_items_items1`
    FOREIGN KEY (`items_id` )
    REFERENCES `items` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_unlocked_items_users1`
    FOREIGN KEY (`users_id` )
    REFERENCES `users` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
