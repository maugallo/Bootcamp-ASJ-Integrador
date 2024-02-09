-- Bootcamp ASJ - Gallo Mauro

-- CREACIÓN DE BASE DE DATOS:
CREATE DATABASE Integrador;

----------------- CREACIÓN DE TABLAS -----------------
GO
USE Integrador;

CREATE TABLE vat_conditions
  (
     id        INT PRIMARY KEY IDENTITY (1, 1),
     condition VARCHAR(100) UNIQUE NOT NULL,
  ); 

CREATE TABLE countries
  (
     id      INT PRIMARY KEY IDENTITY (1, 1),
     country VARCHAR(100) UNIQUE NOT NULL,
  );

CREATE TABLE provinces
  (
     id         INT PRIMARY KEY IDENTITY (1, 1),
     country_id INT NOT NULL,
     province   VARCHAR(100) NOT NULL,
     FOREIGN KEY (country_id) REFERENCES countries (id),
  );

CREATE TABLE localities
  (
     id          INT PRIMARY KEY IDENTITY (1, 1),
     province_id INT NOT NULL,
     locality    VARCHAR(100) NOT NULL,
     FOREIGN KEY (province_id) REFERENCES provinces (id),
  );

CREATE TABLE addresses
  (
     id          INT PRIMARY KEY IDENTITY (1, 1),
     locality_id INT NOT NULL,
     street      VARCHAR(50) NOT NULL,
     num         VARCHAR(6) NOT NULL,
     zip_code    VARCHAR(6) NOT NULL,
     created_at  DATETIME,
     updated_at  DATETIME,
     FOREIGN KEY (locality_id) REFERENCES localities (id),
  );

CREATE TABLE sectors
  (
     id         INT PRIMARY KEY IDENTITY (1, 1),
     sector     VARCHAR(100) UNIQUE NOT NULL,
	 is_enabled   BIT NOT NULL,
     created_at DATETIME,
     updated_at DATETIME,
  );

CREATE TABLE providers
  (
     id           INT PRIMARY KEY IDENTITY (1, 1),
     sector_id    INT NOT NULL,
     vat_id       INT NOT NULL,
     address_id   INT NOT NULL,
     code         VARCHAR(10) UNIQUE NOT NULL,
     company_name VARCHAR(100) NOT NULL,
	 logo VARCHAR(500),
     website      VARCHAR(500),
     first_name         VARCHAR(40) NOT NULL,
     last_name      VARCHAR(40) NOT NULL,
     role         VARCHAR(100) NOT NULL,
     cuit         VARCHAR(13) UNIQUE NOT NULL,
     is_enabled   BIT NOT NULL,
     created_at   DATETIME,
     updated_at   DATETIME,
     FOREIGN KEY (sector_id) REFERENCES sectors (id),
     FOREIGN KEY (vat_id) REFERENCES vat_conditions (id),
     FOREIGN KEY (address_id) REFERENCES addresses (id),
  );

CREATE TABLE contacts
  (
     id          INT PRIMARY KEY IDENTITY (1, 1),
     provider_id INT NOT NULL,
     telephone   VARCHAR(15) NOT NULL,
     email       VARCHAR(50) NOT NULL,
     created_at  DATETIME,
     updated_at  DATETIME,
     FOREIGN KEY (provider_id) REFERENCES providers (id),
  );

CREATE TABLE categories
  (
     id         INT PRIMARY KEY IDENTITY (1, 1),
     category   VARCHAR(100) UNIQUE NOT NULL,
	 is_enabled   BIT NOT NULL,
     created_at DATETIME,
     updated_at DATETIME,
  );

CREATE TABLE products
  (
     id          INT PRIMARY KEY IDENTITY (1, 1),
     category_id INT NOT NULL,
     provider_id INT NOT NULL,
     sku         VARCHAR(20) UNIQUE NOT NULL,
     image       VARCHAR(500),
     title       VARCHAR(50) NOT NULL,
     price       DECIMAL NOT NULL,
     description VARCHAR(1000) NOT NULL,
     is_enabled  BIT NOT NULL,
     created_at  DATETIME,
     updated_at  DATETIME,
     FOREIGN KEY (category_id) REFERENCES categories (id),
     FOREIGN KEY (provider_id) REFERENCES providers (id),
  );

CREATE TABLE orders_status
  (
     id           INT PRIMARY KEY IDENTITY (1, 1),
     order_status VARCHAR(50) UNIQUE NOT NULL,
  );

