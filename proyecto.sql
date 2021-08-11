-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 11-08-2021 a las 19:38:16
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `rol` varchar(50) DEFAULT 'administrador',
  `pass` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`id`, `username`, `nombre`, `rol`, `pass`, `apellido`, `telefono`, `email`) VALUES
(1, 'luis.andres', 'Luis ', 'administrador', '123', 'Perez', '1312412312', 'asdasdjk@hotmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_element` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `rol` varchar(50) DEFAULT 'cliente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_element`, `username`, `pass`, `nombre`, `apellido`, `telefono`, `email`, `rol`) VALUES
(18, 'andres.toloza', '$2a$08$zMJ5fuJnetcdyb77K/yzYegFoCy5UJvzHKoqgUWCaql0Xvx.l01yW', 'Andres', 'Toloza', '3134668227', 'andrestolozaguzman@hotmail.com', 'cliente'),
(56, 'camilo.perez', '$2a$08$9Tm9FuTBqQYfcUGw0BLC/udvfN/hvvvs7DDFWSWGigR16MdRe/jGu', 'Andres', 'Toloza', '3134668227', 'andrestolozaguzman@hotmail.com', 'cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_facturas`
--

CREATE TABLE `detalle_facturas` (
  `id_facturas` int(11) NOT NULL,
  `id_clientes` int(11) DEFAULT NULL,
  `id_producto` int(255) DEFAULT NULL,
  `id_esencia` int(255) DEFAULT NULL,
  `id_presentacion` int(255) DEFAULT NULL,
  `direccion_entrega` varchar(255) DEFAULT 'recoger en tienda',
  `total` int(255) DEFAULT NULL,
  `Estado_pedido` text DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detalle_facturas`
--

INSERT INTO `detalle_facturas` (`id_facturas`, `id_clientes`, `id_producto`, `id_esencia`, `id_presentacion`, `direccion_entrega`, `total`, `Estado_pedido`) VALUES
(142, 18, 3, 1004, 103, 'Recoger en tienda', 27950, 'ACTIVO'),
(143, 18, 8, 1004, 103, 'Recoger en tienda', 29800, 'ACTIVO'),
(144, 56, 3, 1004, 103, 'Recoger en tienda', 27950, 'ACTIVO'),
(147, 18, 1, 1004, 101, 'Carrera 29c-199', 57200, 'ACTIVO'),
(148, 18, 13, 1002, 100, 'Recoger en tienda', 11800, 'ACTIVO'),
(149, 18, 3, 1002, 100, 'Recoger en tienda', 12650, 'ACTIVO'),
(153, 18, 2, 1002, 103, 'Rodeo', 39500, 'ACTIVO'),
(154, 18, 2, 1003, 100, 'Mi casa', 26900, 'ACTIVO'),
(155, 18, 5, 1001, 103, 'Medellin', 66400, 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `esencias`
--

CREATE TABLE `esencias` (
  `id` int(255) NOT NULL,
  `nombre_esencia` varchar(255) NOT NULL,
  `precio_esencia` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `esencias`
--

INSERT INTO `esencias` (`id`, `nombre_esencia`, `precio_esencia`) VALUES
(1001, 'Esencia de Hierbas', 2500),
(1002, 'Esencia de Manzana Dulce', 3000),
(1003, 'Esencia de Manzana Verde', 5400),
(1004, 'Esencia de Rosa Mosqueta', 3300),
(1005, 'Esencia de Papaya', 2800),
(1006, 'Esencia de Papaya', 4500),
(1007, 'caramelo', 6700);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presentaciones`
--

CREATE TABLE `presentaciones` (
  `id` int(255) NOT NULL,
  `tipo_presentacion` varchar(255) NOT NULL,
  `precio` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `presentaciones`
--

INSERT INTO `presentaciones` (`id`, `tipo_presentacion`, `precio`) VALUES
(100, 'Botella de 250 ml', 5000),
(101, 'Botella de 500 ml', 10000),
(102, 'Botella de 750 ml', 15000),
(103, 'Botella de 1L', 20000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `codigo_producto` int(11) NOT NULL,
  `nombre_producto` varchar(50) NOT NULL,
  `cantidad` int(255) NOT NULL,
  `valor_unidad` int(250) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`codigo_producto`, `nombre_producto`, `cantidad`, `valor_unidad`, `descripcion`) VALUES
(1, 'Menta', 30, 43900, 'Entre sus beneficios capilares se encuentra que reduce la perdida de cabello,genera frescura y ayuda a aliviar la picazon.'),
(2, 'Salvia', 30, 16500, 'Protege el color del cabello frente a la oxidacion y potencia el brillo.'),
(3, 'Aguacate', 10, 4650, 'Hidrata intensamente el cabello mientra fortalece la raiz y promueve la regeneracion capilar.'),
(4, 'Almendra dulce', 30, 11500, 'Promueve el crecimiento del pelo, repara el cabello seco y maltratado, reduce las puntas abiertas y protege de la luz solar.'),
(5, 'Romero', 30, 43900, 'Estimula la circulacion propiciando el crecimiento,fortalecimiento las raices evitando el cabello quebradizo.'),
(6, 'Algas marinas', 30, 4200, 'Hidrata,repara,aumenta el brillo, previene las puntas partidas, desenreda el cabello, suaviza el cabello, controla el frizz y deja el cabello sedoso.'),
(7, 'Castaño de indias', 30, 4200, 'Se usa para tratar problemas vasculares en el cabello ayudando al fortalecimiento del rigo sanguineo capilar.'),
(8, 'Argan', 30, 6500, 'Repara el daño del cabello, hidrata, reduce la sequedad y da brillo.'),
(9, 'Colageno', 30, 4700, 'Reduce puntas abiertas y sana cabellos quebradizos, aporta brillo y suavidad.'),
(10, 'Elastina', 30, 5500, 'Mantiene el cabello elastico para evitar que se rompan sus capas, ofrece resistencia y fuerza.'),
(11, 'Germen de trigo', 30, 5600, 'Reduce el frizz, hidrata y sella las fibras capilares.'),
(12, 'Vitamina E', 30, 7000, 'Oxigena la sangre y estimula la circulacion en la zona del cuero cabelludo favoreciendo el crecimiento.'),
(13, 'Henna', 30, 3800, 'Desinflama foliculos, aporta suavidad,brillo y fuerza al cabello, mejora el aspecto y la estructura del cabello.'),
(14, 'Coco', 30, 4500, 'Hidrata y nutre, aporta brillo y suavidad sin dejar el pelo graso, aporta fuerza al pelo.'),
(15, 'Aloe Vera', 30, 3400, 'Hidrata, ofrece brillo, por tener propiedades antibacterial es bueno para la caspa.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vendedor`
--

CREATE TABLE `vendedor` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `rol` varchar(50) DEFAULT 'vendedor',
  `pass` varchar(255) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono` int(250) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `vendedor`
--

INSERT INTO `vendedor` (`id`, `username`, `nombre`, `rol`, `pass`, `apellido`, `telefono`, `email`) VALUES
(1, 'edgar.andres', 'edgar andres', 'vendedor', '123', 'salazar', 1312412312, 'asdasdas@hotmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_element`);

--
-- Indices de la tabla `detalle_facturas`
--
ALTER TABLE `detalle_facturas`
  ADD PRIMARY KEY (`id_facturas`) USING BTREE,
  ADD KEY `id_clientes` (`id_clientes`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_esencia` (`id_esencia`),
  ADD KEY `detalle_facturas_ibfk_4` (`id_presentacion`);

--
-- Indices de la tabla `esencias`
--
ALTER TABLE `esencias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `presentaciones`
--
ALTER TABLE `presentaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`codigo_producto`);

--
-- Indices de la tabla `vendedor`
--
ALTER TABLE `vendedor`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_element` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT de la tabla `detalle_facturas`
--
ALTER TABLE `detalle_facturas`
  MODIFY `id_facturas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;

--
-- AUTO_INCREMENT de la tabla `esencias`
--
ALTER TABLE `esencias`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1011;

--
-- AUTO_INCREMENT de la tabla `presentaciones`
--
ALTER TABLE `presentaciones`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `codigo_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT de la tabla `vendedor`
--
ALTER TABLE `vendedor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_facturas`
--
ALTER TABLE `detalle_facturas`
  ADD CONSTRAINT `detalle_facturas_ibfk_1` FOREIGN KEY (`id_clientes`) REFERENCES `cliente` (`id_element`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_facturas_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`codigo_producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_facturas_ibfk_3` FOREIGN KEY (`id_esencia`) REFERENCES `esencias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_facturas_ibfk_4` FOREIGN KEY (`id_presentacion`) REFERENCES `presentaciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
