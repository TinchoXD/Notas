-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: uetemm
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `catalogo`
--

DROP TABLE IF EXISTS `catalogo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catalogo` (
  `cata_id` int NOT NULL AUTO_INCREMENT,
  `cata_nombre` varchar(100) DEFAULT NULL,
  `cata_catalogo_parent` int DEFAULT NULL,
  `cata_fecha_modificacion` timestamp NULL DEFAULT NULL,
  `cata_user_modificacion` varchar(100) DEFAULT NULL,
  `cata_descripcion` varchar(100) DEFAULT NULL,
  `cata_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`cata_id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Calatolos del sistema';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo`
--

LOCK TABLES `catalogo` WRITE;
/*!40000 ALTER TABLE `catalogo` DISABLE KEYS */;
INSERT INTO `catalogo` VALUES (1,'Estado Civil',NULL,'2024-05-19 05:00:00','admin','catalogo contendor de estado civil',1),(2,'Soltero/a',1,'2024-05-19 05:00:00','admin','estado civil - Soltero/a',1),(3,'Casado/a',1,'2024-05-19 05:00:00','admin','estado civil - Casado/a',1),(4,'Unión libre o Unión de hecho',1,'2024-05-19 05:00:00','admin','estado civil - Unión libre o unión de hecho\r\n',1),(5,'Separado',1,'2024-05-19 05:00:00','admin','estado civil - Separado',0),(6,'Divorciado',1,'2024-05-19 05:00:00','admin','estado civil - Divorciado',1),(7,'Viudo',1,'2024-05-19 05:00:00','admin','estado civil - Viudo',1),(8,'Jornada Laboral',NULL,'2024-05-19 05:00:00','admin','catalogo Jornada Laboral',1),(9,'Matutina',8,'2024-05-19 05:00:00','admin','Jornada Matutina',1),(10,'Vespertina',8,'2024-05-19 05:00:00','admin','Jornada Vespertina',1),(11,'Nocturna',8,'2024-05-19 05:00:00','admin','Jornada Nocturna',1),(12,'Relación Laboral',NULL,'2024-05-19 05:00:00','admin','catálogo Relación Laboral',1),(13,'Nombramiento Definitivo',12,'2024-05-19 05:00:00','admin','Nombramiento Definitivo',1),(14,'Nombramiento Provisional',12,'2024-05-19 05:00:00','admin','Nombramiento Provisional',1),(15,'Contrato',12,'2024-05-19 05:00:00','admin','Contrato',1),(16,'Categoría',NULL,'2024-05-19 05:00:00','admin','catálogo Contrato',1),(17,'Categoría A',16,'2024-05-19 05:00:00','admin','Categoría A',1),(18,'Categoría B',16,'2024-05-19 05:00:00','admin','Categoría B',1),(19,'Categoría C',16,'2024-05-19 05:00:00','admin','Categoría C',1),(20,'Categoría D',16,'2024-05-19 05:00:00','admin','Categoría D',1),(21,'Categoría E',16,'2024-05-19 05:00:00','admin','Categoría E',1),(22,'Categoría F',16,'2024-05-19 05:00:00','admin','Categoría F',1),(23,'Categoría G',16,'2024-05-19 05:00:00','admin','Categoría G',1),(24,'Contrato',16,'2024-05-19 05:00:00','admin','Contrato',1),(25,'Nivel de Educación',NULL,'2024-05-19 05:00:00','admin','catálogo Nivel de Educación',1),(26,'Secundaria',25,'2024-05-19 05:00:00','admin','Secundaria',1),(27,'Tercer Nivel',25,'2024-05-19 05:00:00','admin','Tercer Nivel',1),(28,'Cuarto Nivel',25,'2024-05-19 05:00:00','admin','Cuarto Nivel',1),(29,'Doctorado',25,'2024-05-19 05:00:00','admin','Doctorado',1),(30,'PhD.',25,'2024-05-19 05:00:00','admin','PhD.',1),(31,'Grupo étnico',NULL,'2024-05-19 05:00:00','admin','catálogo Grupo étnico',1),(33,'Mestizo',31,'2024-05-19 05:00:00','admin','grupo étnico Mestizo',1),(34,'Indígena',31,'2024-05-19 05:00:00','admin','grupo étnico Indígena',1),(35,'Montubio',31,'2024-05-19 05:00:00','admin','grupo étnico Montubio',1),(36,'Afro-Ecuatoriano',31,'2024-05-19 05:00:00','admin','grupo étnico Afro-Ecuatoriano',1),(37,'Blanco',31,'2024-05-19 05:00:00','admin','grupo étnico Blanco',1),(38,'Otro',31,'2024-05-19 05:00:00','admin','grupo étnico Otro',1),(39,'Grupo étnico otro',NULL,'2024-05-19 05:00:00','admin','catálogo Grupo étnico específico',1),(40,'Awa',39,'2024-05-19 05:00:00','admin','Awa',1),(41,'Chachi',39,'2024-05-19 05:00:00','admin','Chachi',1),(42,'Epera',39,'2024-05-19 05:00:00','admin','Epera',1),(43,'Tsa´chila',39,'2024-05-19 05:00:00','admin','Tsa´chila',1),(44,'Manta Huancavilca',39,'2024-05-19 05:00:00','admin','Manta Huancavilca',1),(45,'Karanki',39,'2024-05-19 05:00:00','admin','Karanki',1),(46,'Natabulea',39,'2024-05-19 05:00:00','admin','Natabulea',1),(47,'Otavalo',39,'2024-05-19 05:00:00','admin','Otavalo',1),(48,'Kayambi',39,'2024-05-19 05:00:00','admin','Kayambi',1),(49,'Kitu Kara',39,'2024-05-19 05:00:00','admin','Kitu Kara',1),(50,'Pamzaleo',39,'2024-05-19 05:00:00','admin','Pamzaleo',1),(51,'Chibuleo',39,'2024-05-19 05:00:00','admin','Chibuleo',1),(52,'Salasaka',39,'2024-05-19 05:00:00','admin','Salasaka',1),(53,'Kisapincha',39,'2024-05-19 05:00:00','admin','Kisapincha',1),(54,'Kichua Sierra',39,'2024-05-19 05:00:00','admin','Kichua Sierra',1),(55,'Waranka',39,'2024-05-19 05:00:00','admin','Waranka',1),(56,'Puruhá',39,'2024-05-19 05:00:00','admin','Puruhá',1),(57,'Kañari',39,'2024-05-19 05:00:00','admin','Kañari',1),(58,'Saraguro',39,'2024-05-19 05:00:00','admin','Saraguro',1),(59,'A´i Cofan',39,'2024-05-19 05:00:00','admin','A´i Cofan',1),(60,'Secoya',39,'2024-05-19 05:00:00','admin','Secoya',1),(61,'Siona',39,'2024-05-19 05:00:00','admin','Siona',1),(62,'Huaorani',39,'2024-05-19 05:00:00','admin','Huaorani',1),(63,'Shiwiar',39,'2024-05-19 05:00:00','admin','Shiwiar',1),(64,'Zápara',39,'2024-05-19 05:00:00','admin','Zápara',1),(65,'Achuar',39,'2024-05-19 05:00:00','admin','Achuar',1),(66,'Shuar',39,'2024-05-19 05:00:00','admin','Shuar',1),(67,'Kichwa Amazonía',39,'2024-05-19 05:00:00','admin','Kichwa Amazonía',1),(68,'Actividad Laboral',NULL,'2024-05-19 05:00:00','admin','catálogo Actividad Laboral',1),(69,'Docente',68,'2024-05-19 05:00:00','admin','Docente',1),(70,'DECE',68,'2024-05-19 05:00:00','admin','DECE',1),(71,'Autoridad',68,'2024-05-19 05:00:00','admin','Autoridad',1),(72,'Nivel',NULL,'2024-05-19 05:00:00','admin','catálogo Nivel Usuario',1),(73,'Preparatoria',72,'2024-05-19 05:00:00','admin','Preparatoria',1),(74,'Elemental',72,'2024-05-19 05:00:00','admin','Elemental',1),(75,'Media',72,'2024-05-19 05:00:00','admin','Media',1),(76,'Superior',72,'2024-05-19 05:00:00','admin','Superior',1),(77,'Bachillerato',72,'2024-05-19 05:00:00','admin','Bachillerato',1),(78,'PCEI no Intensivo',72,'2024-05-19 05:00:00','admin','PCEI no Intensivo',1),(79,'PCEI Intensivo',72,'2024-05-19 05:00:00','admin','PCEI Intensivo',1),(80,'Sexo',NULL,'2024-05-19 05:00:00','admin','Catálogo Sexo',1),(81,'Masculino',80,'2024-05-19 05:00:00','admin','Masculino',1),(82,'Femenino',80,'2024-05-19 05:00:00','admin','Femenino',1),(83,'Otro',80,'2024-05-19 05:00:00','admin','otro',1),(84,'Activo',NULL,'2024-05-19 05:00:00','admin','Catálogo Activo',1),(85,'Sí',84,'2024-05-19 05:00:00','admin','Sí',1),(86,'No, Jubilado',84,'2024-05-19 05:00:00','admin','No, Jubilado',1);
/*!40000 ALTER TABLE `catalogo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') DEFAULT NULL,
  `pais` varchar(100) DEFAULT NULL,
  `estado_civil` int DEFAULT NULL,
  `user_direccion` varchar(150) DEFAULT NULL,
  `user_telefono_celular` varchar(20) DEFAULT NULL,
  `user_telefono_convencional` varchar(100) DEFAULT NULL,
  `user_email_personal` varchar(100) DEFAULT NULL,
  `user_email_institucional` varchar(100) DEFAULT NULL,
  `user_relacion_laboral` int DEFAULT NULL,
  `user_distrito` varchar(100) DEFAULT NULL,
  `user_status` tinyint DEFAULT '1' COMMENT 'estado del registro (habilitado 1 / deshabilitado 0)',
  `user_jornada_laboral` int DEFAULT NULL,
  `user_categoria` int DEFAULT NULL,
  `user_grupo_etnico` int DEFAULT NULL,
  `user_nacionalidad_indigena` int DEFAULT NULL,
  `user_nivel_educacion` int DEFAULT NULL,
  `user_estado_usuario` tinyint DEFAULT '1' COMMENT 'Estado activo/inactivo del usuario',
  `user_fecha_nacimiento` timestamp NULL DEFAULT NULL,
  `user_titulo_senescyt` varchar(100) DEFAULT NULL,
  `user_especialidad_accion_personal` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user_requiere_cambio_contrasena` tinyint DEFAULT '1',
  `user_fecha_ingreso_magisterio` timestamp NULL DEFAULT NULL,
  `user_fecha_ingreso_institucion` timestamp NULL DEFAULT NULL,
  `user_actividad_laboral` int DEFAULT NULL,
  `user_nivel` int DEFAULT NULL,
  `user_activo` int DEFAULT NULL,
  `user_observacion` varchar(300) DEFAULT NULL,
  `user_sexo` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKsb8bbouer5wak8vyiiy4pf2bx` (`username`),
  KEY `user_estado_civil_FK` (`estado_civil`),
  KEY `user_relacion_laboral_FK` (`user_relacion_laboral`),
  KEY `user_nivel_educacion_FK_old` (`user_categoria`),
  KEY `user_grupo_etnico_FK` (`user_grupo_etnico`),
  KEY `user_grupo_etnico_otro_FK` (`user_nacionalidad_indigena`),
  KEY `user_nivel_educacion_FK` (`user_nivel_educacion`),
  KEY `user_jornada_laboral_FK` (`user_jornada_laboral`),
  KEY `user_actividad_laboral_FK` (`user_actividad_laboral`),
  KEY `user_nivel_FK` (`user_nivel`),
  KEY `user_activo_FK` (`user_activo`),
  KEY `user_sexo_FK` (`user_sexo`),
  CONSTRAINT `user_actividad_laboral_FK` FOREIGN KEY (`user_actividad_laboral`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `user_activo_FK` FOREIGN KEY (`user_activo`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `user_categoria_FK` FOREIGN KEY (`user_categoria`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `user_estado_civil_FK` FOREIGN KEY (`estado_civil`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `user_grupo_etnico_FK` FOREIGN KEY (`user_grupo_etnico`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `user_grupo_etnico_otro_FK` FOREIGN KEY (`user_nacionalidad_indigena`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `user_jornada_laboral_FK` FOREIGN KEY (`user_jornada_laboral`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `user_nivel_educacion_FK` FOREIGN KEY (`user_nivel_educacion`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `user_nivel_FK` FOREIGN KEY (`user_nivel`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `user_relacion_laboral_FK` FOREIGN KEY (`user_relacion_laboral`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `user_sexo_FK` FOREIGN KEY (`user_sexo`) REFERENCES `catalogo` (`cata_id`)
) ENGINE=InnoDB AUTO_INCREMENT=907 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Camil','ABC','$2a$10$BapjyQf30nKIqSCWEUf.1uvOJUGYqsUZk698ICwaJhUUs4/KWku6e','martinb1992','USER','Ecuador',3,'Venezuela','023952300','9987879','a@a.com','b@b.com',15,'Distrito C',NULL,11,22,33,40,27,1,'2002-06-13 05:00:00','aaaa','Accion Personal',1,'2024-06-01 05:00:00','2024-06-23 05:00:00',70,75,NULL,NULL,82),(4,'Alex aaa','Balarezo bbb','$2a$10$fZ6yfRqgmanoYB4tBOMWHOrqYk2z4M1XwzUcwjmp1GuLV07gxb1WS','1718139205','USER','Ecuador',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'Alex Martin vvvvv','Balarezo Leon','$2a$10$sTYS/JgDhzm.X7qa0pGFHekGojSg6g7j4aIPVopCLCqajJLB3rA3a','1708712664','USER','Ecuador',3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(53,'Alex','Balarezo Leon','$2a$10$7iwv1hAUyiFyq4M/evHOO.QcOYv39GHwD1jn8zGtsiN3Nt5P3MIOi','1708712665','USER','Ecuador',4,'dddddddddddd','9000000009','9999999999','123@123','asd@asd',15,'distritoooooo',1,11,24,37,50,30,1,'2024-06-02 05:00:00','ttttt',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(102,'Alex','Balarezo Leon','$2a$10$bjidLaHP2RVloTWBSpFZZe6qqWnZtaXJU0/zJUEz0NQrNYVwvXffe','1708712666','USER','Ecuador',5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(152,'Isabel María','Leon Balarezo','$2a$10$C.6F1/yRewHreJKu/2Fr/eqPsvGrBefCti2QE5R94TX23jrEYBTdW','1000000001','ADMIN','Ecuador',2,'Venezuela 1111','023952300','asdasd2','aaaadw@a.com','bbb@asdasdasdasd',13,'Distrito ABC 123',NULL,9,17,33,67,29,1,'1992-09-15 05:00:00','epn','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus varius dui quis faucibus ullamcorper. Donec erat odio, placerat quis lectus ac, sodales suscipit elit. Curabitur a mauris quis magna placerat molestie quis ut lorem. Fusce nec mauris in dui lobortis sagittis sit amet eget mauris. Etiam commodo sagittis odio a pretium. Quisque condimentum fringilla felis eu eleifend. Morbi volutpat, mi a vehicula condimentum, massa lacus porttitor velit, et rutrum felis risus vitae turpis. Mauris ut congue enim.',1,'1992-09-01 05:00:00','1999-09-30 05:00:00',71,79,NULL,NULL,83),(202,'Alex 10011','Balarezo 100','$2a$10$wmHxljX7sJ4Pzuj4fe5N6uKFp/TA8PVdhSH/m1y5ixCyt6HOikYZ2','1000000002','USER','España',7,'3011 maingate lane, celebretion, fl','023952300','113123','asasda@asdaw','aaaaaa@ddd2qa2',14,'111',0,9,21,35,42,28,0,'1992-02-11 05:00:00','123123123',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(602,'a','a',NULL,'123',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(652,'asd','asd','$2a$10$RH8n3kq87kgxtITbDrK1UOqsSSP/NLX26n2YntIr1G5cYmIdQrPUO','12345','USER',NULL,NULL,NULL,NULL,NULL,'asd@asd',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(702,'a','a','$2a$10$3TuWFQipkAXfikTb/3u6vO7sixSCLjz43VHhRbsIO1wyx1MIc0GLS','12','USER',NULL,NULL,NULL,NULL,NULL,'12@12',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_seq`
--

DROP TABLE IF EXISTS `user_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_seq`
--

LOCK TABLES `user_seq` WRITE;
/*!40000 ALTER TABLE `user_seq` DISABLE KEYS */;
INSERT INTO `user_seq` VALUES (1001);
/*!40000 ALTER TABLE `user_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'uetemm'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-27 22:19:06