CREATE TABLE purchase_orders
  (
     id             INT PRIMARY KEY IDENTITY (1, 1),
     status_id      INT NOT NULL,
     provider_id    INT NOT NULL,
     issue_date     DATE NOT NULL,
     delivery_date  DATE NOT NULL,
     reception_info VARCHAR(500) NOT NULL,
     total          DECIMAL NOT NULL,
     is_enabled     BIT NOT NULL,
     created_at     DATETIME,
     updated_at     DATETIME,
     FOREIGN KEY (status_id) REFERENCES orders_status (id),
     FOREIGN KEY (provider_id) REFERENCES providers (id),
  );

CREATE TABLE orders_details
  (
     id         INT PRIMARY KEY IDENTITY (1, 1),
     order_id   INT NOT NULL,
     product_id INT NOT NULL,
     quantity   INT NOT NULL,
     created_at DATETIME,
     updated_at DATETIME,
     FOREIGN KEY (order_id) REFERENCES purchase_orders (id),
     FOREIGN KEY (product_id) REFERENCES products (id),
  );

----------------- INSERCIÓN DE REGISTROS -----------------

INSERT INTO vat_conditions (condition)
VALUES
('IVA Responsable Inscripto'),
('IVA Responsable no Inscripto'),
('IVA no Responsable'),
('IVA Sujeto Exento'),
('Consumidor Final'),
('Responsable Monotributo'),
('Sujeto no Categorizado'),
('Proveedor del Exterior'),
('Pequeño Contribuyente Eventual'),
('Monotributista Social'),
('Pequeño Contribuyente Eventual Social')

INSERT INTO countries (country)
VALUES
('Argentina'),
('Uruguay'),
('Chile'),
('Colombia'),
('México')

INSERT INTO provinces (country_id, province)
VALUES
(1, 'Buenos Aires'),
(1, 'Córdoba'),
(1, 'Santa Fe'),
(1, 'Mendoza'),
(1, 'Tucumán'),
(1, 'Entre Ríos'),
(1, 'Salta'),
(1, 'Jujuy'),
(1, 'Corrientes'),
(1, 'La Pampa'),
(2, 'Montevideo'),
(2, 'Canelones'),
(2, 'Maldonado'),
(2, 'Rocha'),
(2, 'Paysandú'),
(2, 'Salto'),
(2, 'Colonia'),
(2, 'Rivera'),
(2, 'Tacuarembó'),
(2, 'Cerro Largo'),
(3, 'Región Metropolitana de Santiago'),
(3, 'Región de Valparaíso'),
(3, 'Región del Biobío'),
(3, 'Región de Antofagasta'),
(3, 'Región de la Araucanía'),
(3, 'Región de Los Lagos'),
(3, 'Región de Coquimbo'),
(3, 'Región de Tarapacá'),
(3, 'Región de O''Higgins'),
(3, 'Región de Magallanes y de la Antártica Chilena')

