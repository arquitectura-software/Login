
CREATE DATABASE IF NOT EXISTS Ident;
use Ident;

CREATE TABLE IF NOT EXISTS users (

    id INT(10) unsigned NOT NULL AUTO_INCREMENT,
    names VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL,
    surnames VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL,
    username VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL,
    passw VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY(id),
    INDEX(id)
) ENGINE=InnoDB DEFAULT CHARACTER SET = utf8;
DESCRIBE users;

CREATE TABLE IF NOT EXISTS passengers (

    id INT(10) unsigned NOT NULL AUTO_INCREMENT,
    id_user INT(10) unsigned NOT NULL,
    birthdate DATE NOT NULL,
    email VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL,
    phone INT(16) unsigned NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_user)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARACTER SET = utf8;

DESCRIBE passengers;

CREATE TABLE IF NOT EXISTS crew (

    id INT(10) unsigned NOT NULL AUTO_INCREMENT,
    id_user INT(10) unsigned NOT NULL,
    dependence VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    INDEX(id),
    PRIMARY KEY(id),
    FOREIGN KEY (id_user)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARACTER SET = utf8;

DESCRIBE crew;

ALTER USER 'mysql'@'%' IDENTIFIED WITH mysql_native_password BY '1234';
FLUSH PRIVILEGES;

INSERT INTO users (names, surnames, username, passw)
VALUES
    ("David Arturo", "Mendez Velandia", "darturovela" ,"123456"),
    ("Laura Sofia", "Mendez Velandia", "lsofiavela" ,"123456"),
    ("Samuel Camilo", "Torres Vesga", "sacamiloto" ,"123456"),
    ("Saray", "Fonseca", "saraseca" ,"123456"),
    ("Sara Sofia", "Novoa Tellez", "saravoa" ,"123456"),
    ("Mickey", "Dysney Marvel", "mickney" ,"123456"),
    ("Daniela Maria", "Ruiz Zamora", "damaruiz" ,"123456"),
    ("Luisa Fernanda", "Rodriguez", "luiferro" ,"123456"),
    ("Andres Felipe", "Ramirez Alfonso", "anframirezal" ,"123456"),
    ("Ximena Penelope", "Fonseca Asencio", "ximepenefo" ,"123456");

    INSERT INTO passengers (id_user, birthdate, email, phone)
VALUES
    (1, "1990-12-15 12:00:00", "darturovela@gmail.com" ,3158302787),
    (2, "1987-03-01 12:00:00", "lsofiavela@gmail.com" ,3143752255),
    (3, "1995-02-21 12:00:00","sacamiloto@gmail.com" ,3102579249),
    (4, "1977-08-11 12:00:00","saraseca@gmail.com" ,3138611109),
    (5, "2014-03-01 12:00:00","saravoa@gmail.com" ,3013778966);


INSERT INTO crew (id_user, dependence)
VALUES
    (6, "Restaurant"),
    (7, "Store"),
    (8, "Laundry"),
    (9, "Security"),
    (10, "Logistics");