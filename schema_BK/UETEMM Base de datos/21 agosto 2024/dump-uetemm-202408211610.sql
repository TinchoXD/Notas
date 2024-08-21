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
  `cata_status` int DEFAULT NULL,
  PRIMARY KEY (`cata_id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Calatolos del sistema';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo`
--

LOCK TABLES `catalogo` WRITE;
/*!40000 ALTER TABLE `catalogo` DISABLE KEYS */;
INSERT INTO `catalogo` VALUES (1,'Estado Civil',NULL,'2024-05-19 05:00:00','admin','catalogo contendor de estado civil',1),(2,'Soltero/a',1,'2024-05-19 05:00:00','admin','estado civil - Soltero/a',1),(3,'Casado/a',1,'2024-05-19 05:00:00','admin','estado civil - Casado/a',1),(4,'Unión libre o Unión de hecho',1,'2024-05-19 05:00:00','admin','estado civil - Unión libre o unión de hecho\r\n',1),(5,'Separado',1,'2024-05-19 05:00:00','admin','estado civil - Separado',0),(6,'Divorciado',1,'2024-05-19 05:00:00','admin','estado civil - Divorciado',1),(7,'Viudo',1,'2024-05-19 05:00:00','admin','estado civil - Viudo',1),(8,'Jornada Laboral',NULL,'2024-05-19 05:00:00','admin','catalogo Jornada Laboral',1),(9,'Matutina',8,'2024-05-19 05:00:00','admin','Jornada Matutina',1),(10,'Vespertina',8,'2024-05-19 05:00:00','admin','Jornada Vespertina',1),(11,'Nocturna',8,'2024-05-19 05:00:00','admin','Jornada Nocturna',1),(12,'Relación Laboral',NULL,'2024-05-19 05:00:00','admin','catálogo Relación Laboral',1),(13,'Nombramiento Definitivo',12,'2024-05-19 05:00:00','admin','Nombramiento Definitivo',1),(14,'Nombramiento Provisional',12,'2024-05-19 05:00:00','admin','Nombramiento Provisional',1),(15,'Contrato',12,'2024-05-19 05:00:00','admin','Contrato',1),(16,'Categoría',NULL,'2024-05-19 05:00:00','admin','catálogo Contrato',1),(17,'Categoría A',16,'2024-05-19 05:00:00','admin','Categoría A',1),(18,'Categoría B',16,'2024-05-19 05:00:00','admin','Categoría B',1),(19,'Categoría C',16,'2024-05-19 05:00:00','admin','Categoría C',1),(20,'Categoría D',16,'2024-05-19 05:00:00','admin','Categoría D',1),(21,'Categoría E',16,'2024-05-19 05:00:00','admin','Categoría E',1),(22,'Categoría F',16,'2024-05-19 05:00:00','admin','Categoría F',1),(23,'Categoría G',16,'2024-05-19 05:00:00','admin','Categoría G',1),(24,'Contrato',16,'2024-05-19 05:00:00','admin','Contrato',1),(25,'Nivel de Educación',NULL,'2024-05-19 05:00:00','admin','catálogo Nivel de Educación',1),(26,'Secundaria',25,'2024-05-19 05:00:00','admin','Secundaria',1),(27,'Tercer Nivel',25,'2024-05-19 05:00:00','admin','Tercer Nivel',1),(28,'Cuarto Nivel',25,'2024-05-19 05:00:00','admin','Cuarto Nivel',1),(29,'Doctorado',25,'2024-05-19 05:00:00','admin','Doctorado',1),(30,'PhD.',25,'2024-05-19 05:00:00','admin','PhD.',1),(31,'Grupo étnico',NULL,'2024-05-19 05:00:00','admin','catálogo Grupo étnico',1),(33,'Mestizo',31,'2024-05-19 05:00:00','admin','grupo étnico Mestizo',1),(34,'Indígena',31,'2024-05-19 05:00:00','admin','grupo étnico Indígena',1),(35,'Montubio',31,'2024-05-19 05:00:00','admin','grupo étnico Montubio',1),(36,'Afro-Ecuatoriano',31,'2024-05-19 05:00:00','admin','grupo étnico Afro-Ecuatoriano',1),(37,'Blanco',31,'2024-05-19 05:00:00','admin','grupo étnico Blanco',1),(38,'Otro',31,'2024-05-19 05:00:00','admin','grupo étnico Otro',1),(39,'Grupo étnico otro',NULL,'2024-05-19 05:00:00','admin','catálogo Grupo étnico específico',1),(40,'Awa',39,'2024-05-19 05:00:00','admin','Awa',1),(41,'Chachi',39,'2024-05-19 05:00:00','admin','Chachi',1),(42,'Epera',39,'2024-05-19 05:00:00','admin','Epera',1),(43,'Tsa´chila',39,'2024-05-19 05:00:00','admin','Tsa´chila',1),(44,'Manta Huancavilca',39,'2024-05-19 05:00:00','admin','Manta Huancavilca',1),(45,'Karanki',39,'2024-05-19 05:00:00','admin','Karanki',1),(46,'Natabulea',39,'2024-05-19 05:00:00','admin','Natabulea',1),(47,'Otavalo',39,'2024-05-19 05:00:00','admin','Otavalo',1),(48,'Kayambi',39,'2024-05-19 05:00:00','admin','Kayambi',1),(49,'Kitu Kara',39,'2024-05-19 05:00:00','admin','Kitu Kara',1),(50,'Pamzaleo',39,'2024-05-19 05:00:00','admin','Pamzaleo',1),(51,'Chibuleo',39,'2024-05-19 05:00:00','admin','Chibuleo',1),(52,'Salasaka',39,'2024-05-19 05:00:00','admin','Salasaka',1),(53,'Kisapincha',39,'2024-05-19 05:00:00','admin','Kisapincha',1),(54,'Kichua Sierra',39,'2024-05-19 05:00:00','admin','Kichua Sierra',1),(55,'Waranka',39,'2024-05-19 05:00:00','admin','Waranka',1),(56,'Puruhá',39,'2024-05-19 05:00:00','admin','Puruhá',1),(57,'Kañari',39,'2024-05-19 05:00:00','admin','Kañari',1),(58,'Saraguro',39,'2024-05-19 05:00:00','admin','Saraguro',1),(59,'A´i Cofan',39,'2024-05-19 05:00:00','admin','A´i Cofan',1),(60,'Secoya',39,'2024-05-19 05:00:00','admin','Secoya',1),(61,'Siona',39,'2024-05-19 05:00:00','admin','Siona',1),(62,'Huaorani',39,'2024-05-19 05:00:00','admin','Huaorani',1),(63,'Shiwiar',39,'2024-05-19 05:00:00','admin','Shiwiar',1),(64,'Zápara',39,'2024-05-19 05:00:00','admin','Zápara',1),(65,'Achuar',39,'2024-05-19 05:00:00','admin','Achuar',1),(66,'Shuar',39,'2024-05-19 05:00:00','admin','Shuar',1),(67,'Kichwa Amazonía',39,'2024-05-19 05:00:00','admin','Kichwa Amazonía',1),(68,'Actividad Laboral',NULL,'2024-05-19 05:00:00','admin','catálogo Actividad Laboral',1),(69,'Docente',68,'2024-05-19 05:00:00','admin','Docente',1),(70,'DECE',68,'2024-05-19 05:00:00','admin','DECE',1),(71,'Autoridad',68,'2024-05-19 05:00:00','admin','Autoridad',1),(72,'Nivel',NULL,'2024-05-19 05:00:00','admin','catálogo Nivel Usuario',1),(73,'Preparatoria',72,'2024-05-19 05:00:00','admin','Preparatoria',1),(74,'Elemental',72,'2024-05-19 05:00:00','admin','Elemental',1),(75,'Media',72,'2024-05-19 05:00:00','admin','Media',1),(76,'Superior',72,'2024-05-19 05:00:00','admin','Superior',1),(77,'Bachillerato',72,'2024-05-19 05:00:00','admin','Bachillerato',1),(78,'PCEI no Intensivo',72,'2024-05-19 05:00:00','admin','PCEI no Intensivo',1),(79,'PCEI Intensivo',72,'2024-05-19 05:00:00','admin','PCEI Intensivo',1),(80,'Sexo',NULL,'2024-05-19 05:00:00','admin','Catálogo Sexo',1),(81,'Masculino',80,'2024-05-19 05:00:00','admin','Masculino',1),(82,'Femenino',80,'2024-05-19 05:00:00','admin','Femenino',1),(83,'Otro',80,'2024-05-19 05:00:00','admin','otro',1),(84,'Activo',NULL,'2024-05-19 05:00:00','admin','Catálogo Activo',1),(85,'Sí',84,'2024-05-19 05:00:00','admin','Sí',1),(86,'No, Jubilado',84,'2024-05-19 05:00:00','admin','No, Jubilado',1),(87,'Grados',NULL,'2024-05-19 05:00:00','admin','Catalogo Grados',1),(88,'1ro',87,'2024-05-19 05:00:00','admin','primer grado',1),(89,'2do',87,'2024-05-19 05:00:00','admin','segundo grado',1),(90,'3ro',87,'2024-05-19 05:00:00','admin','tercer grado',1),(91,'4to',87,'2024-05-19 05:00:00','admin','cuarto grado',1),(92,'5to',87,'2024-05-19 05:00:00','admin','quinto grado',1),(93,'6to',87,'2024-05-19 05:00:00','admin','sexto grado',1),(94,'7mo',87,'2024-05-19 05:00:00','admin','séptimo grado',1),(95,'8vo',87,'2024-05-19 05:00:00','admin','octavo grado',1),(96,'9no',87,'2024-05-19 05:00:00','admin','noveno grado',1),(97,'10mo',87,'2024-05-19 05:00:00','admin','décimo grado',1),(98,'Subnivel Asignatura',NULL,'2024-05-19 05:00:00','admin','Catálogo Subnivel Asignatura',1),(99,'Elemental',98,'2024-05-19 05:00:00','admin','Subnivel Elemental',1),(100,'Media',98,'2024-05-19 05:00:00','admin','Subnivel Media',1),(101,'Superior',98,'2024-05-19 05:00:00','admin','Subnivel Superior',1),(102,'Contabilidad',98,'2024-05-19 05:00:00','admin','Subnivel Bachillerato Contabilidad',1),(103,'Paralelo',NULL,'2024-05-19 05:00:00','admin','Catálogo Paralelo',1),(104,'A',103,'2024-05-19 05:00:00','admin','Paralelo A',1),(105,'B',103,'2024-05-19 05:00:00','admin','Paralelo B',1),(106,'C',103,'2024-05-19 05:00:00','admin','Paralelo C',1),(107,'D',103,'2024-05-19 05:00:00','admin','Paralelo D',1),(108,'E',103,'2024-05-19 05:00:00','admin','Paralelo E',1),(109,'F',103,'2024-05-19 05:00:00','admin','Paralelo F',1),(110,'G',103,'2024-05-19 05:00:00','admin','Paralelo G',1),(111,'H',103,'2024-05-19 05:00:00','admin','Paralelo G',1),(112,'I',103,'2024-05-19 05:00:00','admin','Paralelo I',1),(113,'Asignatura',NULL,'2024-05-19 05:00:00','admin','Catálogo Asignatura',1),(114,'Inglés',113,'2024-05-19 05:00:00','admin','Asignatura Inglés',1),(115,'Matemáticas',113,'2024-05-19 05:00:00','admin','Asignatura Matemáticas',1),(116,'Computación',113,'2024-05-19 05:00:00','admin','Asignatura Computación',1),(117,'Ciencias Naturales',113,'2024-05-19 05:00:00','admin','Asignatura Ciencias Naturales',0),(118,'Jornada',NULL,'2024-05-19 05:00:00','admin','Catálogo Jornada',1),(119,'Matutina',118,'2024-05-19 05:00:00','admin','Jornada Matutina',1),(120,'Vespertina',118,'2024-05-19 05:00:00','admin','Jornada Vespertina',1),(121,'Nocturna',118,'2024-05-19 05:00:00','admin','Jornada Nocturna',1),(122,'Nivel Asignatura',NULL,'2024-05-19 05:00:00','admin','Catálogo Nivel Asignatura',1),(123,'Educación General Básica',122,'2024-05-19 05:00:00','admin','Nivel Educación General Básica',1),(124,'Bachillerato Técnico',122,'2024-05-19 05:00:00','admin','Nivel Bachillerato',1),(125,'Educación Física',113,NULL,NULL,NULL,1),(126,'Sociales',113,NULL,NULL,NULL,1),(127,'Álgebra',113,NULL,NULL,NULL,1),(128,'Ventas e Información Turística',98,'2024-05-19 05:00:00','admin','Subnivel Bachillerato Ventas e Información Turística',1),(129,'Servicios Hoteleros',98,'2024-05-19 05:00:00','admin','Subnivel Bachillerato Servicios Hoteleros',1),(130,'Mecanizado y Construcciones Metálicas',98,'2024-05-19 05:00:00','admin','Subnivel Bachillerato Mecanizado y Construcciones Metálicas',1);
/*!40000 ALTER TABLE `catalogo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_seq`
--

DROP TABLE IF EXISTS `catalogo_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catalogo_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_seq`
--

LOCK TABLES `catalogo_seq` WRITE;
/*!40000 ALTER TABLE `catalogo_seq` DISABLE KEYS */;
INSERT INTO `catalogo_seq` VALUES (201),(201);
/*!40000 ALTER TABLE `catalogo_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curso` (
  `curs_id` int NOT NULL AUTO_INCREMENT,
  `curs_grado` int DEFAULT NULL,
  `curs_paralelo` int DEFAULT NULL,
  `curs_jornada` int DEFAULT NULL,
  `curs_descripcion` varchar(100) DEFAULT NULL,
  `curs_status` int DEFAULT NULL,
  `curs_nivel` int DEFAULT NULL,
  `curs_subnivel` int DEFAULT NULL,
  `user_id` int DEFAULT NULL COMMENT 'id correspondiente al usuario (profesor)',
  `curs_fecha_creacion` timestamp NULL DEFAULT NULL,
  `curs_fecha_modificacion` timestamp NULL DEFAULT NULL,
  `curs_usuario_creacion` varchar(50) DEFAULT NULL,
  `curs_usuario_modificacion` varchar(50) DEFAULT NULL,
  `curs_codigo` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`curs_id`),
  KEY `curs_grado_FK` (`curs_grado`),
  KEY `curs_jornada_FK` (`curs_jornada`),
  KEY `curs_nivel_FK` (`curs_nivel`),
  KEY `curs_paralelo_FK` (`curs_paralelo`),
  KEY `curs_subnivel_FK` (`curs_subnivel`),
  KEY `curs_user_FK` (`user_id`),
  CONSTRAINT `curs_grado_FK` FOREIGN KEY (`curs_grado`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `curs_jornada_FK` FOREIGN KEY (`curs_jornada`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `curs_nivel_FK` FOREIGN KEY (`curs_nivel`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `curs_paralelo_FK` FOREIGN KEY (`curs_paralelo`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `curs_subnivel_FK` FOREIGN KEY (`curs_subnivel`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `curs_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1803 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (1802,89,104,119,'Curso de prueba',1,123,99,4,NULL,NULL,NULL,NULL,'EGBELE02AM');
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso_profesor`
--

DROP TABLE IF EXISTS `curso_profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curso_profesor` (
  `cupr_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL COMMENT 'id del usuario',
  `curs_id` int DEFAULT NULL COMMENT 'id del curso',
  `cupr_descripcion` varchar(100) DEFAULT NULL,
  `cupr_fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `cupr_fecha_modificacion` timestamp NULL DEFAULT NULL,
  `cupr_usuario_creacion` varchar(100) DEFAULT 'admin',
  `cupr_usuario_modificacion` varchar(100) DEFAULT NULL,
  `cupr_status` int DEFAULT '1',
  `asig_id` int DEFAULT NULL COMMENT 'id del catalogo Asignatura',
  PRIMARY KEY (`cupr_id`),
  KEY `cupr_user_FK` (`user_id`),
  KEY `cupr_curso_FK` (`curs_id`),
  KEY `cupr_cata_asignatura_FK` (`asig_id`),
  CONSTRAINT `cupr_cata_asignatura_FK` FOREIGN KEY (`asig_id`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `cupr_curso_FK` FOREIGN KEY (`curs_id`) REFERENCES `curso` (`curs_id`),
  CONSTRAINT `cupr_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=253 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso_profesor`
--

LOCK TABLES `curso_profesor` WRITE;
/*!40000 ALTER TABLE `curso_profesor` DISABLE KEYS */;
INSERT INTO `curso_profesor` VALUES (252,1,1802,'null','2024-08-21 19:35:16',NULL,'admin',NULL,1,127);
/*!40000 ALTER TABLE `curso_profesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso_profesor_seq`
--

DROP TABLE IF EXISTS `curso_profesor_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curso_profesor_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso_profesor_seq`
--

LOCK TABLES `curso_profesor_seq` WRITE;
/*!40000 ALTER TABLE `curso_profesor_seq` DISABLE KEYS */;
INSERT INTO `curso_profesor_seq` VALUES (351);
/*!40000 ALTER TABLE `curso_profesor_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso_seq`
--

DROP TABLE IF EXISTS `curso_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curso_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso_seq`
--

LOCK TABLES `curso_seq` WRITE;
/*!40000 ALTER TABLE `curso_seq` DISABLE KEYS */;
INSERT INTO `curso_seq` VALUES (1901),(1901);
/*!40000 ALTER TABLE `curso_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiante`
--

DROP TABLE IF EXISTS `estudiante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiante` (
  `estu_id` int NOT NULL AUTO_INCREMENT COMMENT 'pk',
  `estu_nombres` varchar(100) DEFAULT NULL,
  `estu_apellidos` varchar(100) DEFAULT NULL,
  `estu_cedula` varchar(20) DEFAULT NULL,
  `curso_id` int DEFAULT NULL,
  `estu_grupo_etnico` int DEFAULT NULL,
  `estu_sexo` int DEFAULT NULL,
  `estu_direccion_domicilio` varchar(100) DEFAULT NULL,
  `estu_telefono_domicilio` varchar(15) DEFAULT NULL,
  `estu_telefono_celular_madre` varchar(15) DEFAULT NULL,
  `estu_telefono_celular_padre` varchar(15) DEFAULT NULL,
  `estu_fecha_nacimiento` timestamp NULL DEFAULT NULL,
  `estu_lugar_nacimiento` varchar(100) DEFAULT NULL,
  `estu_madre_nombres` varchar(100) DEFAULT NULL,
  `estu_madre_apellidos` varchar(100) DEFAULT NULL,
  `estu_madre_cedula` varchar(15) DEFAULT NULL,
  `estu_madre_estado_civil` int DEFAULT NULL,
  `estu_madre_nivel_instruccion` int DEFAULT NULL,
  `estu_madre_direccion_domicilio` varchar(100) DEFAULT NULL,
  `estu_madre_telefono_domicilio` varchar(15) DEFAULT NULL,
  `estu_madre_lugar_trabajo` varchar(100) DEFAULT NULL,
  `estu_madre_telefono_trabajo` varchar(15) DEFAULT NULL,
  `estu_madre_correo` varchar(100) DEFAULT NULL,
  `estu_madre_fecha_nacimiento` timestamp NULL DEFAULT NULL,
  `estu_madre_ocupacion` varchar(100) DEFAULT NULL,
  `estu_padre_nombres` varchar(100) DEFAULT NULL,
  `estu_padre_apellidos` varchar(100) DEFAULT NULL,
  `estu_padre_cedula` varchar(15) DEFAULT NULL,
  `estu_padre_estado_civil` int DEFAULT NULL,
  `estu_padre_nivel_instruccion` int DEFAULT NULL,
  `estu_padre_direccion_domicilio` varchar(100) DEFAULT NULL,
  `estu_padre_telefono_domicilio` varchar(15) DEFAULT NULL,
  `estu_padre_lugar_trabajo` varchar(100) DEFAULT NULL,
  `estu_padre_telefono_trabajo` varchar(15) DEFAULT NULL,
  `estu_padre_correo` varchar(100) DEFAULT NULL,
  `estu_padre_fecha_nacimiento` timestamp NULL DEFAULT NULL,
  `estu_padre_ocupacion` varchar(100) DEFAULT NULL,
  `estu_representante_nombres` varchar(100) DEFAULT NULL,
  `estu_representante_apellidos` varchar(100) DEFAULT NULL,
  `estu_representante_cedula` varchar(15) DEFAULT NULL,
  `estu_representante_estado_civil` int DEFAULT NULL,
  `estu_representante_nivel_instruccion` int DEFAULT NULL,
  `estu_representante_direccion_domicilio` varchar(100) DEFAULT NULL,
  `estu_representante_telefono_domicilio` varchar(15) DEFAULT NULL,
  `estu_representante_lugar_trabajo` varchar(100) DEFAULT NULL,
  `estu_representante_telefono_trabajo` varchar(15) DEFAULT NULL,
  `estu_representante_correo` varchar(100) DEFAULT NULL,
  `estu_representante_fecha_nacimiento` timestamp NULL DEFAULT NULL,
  `estu_representante_ocupacion` varchar(100) DEFAULT NULL,
  `estu_representante_parentesco` varchar(100) DEFAULT NULL,
  `estu_representante_telefono_celular` varchar(20) DEFAULT NULL,
  `estu_dato_familiar_union_padres` varchar(100) DEFAULT NULL,
  `estu_dato_familiar_numero_hijos` int DEFAULT NULL,
  `estu_dato_familiar_numero_hijos_varones` int DEFAULT NULL,
  `estu_dato_familiar_numero_hijos_mujeres` int DEFAULT NULL,
  `estu_dato_familiar_puesto_entre_hermanos` int DEFAULT NULL,
  `estu_dato_familiar_personas_viven_con_estudiante` varchar(200) DEFAULT NULL,
  `estu_dato_familiar_familiares_discapacidad` tinyint(1) DEFAULT NULL,
  `estu_dato_familiar_tipo_vivienda` varchar(100) DEFAULT NULL,
  `estu_antecedente_madre_dificultad_embarazo` tinyint(1) DEFAULT NULL,
  `estu_antecedente_madre_dificultad_embarazo_descripcion` varchar(200) DEFAULT NULL,
  `estu_antecedente_madre_dificultad_parto` tinyint(1) DEFAULT NULL,
  `estu_antecedente_madre_dificultad_parto_descripcion` varchar(200) DEFAULT NULL,
  `estu_antecedente_estudiante_datos_relevantes_ninez` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `estu_antecedente_estudiante_historia_escolar` varchar(500) DEFAULT NULL,
  `estu_antecedente_estudiante_nececidad_educativa_especial` tinyint(1) DEFAULT NULL,
  `estu_antecedente_estudiante_numero_carne_discapacidad` varchar(50) DEFAULT NULL,
  `estu_antecedente_estudiante_porcentaje_discapacidad` int DEFAULT NULL,
  `estu_antecedente_estudiante_presenta_nee_institucion` tinyint(1) DEFAULT NULL,
  `estu_antecedente_estudiante_datos_relevantes` varchar(500) DEFAULT NULL,
  `estu_antecedente_estudiante_toma_medicamento` tinyint DEFAULT NULL,
  `estu_antecedente_estudiante_medicamento_descripcion` varchar(200) DEFAULT NULL,
  `estu_antecedente_estudiante_medicamento_razon` varchar(200) DEFAULT NULL,
  `estu_seguimiento` varchar(8000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `estu_fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `estu_fecha_modificacion` timestamp NULL DEFAULT NULL,
  `estu_user_creacion` varchar(100) DEFAULT NULL,
  `estu_user_modificacion` varchar(100) DEFAULT NULL,
  `estu_status` tinyint DEFAULT '1',
  `estu_dato_familiar_familiares_discapacidad_descripcion` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `estu_dato_familiar_servicios_basicos` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `estu_antecedente_estudiante_repite_anios` tinyint DEFAULT NULL,
  `estu_antecedente_estudiante_anios_repetidos` varchar(100) DEFAULT NULL,
  `estu_dato_familiar_tipo_vivienda_otro` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`estu_id`),
  KEY `estudiante_curso_FK` (`curso_id`),
  KEY `estudiante_grupo_etnico_FK` (`estu_grupo_etnico`),
  KEY `estudiante_sexo_FK` (`estu_sexo`),
  KEY `estudiante_madre_estado_civil_FK` (`estu_madre_estado_civil`),
  KEY `estudiante_madre_nivel_instruccion_FK` (`estu_madre_nivel_instruccion`),
  KEY `estudiante_padre_estado_civil_FK` (`estu_padre_estado_civil`),
  KEY `estudiante_padre_nivel_instruccion_FK` (`estu_padre_nivel_instruccion`),
  KEY `estudiante_representante_estado_civil_FK` (`estu_representante_estado_civil`),
  KEY `estudiante_representante_nivel_instruccion_FK` (`estu_representante_nivel_instruccion`),
  CONSTRAINT `estudiante_curso_FK` FOREIGN KEY (`curso_id`) REFERENCES `curso` (`curs_id`),
  CONSTRAINT `estudiante_grupo_etnico_FK` FOREIGN KEY (`estu_grupo_etnico`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `estudiante_madre_estado_civil_FK` FOREIGN KEY (`estu_madre_estado_civil`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `estudiante_madre_nivel_instruccion_FK` FOREIGN KEY (`estu_madre_nivel_instruccion`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `estudiante_padre_estado_civil_FK` FOREIGN KEY (`estu_padre_estado_civil`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `estudiante_padre_nivel_instruccion_FK` FOREIGN KEY (`estu_padre_nivel_instruccion`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `estudiante_representante_estado_civil_FK` FOREIGN KEY (`estu_representante_estado_civil`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `estudiante_representante_nivel_instruccion_FK` FOREIGN KEY (`estu_representante_nivel_instruccion`) REFERENCES `catalogo` (`cata_id`),
  CONSTRAINT `estudiante_sexo_FK` FOREIGN KEY (`estu_sexo`) REFERENCES `catalogo` (`cata_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiante`
--

LOCK TABLES `estudiante` WRITE;
/*!40000 ALTER TABLE `estudiante` DISABLE KEYS */;
INSERT INTO `estudiante` VALUES (1,'Axl yuki 123','Gómez Erraez 123 ','123123',1802,34,82,'Mitad del Mundo 123','023432123','0987123','123123','2000-06-01 05:00:00','Quito 123','Tábata Mishell 123','Gómez Morocho 123 ','1813233445 123 ',7,30,'Condado Alto 123','123 AA','QTGC 123','02 5457364 123','tabi@gmail.com123','2029-06-05 05:00:00','Psicologa 123 ','Giovanni Germán','Garcia Palma','1234423456',2,27,'La Roldos','767219282','QTGC_2','','bello@bello.com','1985-06-01 05:00:00','Roba oxígeno','Giovanni Germán','Garcia Palma','1234423456',2,27,'La Roldos','767219282','QTGC_2','999999','bello@bello.com',NULL,'Roba oxígeno','PADRE','909090','separados',NULL,NULL,NULL,3,'sdfsdf',1,'arrendada',0,'',0,'','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer interdum tempor nibh id volutpat. Pellentesque convallis cursus erat non euismod. Donec id','Eque non interdum. Nunc a aliquam est, nec dignissim odio. Suspendisse sed massa metus. Vestibulum sit amet arcu purus. Nam libero ligula, blandit vel massa non, tempor ultricie',0,NULL,0,0,'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent non tempor nibh. Vivamus cursus id sem pulvinar porttitor.',1,'Donec commodo facilisis nulla quis malesuada. Vestibulum','sollicitudin, dui non placerat efficitur, justo dui vestibulum massa, ac dictum erat lacus ornare magna. Cras feugiat elit ut quam rhoncus','In ultricies est lectus. Mauris viverra interdum blandit. Aenean gravida ipsum at augue dapibus, nec dignissim lectus vulputate. Fusce lobortis leo sit amet tincidunt interdum. Sed rhoncus nunc tempor tempor accumsan. Nullam molestie tellus lorem, ac commodo dolor semper sit amet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus vel purus vitae justo vestibulum lobortis eu in quam. Mauris lacus ex, ultricies in tellus eget, tincidunt vulputate nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis luctus non ante maximus laoreet. Phasellus suscipit dui ac ligula consectetur, ornare sodales arcu gravida. Cras metus velit, viverra quis ante quis, maximus dictum augue. Integer tincidunt dui eu lectus volutpat, et tempor nisi dapibus. Vivamus at purus et tellus facilisis vulputate a id dui. Pellentesque hendrerit mi diam, feugiat congue felis sollicitudin ut.','2024-08-13 01:15:26',NULL,NULL,NULL,1,'AAAAAAAAA','luz_electrica,agua_potable,telefono,cable,celular',0,NULL,NULL),(2,'Axl yuki 123','Gómez Erraez 123 ','123123',1802,34,82,'Mitad del Mundo 123','02 3432 123','0987 123','123123','2000-06-01 05:00:00','Quito 123','Tábata Mishell','Gómez Morocho','1813233445',2,26,'Condado Alto','02 3254432','QTGC','02 5457364','tabi@gmail.com','1980-06-01 05:00:00','Psicologa','Giovanni Germán','Garcia Palma','1234423456',2,27,'La Roldos','767219282','QTGC_2','2354312344','bello@bello.com','1985-06-01 05:00:00','Roba oxígeno',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Juntos',3,2,1,1,'Padres y hermanos',0,'propia',1,'AAA',1,'BBB','7 a','7 b',1,'33333333',99,0,'7 c',1,'7 d','7 e','{\n    \"id\": 2,\n    \"nombres\": \"Axl yuki 123\",\n    \"apellidos\": \"Gómez Erraez 123 \",\n    \"cedula\": \"123123\",\n    \"curso\": {\n        \"id\": 123,\n        \"grado\": {\n            \"id\": 88,\n            \"nombre\": \"1ro\",\n            \"catalogoParent\": 87,\n            \"status\": 1\n        },\n        \"paralelo\": {\n            \"id\": 104,\n            \"nombre\": \"A\",\n            \"catalogoParent\": 103,\n            \"status\": 1\n        },\n        \"jornada\": {\n            \"id\": 119,\n            \"nombre\": \"Matutina\",\n            \"catalogoParent\": 118,\n            \"status\": 1\n        },\n        \"nivel\": {\n            \"id\": 124,\n            \"nombre\": \"Bachillerato\",\n            \"catalogoParent\": 122,\n            \"status\": 1\n        },\n        \"subnivel\": {\n            \"id\": 99,\n            \"nombre\": \"Elemental\",\n            \"catalogoParent\": 98,\n            \"status\": 1\n        },\n        \"user\": {\n            \"id\": 4,\n            \"username\": \"1718139205\",\n            \"lastname\": \"Balarezo\",\n            \"firstname\": \"Alex\",\n            \"user_sexo\": null,\n            \"pais\": \"Ecuador\",\n            \"password\": \"$2a$10$fZ6yfRqgmanoYB4tBOMWHOrqYk2z4M1XwzUcwjmp1GuLV07gxb1WS\",\n            \"role\": \"USER\",\n            \"estado_civil\": {\n                \"id\": 2,\n                \"nombre\": \"Soltero/a\",\n                \"catalogoParent\": 1,\n                \"status\": 1\n            },\n            \"user_direccion\": null,\n            \"user_telefono_celular\": null,\n            \"user_telefono_convencional\": null,\n            \"user_email_personal\": null,\n            \"user_email_institucional\": null,\n            \"user_distrito\": null,\n            \"user_relacion_laboral\": null,\n            \"user_jornada_laboral\": null,\n            \"user_nivel_educacion\": null,\n            \"user_categoria\": null,\n            \"user_grupo_etnico\": null,\n            \"user_nacionalidad_indigena\": null,\n            \"user_estado_usuario\": 1,\n            \"user_fecha_nacimiento\": null,\n            \"user_titulo_senescyt\": null,\n            \"user_especialidad_accion_personal\": null,\n            \"user_requiere_cambio_contrasena\": 1,\n            \"user_status\": 1,\n            \"user_actividad_laboral\": null,\n            \"user_nivel\": null,\n            \"user_activo\": null,\n            \"user_fecha_ingreso_magisterio\": null,\n            \"user_fecha_ingreso_institucion\": null,\n            \"user_observacion\": null,\n            \"enabled\": true,\n            \"authorities\": [\n                {\n                    \"authority\": \"USER\"\n                }\n            ],\n            \"credentialsNonExpired\": true,\n            \"accountNonExpired\": true,\n            \"accountNonLocked\": true\n        },\n        \"descripcion\": \"123\",\n        \"status\": 0\n    },\n    \"grupoEtnico\": {\n        \"id\": 34,\n        \"nombre\": \"Indígena\",\n        \"catalogoParent\": 31,\n        \"status\": 1\n    },\n    \"sexo\": {\n        \"id\": 82,\n        \"nombre\": \"Femenino\",\n        \"catalogoParent\": 80,\n        \"status\": 1\n    },\n    \"domicilio\": \"Mitad del Mundo 123\",\n    \"telefonoDomicilio\": \"02 3432 123\",\n    \"telefonoCelularMadre\": \"0987 123\",\n    \"telefonoCelularPadre\": \"123123\",\n    \"fechaNacimiento\": \"2000-06-01T05:00:00.000+00:00\",\n    \"lugarNacimiento\": \"Quito 123\",\n    \"madreNombres\": \"Tábata Mishell\",\n    \"madreApellidos\": \"Gómez Morocho\",\n    \"madreCedula\": \"1813233445\",\n    \"madreEstadoCivil\": {\n        \"id\": 2,\n        \"nombre\": \"Soltero/a\",\n        \"catalogoParent\": 1,\n        \"status\": 1\n    },\n    \"madreNivelInstruccion\": {\n        \"id\": 26,\n        \"nombre\": \"Secundaria\",\n        \"catalogoParent\": 25,\n        \"status\": 1\n    },\n    \"madreDireccionDomicilio\": \"Condado Alto\",\n    \"madreTelefonoDomicilio\": \"02 3254432\",\n    \"madreLugarTrabajo\": \"QTGC\",\n    \"madreTelefonoTrabajo\": \"02 5457364\",\n    \"madreCorreo\": \"tabi@gmail.com\",\n    \"madreFechaNacimiento\": \"1980-06-01T05:00:00.000+00:00\",\n    \"madreOcupacion\": \"Psicologa\",\n    \"padreNombres\": \"Giovanni Germán\",\n    \"padreApellidos\": \"Garcia Palma\",\n    \"padreCedula\": \"1234423456\",\n    \"padreEstadoCivil\": {\n        \"id\": 2,\n        \"nombre\": \"Soltero/a\",\n        \"catalogoParent\": 1,\n        \"status\": 1\n    },\n    \"padreNivelInstruccion\": {\n        \"id\": 27,\n        \"nombre\": \"Tercer Nivel\",\n        \"catalogoParent\": 25,\n        \"status\": 1\n    },\n    \"padreDireccionDomicilio\": \"La Roldos\",\n    \"padreTelefonoDomicilio\": \"767219282\",\n    \"padreLugarTrabajo\": \"QTGC_2\",\n    \"padreTelefonoTrabajo\": \"2354312344\",\n    \"padreCorreo\": \"bello@bello.com\",\n    \"padreFechaNacimiento\": \"1985-06-01T05:00:00.000+00:00\",\n    \"padreOcupacion\": \"Roba oxígeno\",\n    \"representanteNombres\": null,\n    \"representanteApellidos\": null,\n    \"representanteCedula\": null,\n    \"representanteEstadoCivil\": null,\n    \"representanteNivelInstruccion\": null,\n    \"representanteDireccionDomicilio\": null,\n    \"representanteTelefonoDomicilio\": null,\n    \"representanteLugarTrabajo\": null,\n    \"representanteTelefonoTrabajo\": null,\n    \"representanteCorreo\": null,\n    \"representanteFechaNacimiento\": null,\n    \"representanteOcupacion\": null,\n    \"representanteParentesco\": null,\n    \"representanteTelefonoCelular\": null,\n    \"familiaUnionPadres\": \"Juntos\",\n    \"familiaNumeroHijos\": 3,\n    \"familiaNumeroHijosVarones\": 2,\n    \"familiaNumeroHijosMujeres\": 1,\n    \"familiaNumeroPuestoEntreHermanos\": 1,\n    \"familiaDetallePersonsasVivenConEstudiante\": \"Padres y hermanos\",\n    \"familiaNumeroFamiliaresDiscapacidad\": 0,\n    \"familiaFamiliaresDiscapacidadDescripcion\": null,\n    \"familiaTipoVivienda\": \"propia\",\n    \"familiaTipoViviendaOtro\": \"\",\n    \"familiaServiciosBasicos\": \"luz_electrica,agua_potable,telefono\",\n    \"antecedentesMadreDificultadEmbarazo\": 1,\n    \"antecedentesMadreDificultadEmbarazoDescripcion\": \"AAA\",\n    \"antecedentesMadreDificultadParto\": 1,\n    \"antecedentesMadreDificultadPartoDescripcion\": \"BBB\",\n    \"antecedentesEstudianteDatosNinez\": \"7 a\",\n    \"antecedentesEstudianteHistoriaEscolar\": \"7 b\",\n    \"antecedentesEstudianteNecesidadEducativaEspecial\": 1,\n    \"antecedentesEstudianteNumeroCarne\": \"123\",\n    \"antecedentesEstudiantePorcentajeDiscapacidad\": 50,\n    \"antecedentesEstudiantePresentaNecesidadEducativaEspecialInstitucion\": 1,\n    \"antecedentesEstudianteDatosRelevantes\": \"7 c\",\n    \"antecedentesEstudianteTomaMedicamento\": 1,\n    \"antecedentesEstudianteMedicamentoDescripcion\": \"7 d\",\n    \"antecedentesEstudianteMedicamentoRazon\": \"7 e\",\n    \"antecedentesEstudianteRepiteAnios\": null,\n    \"antecedentesEstudianteAniosRepetidos\": \"7 f\",\n    \"seguimiento\": \"In ultricies est lectus. Mauris viverra interdum blandit. Aenean gravida ipsum at augue dapibus, nec dignissim lectus vulputate. Fusce lobortis leo sit amet tincidunt interdum. Sed rhoncus nunc tempor tempor accumsan. Nullam molestie tellus lorem, ac commodo dolor semper sit amet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus vel purus vitae justo vestibulum lobortis eu in quam. Mauris lacus ex, ultricies in tellus eget, tincidunt vulputate nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis luctus non ante maximus laoreet. Phasellus suscipit dui ac ligula consectetur, ornare sodales arcu gravida. Cras metus velit, viverra quis ante quis, maximus dictum augue. Integer tincidunt dui eu lectus volutpat, et tempor nisi dapibus. Vivamus at purus et tellus facilisis vulputate a id dui. Pellentesque hendrerit mi diam, feugiat congue felis sollicitudin ut.\"ecedentesEstudianteNumeroCarne\": \"123\",\n    \"antecedentesEstudiantePorcentajeDiscapacidad\": 50,\n    \"antecedentesEstudiantePresentaNecesidadEducativaEspecialInstitucion\": 1,\n    \"antecedentesEstudianteDatosRelevantes\": \"7 c\",\n    \"antecedentesEstudianteTomaMedicamento\": 1,\n    \"antecedentesEstudianteMedicamentoDescripcion\": \"7 d\",\n    \"antecedentesEstudianteMedicamentoRazon\": \"7 e\",\n    \"antecedentesEstudianteRepiteAnios\": null,\n    \"antecedentesEstudianteAniosRepetidos\": \"7 f\",\n    \"seguimiento\": \"In ultricies est lectus. Mauris viverra inter\n}','2024-08-13 01:15:26',NULL,NULL,NULL,1,NULL,'luz_electrica,agua_potable,telefono',1,'AAAAAAAAAAA',''),(3,'Gomez Alex','Acosta Perez','1834653245',1802,NULL,81,'Mitad del Mundo','02 3432262','098761235','098235567','2000-06-01 05:00:00','Quito','Tábata Mishell','Gómez Morocho','1813233445',2,26,'Condado Alto','02 3254432','QTGC','02 5457364','tabi@gmail.com','1980-06-01 05:00:00','Psicologa','Giovanni Germán','Garcia Palma','1234423456',2,27,'La Roldos','767219282','QTGC_2','2354312344','bello@bello.com','1985-06-01 05:00:00','Roba oxígeno',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Juntos',3,2,1,1,'Padres y hermanos',0,'PROPIA',0,'',0,NULL,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer interdum tempor nibh id volutpat. Pellentesque convallis cursus erat non euismod. Donec id','Eque non interdum. Nunc a aliquam est, nec dignissim odio. Suspendisse sed massa metus. Vestibulum sit amet arcu purus. Nam libero ligula, blandit vel massa non, tempor ultricie',0,NULL,0,0,'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent non tempor nibh. Vivamus cursus id sem pulvinar porttitor.',1,'Donec commodo facilisis nulla quis malesuada. Vestibulum','sollicitudin, dui non placerat efficitur, justo dui vestibulum massa, ac dictum erat lacus ornare magna. Cras feugiat elit ut quam rhoncus','In ultricies est lectus. Mauris viverra interdum blandit. Aenean gravida ipsum at augue dapibus, nec dignissim lectus vulputate. Fusce lobortis leo sit amet tincidunt interdum. Sed rhoncus nunc tempor tempor accumsan. Nullam molestie tellus lorem, ac commodo dolor semper sit amet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus vel purus vitae justo vestibulum lobortis eu in quam. Mauris lacus ex, ultricies in tellus eget, tincidunt vulputate nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis luctus non ante maximus laoreet. Phasellus suscipit dui ac ligula consectetur, ornare sodales arcu gravida. Cras metus velit, viverra quis ante quis, maximus dictum augue. Integer tincidunt dui eu lectus volutpat, et tempor nisi dapibus. Vivamus at purus et tellus facilisis vulputate a id dui. Pellentesque hendrerit mi diam, feugiat congue felis sollicitudin ut.','2024-08-13 01:15:26',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(4,'Juan Sebastian','Caceres Alulema','124534534',1802,NULL,81,'Mitad del Mundo','02 3432262','098761235','098235567','2000-06-01 05:00:00','Quito','Tábata Mishell','Gómez Morocho','1813233445',2,26,'Condado Alto','02 3254432','QTGC','02 5457364','tabi@gmail.com','1980-06-01 05:00:00','Psicologa','Giovanni Germán','Garcia Palma','1234423456',2,27,'La Roldos','767219282','QTGC_2','2354312344','bello@bello.com','1985-06-01 05:00:00','Roba oxígeno',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Juntos',3,2,1,1,'Padres y hermanos',0,'PROPIA',0,'',0,NULL,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer interdum tempor nibh id volutpat. Pellentesque convallis cursus erat non euismod. Donec id','Eque non interdum. Nunc a aliquam est, nec dignissim odio. Suspendisse sed massa metus. Vestibulum sit amet arcu purus. Nam libero ligula, blandit vel massa non, tempor ultricie',0,NULL,0,0,'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent non tempor nibh. Vivamus cursus id sem pulvinar porttitor.',1,'Donec commodo facilisis nulla quis malesuada. Vestibulum','sollicitudin, dui non placerat efficitur, justo dui vestibulum massa, ac dictum erat lacus ornare magna. Cras feugiat elit ut quam rhoncus','In ultricies est lectus. Mauris viverra interdum blandit. Aenean gravida ipsum at augue dapibus, nec dignissim lectus vulputate. Fusce lobortis leo sit amet tincidunt interdum. Sed rhoncus nunc tempor tempor accumsan. Nullam molestie tellus lorem, ac commodo dolor semper sit amet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus vel purus vitae justo vestibulum lobortis eu in quam. Mauris lacus ex, ultricies in tellus eget, tincidunt vulputate nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis luctus non ante maximus laoreet. Phasellus suscipit dui ac ligula consectetur, ornare sodales arcu gravida. Cras metus velit, viverra quis ante quis, maximus dictum augue. Integer tincidunt dui eu lectus volutpat, et tempor nisi dapibus. Vivamus at purus et tellus facilisis vulputate a id dui. Pellentesque hendrerit mi diam, feugiat congue felis sollicitudin ut.','2024-08-13 01:15:26',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL),(5,'Axl yuki 123','Gómez Erraez 123 ','123123',1802,34,82,'Mitad del Mundo 123','02 3432 123','0987 123','123123','2000-06-01 05:00:00','Quito 123',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-08-17 01:22:19',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `estudiante` ENABLE KEYS */;
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
  `user_status` int DEFAULT NULL,
  `user_jornada_laboral` int DEFAULT NULL,
  `user_categoria` int DEFAULT NULL,
  `user_grupo_etnico` int DEFAULT NULL,
  `user_nacionalidad_indigena` int DEFAULT NULL,
  `user_nivel_educacion` int DEFAULT NULL,
  `user_estado_usuario` int DEFAULT NULL,
  `user_fecha_nacimiento` timestamp NULL DEFAULT NULL,
  `user_titulo_senescyt` varchar(100) DEFAULT NULL,
  `user_especialidad_accion_personal` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user_requiere_cambio_contrasena` int DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=1003 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Cami','Cevallos','$2a$10$QCQKXv.YXZtWfUvNIukJeeiC9nKqXYKGZh7weP1IhV3UPmsspSIS6','9999999999','USER','Ecuador',3,'Venezuela','023952300','9987879','a@a.com','b@b.com',15,'Distrito C',NULL,11,22,33,40,27,1,'2002-06-13 05:00:00','aaaa','Accion Personal',1,'2024-06-01 05:00:00','2024-06-23 05:00:00',70,75,NULL,NULL,82),(4,'Alex','Balarezo','$2a$10$fZ6yfRqgmanoYB4tBOMWHOrqYk2z4M1XwzUcwjmp1GuLV07gxb1WS','1718139205','USER','Ecuador',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'Martin','Leon','$2a$10$sTYS/JgDhzm.X7qa0pGFHekGojSg6g7j4aIPVopCLCqajJLB3rA3a','1708712664','USER','Ecuador',3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(53,'David','Cuenca','$2a$10$inrhjqZbkJJWKyiCci/Xz.Oko7q95ZHI6ND1C3k5qtg8VnuY1zJTW','1708712665','USER','Ecuador',4,'dddddddddddd','9000000009','9999999999','123@123','asd@asd',15,'distritoooooo',1,11,24,37,50,30,0,'2024-06-02 05:00:00','ttttt',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(102,'Alex','Cevallos','$2a$10$bjidLaHP2RVloTWBSpFZZe6qqWnZtaXJU0/zJUEz0NQrNYVwvXffe','1708712666','USER','Ecuador',5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(152,'Isabel María','Gomez','$2a$10$C.6F1/yRewHreJKu/2Fr/eqPsvGrBefCti2QE5R94TX23jrEYBTdW','1000000001','ADMIN','Ecuador',2,'Venezuela 1111','023952300','asdasd2','aaaadw@a.com','bbb@asdasdasdasd',13,'Distrito ABC 123',NULL,9,17,33,67,29,1,'1992-09-15 05:00:00','epn','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus varius dui quis faucibus ullamcorper. Donec erat odio, placerat quis lectus ac, sodales suscipit elit. Curabitur a mauris quis magna placerat molestie quis ut lorem. Fusce nec mauris in dui lobortis sagittis sit amet eget mauris. Etiam commodo sagittis odio a pretium. Quisque condimentum fringilla felis eu eleifend. Morbi volutpat, mi a vehicula condimentum, massa lacus porttitor velit, et rutrum felis risus vitae turpis. Mauris ut congue enim.',1,'1992-09-01 05:00:00','1999-09-30 05:00:00',71,79,NULL,NULL,81),(202,'Raquel','Coronel','$2a$10$wmHxljX7sJ4Pzuj4fe5N6uKFp/TA8PVdhSH/m1y5ixCyt6HOikYZ2','1000000002','USER','España',7,'3011 maingate lane, celebretion, fl','023952300','113123','asasda@asdaw','aaaaaa@ddd2qa2',14,'111',0,9,21,35,42,28,1,'1992-02-11 05:00:00','123123123',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(952,'Jose','Guerra','$2a$10$.8mCcYzf1GpQ9PYD1Ap2ZetrrhQjNsxaHEPJZX/FvmkGLkeMoXbDK','1718139206','USER',NULL,NULL,NULL,NULL,NULL,'a@abc.com',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1002,'Jess','Erraez','$2a$10$ASLp7gMsLrpSf6.Edb9K4earrJTqN194bPpwfbSNm6e0hMvuOic/i','1000000003','ADMIN',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
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
INSERT INTO `user_seq` VALUES (1101),(1351),(1351);
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

-- Dump completed on 2024-08-21 16:10:06