INSERT INTO localities(province_id, locality)
VALUES
(1, 'La Plata'),
(1, 'Tigre'),
(1, 'Bahía Blanca'),
(1, 'Tandil'),
(1, 'Olavarría'),
(2, 'Córdoba Capital'),
(2, 'Villa Carlos Paz'),
(2, 'Río Cuarto'),
(2, 'Villa María'),
(2, 'San Francisco'),
(3, 'Rosario'),
(3, 'Santa Fe Capital'),
(3, 'Rafaela'),
(3, 'Venado Tuerto'),
(3, 'Reconquista'),
(4, 'Mendoza Capital'),
(4, 'San Rafael'),
(4, 'Godoy Cruz'),
(4, 'Luján de Cuyo'),
(4, 'Maipú'),
(5, 'San Miguel de Tucumán'),
(5, 'Tafí del Valle'),
(5, 'Yerba Buena'),
(5, 'Concepción'),
(5, 'Monteros'),
(6, 'Paraná'),
(6, 'Concordia'),
(6, 'Gualeguaychú'),
(6, 'Concepción del Uruguay'),
(6, 'Victoria'),
(7, 'Salta Capital'),
(7, 'San Ramón de la Nueva Orán'),
(7, 'Tartagal'),
(7, 'Rosario de Lerma'),
(7, 'Metán'),
(8, 'San Salvador de Jujuy'),
(8, 'San Pedro de Jujuy'),
(8, 'Palpalá'),
(8, 'Perico'),
(8, 'Libertador General San Martín'),
(9, 'Corrientes Capital'),
(9, 'Goya'),
(9, 'Mercedes'),
(9, 'Curuzú Cuatiá'),
(9, 'Paso de los Libres'),
(10, 'Santa Rosa'),
(10, 'General Pico'),
(10, 'Toay'),
(10, 'General Acha'),
(10, 'Eduardo Castex'),
(11, 'Ciudad Vieja'),
(11, 'Pocitos'),
(11, 'Carrasco'),
(11, 'Punta Carretas'),
(11, 'Parque Rodó'),
(12, 'Las Piedras'),
(12, 'Ciudad de la Costa'),
(12, 'Canelones'),
(12, 'Pando'),
(12, 'Atlántida'),
(13, 'Maldonado'),
(13, 'Punta del Este'),
(13, 'Piriápolis'),
(13, 'San Carlos'),
(13, 'Pan de Azúcar'),
(14, 'Rocha'),
(14, 'Chuy'),
(14, 'La Paloma'),
(14, 'Castillos'),
(14, 'Lascano'),
(15, 'Paysandú'),
(15, 'Guichón'),
(15, 'Nuevo Paysandú'),
(15, 'Porvenir'),
(15, 'Tambores'),
(16, 'Salto'),
(16, 'Daymán'),
(16, 'Arapey'),
(16, 'Constitución'),
(16, 'Belén'),
(17, 'Colonia del Sacramento'),
(17, 'Carmelo'),
(17, 'Nueva Helvecia'),
(17, 'Tarariras'),
(17, 'Juan Lacaze'),
(18, 'Rivera'),
(18, 'Tranqueras'),
(18, 'Minas de Corrales'),
(18, 'Vichadero'),
(18, 'Santa Teresa'),
(19, 'Tacuarembó'),
(19, 'Paso de los Toros'),
(19, 'San Gregorio de Polanco'),
(19, 'Tambores'),
(19, 'Curtina'),
(20, 'Melo'),
(20, 'Río Branco'),
(20, 'Aceguá'),
(20, 'Fraile Muerto'),
(20, 'Tupambaé'),
(21, 'Santiago'),
(21, 'Providencia'),
(21, 'Las Condes'),
(21, 'Ñuñoa'),
(21, 'Vitacura'),
(22, 'Valparaíso'),
(22, 'Viña del Mar'),
(22, 'Quilpué'),
(22, 'Villa Alemana'),
(22, 'San Antonio'),
(23, 'Concepción'),
(23, 'Talcahuano'),
(23, 'Los Ángeles'),
(23, 'Chillán'),
(23, 'Coronel'),
(24, 'Antofagasta'),
(24, 'Calama'),
(24, 'Tocopilla'),
(24, 'Mejillones'),
(24, 'San Pedro de Atacama'),
(25, 'Temuco'),
(25, 'Villarrica'),
(25, 'Angol'),
(25, 'Pucón'),
(25, 'Victoria'),
(26, 'Puerto Montt'),
(26, 'Osorno'),
(26, 'Puerto Varas'),
(26, 'Castro'),
(26, 'Ancud'),
(27, 'La Serena'),
(27, 'Coquimbo'),
(27, 'Ovalle'),
(27, 'Illapel'),
(27, 'Vicuña'),
(28, 'Iquique'),
(28, 'Alto Hospicio'),
(28, 'Pozo Almonte'),
(28, 'Pica'),
(28, 'Huara'),
(29, 'Rancagua'),
(29, 'Machalí'),
(29, 'San Fernando'),
(29, 'Santa Cruz'),
(29, 'Peumo'),
(30, 'Punta Arenas'),
(30, 'Puerto Natales'),
(30, 'Porvenir'),
(30, 'Cerro Sombrero'),
(30, 'Primavera')

INSERT INTO addresses (locality_id, street, num, zip_code, created_at, updated_at)
VALUES
(2, 'San Martín', '406', '2490', GETDATE(), GETDATE()),
(7, 'Avenida de la Constitución', '1290', '1264', GETDATE(), GETDATE()),
(13, 'Paseo del Prado', '789', '1423', GETDATE(), GETDATE()),
(4, 'La Paz', '1011', '0957', GETDATE(), GETDATE()),
(17, 'Padre Fahy', '528', '2476', GETDATE(), GETDATE()),
(6, 'Gran Vía', '1314', '2742', GETDATE(), GETDATE()),
(21, 'Alcalá', '142', '2356', GETDATE(), GETDATE()),
(30, 'Serrano', '89', '1516', GETDATE(), GETDATE()),
(10, 'Goya', '300', '4512', GETDATE(), GETDATE()),
(25, 'Velázquez', '1718', '761', GETDATE(), GETDATE())

INSERT INTO sectors (sector, is_enabled, created_at, updated_at)
VALUES
('Tecnología', 1, GETDATE(), GETDATE()),
('Salud', 1, GETDATE(), GETDATE()),
('Eduación', 1, GETDATE(), GETDATE()),
('Finanzas', 1, GETDATE(), GETDATE()),
('Manufactura', 1, GETDATE(), GETDATE()),
('Construcción', 1, GETDATE(), GETDATE()),
('Servicios Profesionales', 1, GETDATE(), GETDATE()),
('Alimentos', 1, GETDATE(), GETDATE()),
('Telecomunicaciones', 1, GETDATE(), GETDATE()),
('Transporte y Depósito', 1, GETDATE(), GETDATE())

INSERT INTO providers (sector_id, vat_id, address_id, code, company_name, website, logo, first_name, last_name, role, cuit, is_enabled, created_at, updated_at)
VALUES
(9, 7, 4, 'VQ9T9KGGQH', 'Construcciones Modernas SRL', 'http://www.ordonez.es/', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5aa4ac12161485.562582d3c5ea2.jpg', 'Rogelio', 'Alberto', 'Terapeuta de arte', '6-58054292-35', 0, GETDATE(), GETDATE()),
(8, 9, 8, 'NQ66IUOIVI', 'Manufacturas Duarte', 'http://www.sobrino.com/', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b77f8512161485.5625832300392.jpg', 'Vito', 'Duarte', 'Gerente ambiental', '1-47550539-13', 1, GETDATE(), GETDATE()),
(7, 6, 9, 'MCJOAC137D', 'Mueblería Mir', 'https://peral.es/', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/22a9cf12161485.562583a837de8.jpg', 'Leonor', 'Mir', 'Dueño', '1-85474154-72', 0, GETDATE(), GETDATE()),
(2, 8, 7, 'TXE9R1XWBJ', 'Logística Camiones Bas', 'https://www.alfaro.com/', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ddedfd12161485.5625840b6ae4c.jpg', 'Fortunata', 'Bas', 'Dueño', '5-58673716-57', 1, GETDATE(), GETDATE()),
(1, 4, 1, 'O85USFS3MF', 'Clínica Benavides', 'https://royo.es/', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ed1dfa12161485.56324f516af99.jpg', 'Sabina', 'Benavides', 'Gerente ambiental', '4-42959876-14', 1, GETDATE(), GETDATE()),
(3, 2, 4, '2LGITA9RZ9', 'Servicios Profesionales Hernandez', 'https://pujadas-arias.com/', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7def3412161485.5625835f09322.jpg', 'Carlos', 'Guerra', 'Planificador de medios', '8-96797818-78', 1, GETDATE(), GETDATE()),
(4, 1, 3, 'Q8FW16FY8X', 'Financiera Solano', 'https://www.rosell.net/', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/0789bd12161485.56324f516fb63.jpg', 'Encarnita', 'Solano', 'Gestor de seguros', '2-06375059-12', 0, GETDATE(), GETDATE()),
(5, 5, 5, 'O8ON9EYL6Z', 'Manufacturas SA', 'http://www.valenciano.com/', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/be515b12161485.56324f5182f18.jpg', 'Mireia', 'Poza', 'Administrativo', '0-19217127-15', 1, GETDATE(), GETDATE()),
(6, 3, 2, 'UPLM4RMHEJ', 'Mayorista Ramones', 'https://roldan.org/', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e1179812161485.562583b52ebbb.jpg', 'Jose Ramón', 'Diego', 'Gerente de ventas', '0-61208476-25', 0, GETDATE(), GETDATE()),
(10, 10, 6, 'YQOVSEFL5W', 'Tecnologías Last Widget', 'https://valera.com/', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4ebe5712161485.56324f517cbf1.jpg', 'Jacinta', 'Cortina', 'Encargado general', '4-63482774-48', 1, GETDATE(), GETDATE())

INSERT INTO contacts (provider_id, telephone, email, created_at, updated_at)
VALUES
(1, '2305892495', 'rogelioalberto@gmail.com', GETDATE(), GETDATE()),
(2, '4357332345', 'vitoduarte@gmail.com', GETDATE(), GETDATE()),
(3, '3515759348', 'rogelioalberto@gmail.com', GETDATE(), GETDATE()),
(4, '9876245782', 'mirmuebleria@gmail.com', GETDATE(), GETDATE()),
(5, '2985246890', 'fortunatabas@camionesbas.com', GETDATE(), GETDATE()),
(6, '2357881235', 'sabinabvides@gmail.com', GETDATE(), GETDATE()),
(7, '7743269741', 'servicioshernandez@gmail.com', GETDATE(), GETDATE()),
(8, '3478623790', 'solanofinanciera@outlook.com', GETDATE(), GETDATE()),
(9, '3516571276', 'ramonescontacto@gmail.com', GETDATE(), GETDATE()),
(10, '3516789146', 'jcortina@lastwidget.com', GETDATE(), GETDATE())

INSERT INTO categories (category, is_enabled, created_at, updated_at)
VALUES
('Comestibles', 1, GETDATE(), GETDATE()),
('Tecnología', 1, GETDATE(), GETDATE()),
('Moda', 1, GETDATE(), GETDATE()),
('Hogar', 1, GETDATE(), GETDATE()),
('Deportes', 1, GETDATE(), GETDATE()),
('Juguetes', 1, GETDATE(), GETDATE()),
('Salud y Belleza', 1, GETDATE(), GETDATE()),
('Electrodomésticos', 1, GETDATE(), GETDATE()),
('Libros', 1, GETDATE(), GETDATE()),
('Materiales de Construcción', 1, GETDATE(), GETDATE())

INSERT INTO products (category_id, provider_id, sku, image, title, price, description, is_enabled, created_at, updated_at)
VALUES
(1, 9, 'AR354', 'https://www.brancastore.com.ar/141-large_default/fernet-branca-750ml.jpg', 'Fernet Branca 750ml', 7900, 'El "Fernet Branca 750ml" es un amaro, una bebida alcohólica amarga y aromática, de origen italiano. Se presenta en una botella de 750 ml, un tamaño común para bebidas espirituosas.', 1,  GETDATE(), GETDATE()),
(2, 10, 'GH409', 'https://http2.mlstatic.com/D_NQ_NP_769573-MLA46836968168_072021-O.webp', 'Notebook Dell Vostro 3405', 654999, 'Notebook DELL Vostro 3405 AMD Ryzen 5 3450u Modelo: V3405_R58GB256 Procesador: AMD Ryzen 5 3450U Mobile Processor with Radeon Vega 8 Graphics Memoria: 8GB DDR4 Almacenamiento Primario: 256GB M.2 PCIE Almacenamiento secundario: Slot Libre (SATA) Gráfica: Radeon Vega 8 Graphics', 1, GETDATE(), GETDATE()),
(4, 3, 'PX302', 'https://http2.mlstatic.com/D_NQ_NP_2X_854246-MLU71370244878_082023-F.webp', 'Placard Ropero Puertas Corredizas', 206825, 'Disposición doble cajonera 12 box de guardado de 28 x 28 4 cajones 59 ancho x 36 profundidad x 16 alto', 0, GETDATE(), GETDATE()),
(6, 9, 'DL209', NULL, 'Botínes De Fútbol Con Tapones 314 Raptor', 14658, 'Botines de calidad con tapones para pasto, uso profesional y recreativo. Talles para adultos y niños.', 1, GETDATE(), GETDATE()),
(9, 8, 'DJ001', 'https://http2.mlstatic.com/D_NQ_NP_2X_655220-MLA30102280718_042019-F.webp', 'Harry Potter y el Caliz De Fuego', 30794, 'Título del libro: Harry Potter y el cáliz de fuego Autor: Rowling, J. K. Idioma: Español Editorial del libro: Salamandra Edición del libro: 2015 Tapa del libro: Blanda Tamaño de la letra: Estándar', 0, GETDATE(), GETDATE()),
(6, 5, 'QW295', 'https://http2.mlstatic.com/D_NQ_NP_2X_749543-MLU72894555616_112023-F.webp', 'Labial Bálsamo Lipstick Balm', 15900, 'Bálsamo hidratante con vitaminas. Acabado Traslúcido Natural, potencia tu propio tono. Beneficios: Voluminizante y reparador. Evita que se sequen y agrieten. Uso Comfortable No pegajoso. Vitaminizado: Hidrata y reduce la apariencia de las líneas verticales de los labios.', 1, GETDATE(), GETDATE()),
(3, 5, 'QW729', 'https://http2.mlstatic.com/D_NQ_NP_2X_885128-MLA49821685799_052022-F.webp', 'Campera Media Estacion Gabardina Sport Casual', 21999, 'Campera media de estación con elástico en los puños de las mangas para mejor ajuste elástico.', 1, GETDATE(), GETDATE()),
(10, 1, 'AB002', 'https://http2.mlstatic.com/D_NQ_NP_2X_944918-MLA49385340040_032022-F.webp', 'Ladrillo Hueco De 12x18x33', 104333, 'Fabricante: Cerámica Quilmes Modelo: 12X18X33 Tipo de ladrillo: Hueco', 1, GETDATE(), GETDATE()),
(10, 1, 'AB003', NULL, 'Cemento Blanco X 25 Kilos', 48002, 'Cemento Blanco o Pastina Cemenpox para venecitas Pileta. Bolsa x 25 kilos Rinde 15 mts2 x bolsa, aproximadamente', 0, GETDATE(), GETDATE()),
(2, 10, 'PX672', 'https://http2.mlstatic.com/D_NQ_NP_2X_798345-MLA52148640021_102022-F.webp', 'Nvidia MSI Ventus GeForce RTX 20', 480000, 'Esta potente tarjeta gráfica cuenta con la última tecnología de Nvidia, ofreciendo un rendimiento excepcional y una calidad de imagen impresionante. Con 1920 núcleos y una frecuencia boost del núcleo de 1710 MHz, disfrutarás de tus juegos favoritos con una fluidez y velocidad increíbles.', 1, GETDATE(), GETDATE())

INSERT INTO orders_status (order_status)
VALUES
('Pendiente'),
('Cancelada'),
('Completada'),
('No entregada')

INSERT INTO purchase_orders (status_id, provider_id, issue_date, delivery_date, reception_info, total, is_enabled, created_at, updated_at)
VALUES
(3, 9, '2023-11-22', '2023-11-25', 'Ingresar por almacen al llegar.', 7570.11, 1, GETDATE(), GETDATE()),
(3, 10, '2023-12-22', '2023-12-31', 'Ayudar a descargar la mercadería.', 2326.39, 1, GETDATE(), GETDATE()),
(2, 5, '2022-06-16', '2022-06-30', 'Orden cancelada por falta de insumos.', 1208.00, 0, GETDATE(), GETDATE()),
(3, 8, '2022-07-21', '2022-08-14', 'Entrega completada en tiempo y forma.', 8613.90, 1, GETDATE(), GETDATE()),
(4, 5, '2022-10-03', '2022-10-05', 'Orden no reciba en la fecha pactada.', 2272.24, 0, GETDATE(), GETDATE()),
(1, 9, '2023-05-27', '2023-05-31', 'Dejar paquete en la entrada.', 4084.59, 0, GETDATE(), GETDATE()),
(2, 3, '2023-09-06', '2023-09-07', 'El proveedor no pudo completar la entrega.', 6091.58, 0, GETDATE(), GETDATE()),
(1, 1, '2022-08-05', '2022-08-21', 'Hablar con el encargado al entregar el paquete.', 781.13, 0, GETDATE(), GETDATE()),
(2, 10, '2022-06-06', '2022-06-23', 'Entrega cancelada por problemas de transporte.', 5627.25, 1, GETDATE(), GETDATE()),
(4, 1, '2022-07-11', '2022-08-06', 'Entrega no realizada por razones desconocidas.', 1473.36, 1, GETDATE(), GETDATE()),
(3, 10, '2022-07-11', '2022-08-06', 'Entrega completada sin demoras.', 1473.36, 1, GETDATE(), GETDATE())

INSERT INTO orders_details (order_id, product_id, quantity, created_at, updated_at)
VALUES
(1, 1, 50, GETDATE(), GETDATE()),
(1, 4, 2, GETDATE(), GETDATE()),
(2, 2, 5, GETDATE(), GETDATE()),
(2, 10, 2, GETDATE(), GETDATE()),
(3, 6, 15, GETDATE(), GETDATE()),
(3, 7, 5, GETDATE(), GETDATE()),
(4, 5, 10, GETDATE(), GETDATE()),
(5, 7, 10, GETDATE(), GETDATE()),
(6, 1, 100, GETDATE(), GETDATE()),
(6, 4, 1, GETDATE(), GETDATE()),
(7, 3, 5, GETDATE(), GETDATE()),
(8, 8, 11, GETDATE(), GETDATE()),
(8, 9, 7, GETDATE(), GETDATE()),
(9, 10, 1, GETDATE(), GETDATE()),
(10, 8, 2, GETDATE(), GETDATE())