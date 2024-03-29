﻿USE [Integrador]
GO
SET IDENTITY_INSERT [dbo].[countries] ON 

INSERT [dbo].[countries] ([id], [name]) VALUES (1, N'Argentina')
INSERT [dbo].[countries] ([id], [name]) VALUES (3, N'Chile')
INSERT [dbo].[countries] ([id], [name]) VALUES (2, N'Uruguay')
SET IDENTITY_INSERT [dbo].[countries] OFF
GO
SET IDENTITY_INSERT [dbo].[provinces] ON 

INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (1, N'Buenos Aires', 1)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (2, N'Cordoba', 1)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (3, N'Santa Fe', 1)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (4, N'Mendoza', 1)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (5, N'Tucuman', 1)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (6, N'Entre Rios', 1)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (7, N'Salta', 1)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (8, N'Jujuy', 1)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (9, N'Corrientes', 1)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (10, N'La Pampa', 1)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (11, N'Montevideo', 2)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (12, N'Canelones', 2)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (13, N'Maldonado', 2)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (14, N'Rocha', 2)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (15, N'Salto', 2)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (16, N'Colonia', 2)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (17, N'Rivera', 2)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (18, N'Tacuarembo', 2)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (19, N'Cerro Largo', 2)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (20, N'Region Metropolitana de Santiago', 3)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (21, N'Region de Valparaiso', 3)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (22, N'Region de Antofagasta', 3)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (23, N'Region de Los Lagos', 3)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (24, N'Region de Coquimbo', 3)
INSERT [dbo].[provinces] ([id], [name], [country_id]) VALUES (25, N'Region de O Higgins', 3)
SET IDENTITY_INSERT [dbo].[provinces] OFF
GO
SET IDENTITY_INSERT [dbo].[localities] ON 

INSERT [dbo].[localities] ([id], [name], [province_id]) VALUES (1, N'Ciudad Autónoma de Buenos Aires', 1)
INSERT [dbo].[localities] ([id], [name], [province_id]) VALUES (2, N'La Plata', 1)
INSERT [dbo].[localities] ([id], [name], [province_id]) VALUES (3, N'Punta Del Este', 13)
INSERT [dbo].[localities] ([id], [name], [province_id]) VALUES (4, N'Barrio Nuevo', 21)
INSERT [dbo].[localities] ([id], [name], [province_id]) VALUES (5, N'Concepción del Uruguay', 6)
SET IDENTITY_INSERT [dbo].[localities] OFF
GO
SET IDENTITY_INSERT [dbo].[addresses] ON 

INSERT [dbo].[addresses] ([id], [created_at], [num], [street], [updated_at], [zip_code], [locality_id]) VALUES (1, CAST(N'2024-02-09T18:18:22.5823520' AS DateTime2), N'47', N'Calle San Mateo', CAST(N'2024-02-09T18:18:22.5823520' AS DateTime2), N'2807', 1)
INSERT [dbo].[addresses] ([id], [created_at], [num], [street], [updated_at], [zip_code], [locality_id]) VALUES (2, CAST(N'2024-02-09T18:26:24.5440520' AS DateTime2), N'640', N'Avenida Diagonal', CAST(N'2024-02-09T18:26:24.5440520' AS DateTime2), N'294B', 2)
INSERT [dbo].[addresses] ([id], [created_at], [num], [street], [updated_at], [zip_code], [locality_id]) VALUES (3, CAST(N'2024-02-09T18:28:26.9098500' AS DateTime2), N'120', N'Paseo de la Castellana', CAST(N'2024-02-09T18:28:26.9098500' AS DateTime2), N'4892', 3)
INSERT [dbo].[addresses] ([id], [created_at], [num], [street], [updated_at], [zip_code], [locality_id]) VALUES (4, CAST(N'2024-02-09T18:30:53.7286730' AS DateTime2), N'2165', N'Calle Recogidas', CAST(N'2024-02-09T18:30:53.7286730' AS DateTime2), N'9701C', 4)
INSERT [dbo].[addresses] ([id], [created_at], [num], [street], [updated_at], [zip_code], [locality_id]) VALUES (5, CAST(N'2024-02-09T18:34:08.1600000' AS DateTime2), N'220', N'Calle Alameda', CAST(N'2024-02-09T18:34:22.8071610' AS DateTime2), N'7391', 5)
SET IDENTITY_INSERT [dbo].[addresses] OFF
GO
SET IDENTITY_INSERT [dbo].[contacts] ON 

INSERT [dbo].[contacts] ([id], [created_at], [email], [telephone], [updated_at]) VALUES (1, CAST(N'2024-02-09T18:18:22.5737550' AS DateTime2), N'agustinmcdonals@gmail.com.ar', N'208580104814', CAST(N'2024-02-09T18:18:22.5737550' AS DateTime2))
INSERT [dbo].[contacts] ([id], [created_at], [email], [telephone], [updated_at]) VALUES (2, CAST(N'2024-02-09T18:26:24.5398240' AS DateTime2), N'fabriciogimenez@dell.com', N'11948230481', CAST(N'2024-02-09T18:26:24.5398240' AS DateTime2))
INSERT [dbo].[contacts] ([id], [created_at], [email], [telephone], [updated_at]) VALUES (3, CAST(N'2024-02-09T18:28:26.9058630' AS DateTime2), N'alicia-zara@gmail.com.ar', N'1103928492', CAST(N'2024-02-09T18:28:26.9058630' AS DateTime2))
INSERT [dbo].[contacts] ([id], [created_at], [email], [telephone], [updated_at]) VALUES (4, CAST(N'2024-02-09T18:30:53.7226910' AS DateTime2), N'hugosodimac@gmail.com', N'2948014', CAST(N'2024-02-09T18:30:53.7226910' AS DateTime2))
INSERT [dbo].[contacts] ([id], [created_at], [email], [telephone], [updated_at]) VALUES (5, CAST(N'2024-02-09T18:34:08.1570000' AS DateTime2), N'jose.contacto@arcor.com', N'10394132', CAST(N'2024-02-09T18:34:22.8061540' AS DateTime2))
SET IDENTITY_INSERT [dbo].[contacts] OFF
GO
SET IDENTITY_INSERT [dbo].[sectors] ON 

INSERT [dbo].[sectors] ([id], [created_at], [is_enabled], [name], [updated_at]) VALUES (1, CAST(N'2024-02-09T18:01:13.7380700' AS DateTime2), 1, N'Alimentos', CAST(N'2024-02-09T18:01:13.7380700' AS DateTime2))
INSERT [dbo].[sectors] ([id], [created_at], [is_enabled], [name], [updated_at]) VALUES (2, CAST(N'2024-02-09T18:01:17.0341230' AS DateTime2), 1, N'Tecnología', CAST(N'2024-02-09T18:01:17.0341230' AS DateTime2))
INSERT [dbo].[sectors] ([id], [created_at], [is_enabled], [name], [updated_at]) VALUES (3, CAST(N'2024-02-09T18:01:19.5713220' AS DateTime2), 1, N'Textiles', CAST(N'2024-02-09T18:01:19.5713220' AS DateTime2))
INSERT [dbo].[sectors] ([id], [created_at], [is_enabled], [name], [updated_at]) VALUES (4, CAST(N'2024-02-09T18:01:22.3980000' AS DateTime2), 1, N'Hogar', CAST(N'2024-02-09T18:23:26.5189100' AS DateTime2))
INSERT [dbo].[sectors] ([id], [created_at], [is_enabled], [name], [updated_at]) VALUES (5, CAST(N'2024-02-09T18:16:22.3424650' AS DateTime2), 0, N'Higiene y Salud', CAST(N'2024-02-09T18:24:01.5972180' AS DateTime2))
SET IDENTITY_INSERT [dbo].[sectors] OFF
GO
SET IDENTITY_INSERT [dbo].[providers] ON 

INSERT [dbo].[providers] ([id], [code], [company_name], [created_at], [cuit], [first_name], [is_enabled], [last_name], [logo], [role], [updated_at], [vat_condition], [website], [address_id], [contact_id], [sector_id]) VALUES (1, N'AB12', N'McDonals', CAST(N'2024-02-09T18:18:22.5873350' AS DateTime2), N'22-23232232-2', N'Agustín', 0, N'Hernandez', N'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/2339px-McDonald%27s_Golden_Arches.svg.png', N'Encargado de ventas', CAST(N'2024-02-09T18:24:55.7418860' AS DateTime2), N'IVA_RESPONSABLE_INSCRIPTO', N'https://www.mcdonalds.com.ar/', 1, 1, 1)
INSERT [dbo].[providers] ([id], [code], [company_name], [created_at], [cuit], [first_name], [is_enabled], [last_name], [logo], [role], [updated_at], [vat_condition], [website], [address_id], [contact_id], [sector_id]) VALUES (2, N'DLL54', N'Dell', CAST(N'2024-02-09T18:26:24.5460380' AS DateTime2), N'23-30590392-2', N'Fabricio', 1, N'Gimenez', N'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/2048px-Dell_logo_2016.svg.png', N'Gerente', CAST(N'2024-02-09T18:26:24.5460380' AS DateTime2), N'IVA_RESPONSABLE_INSCRIPTO', N'https://ar.tienda.dell.com/', 2, 2, 2)
INSERT [dbo].[providers] ([id], [code], [company_name], [created_at], [cuit], [first_name], [is_enabled], [last_name], [logo], [role], [updated_at], [vat_condition], [website], [address_id], [contact_id], [sector_id]) VALUES (3, N'ZA73', N'Zara', CAST(N'2024-02-09T18:28:26.9118550' AS DateTime2), N'33-65432109-4', N'Alicia', 1, N'Rodriguez', N'https://cdn.worldvectorlogo.com/logos/zara-1.svg', N'Administrativa', CAST(N'2024-02-09T18:28:26.9118550' AS DateTime2), N'PROVEEDOR_DEL_EXTERIOR', N'https://www.zara.com/ar/', 3, 3, 3)
INSERT [dbo].[providers] ([id], [code], [company_name], [created_at], [cuit], [first_name], [is_enabled], [last_name], [logo], [role], [updated_at], [vat_condition], [website], [address_id], [contact_id], [sector_id]) VALUES (4, N'SOD41', N'Sodimac', CAST(N'2024-02-09T18:30:53.7316550' AS DateTime2), N'33-65222109-4', N'Hugo', 1, N'Casañas', N'https://cdn.worldvectorlogo.com/logos/sodimac-homecenter.svg', N'Encargado de ventas', CAST(N'2024-02-09T18:30:53.7316550' AS DateTime2), N'PROVEEDOR_DEL_EXTERIOR', N'https://www.sodimac.com.ar/sodimac-ar/', 4, 4, 4)
INSERT [dbo].[providers] ([id], [code], [company_name], [created_at], [cuit], [first_name], [is_enabled], [last_name], [logo], [role], [updated_at], [vat_condition], [website], [address_id], [contact_id], [sector_id]) VALUES (5, N'AR12', N'Arcor', CAST(N'2024-02-09T18:34:08.1610000' AS DateTime2), N'22-23121232-2', N'José', 1, N'Salazar', N'https://cdn.worldvectorlogo.com/logos/arcor-3.svg', N'Empleado', CAST(N'2024-02-09T18:34:22.8091440' AS DateTime2), N'IVA_RESPONSABLE_NO_INSCRIPTO', N'https://www.arcor.com/ar/', 5, 5, 1)
SET IDENTITY_INSERT [dbo].[providers] OFF
GO
SET IDENTITY_INSERT [dbo].[categories] ON 

INSERT [dbo].[categories] ([id], [created_at], [is_enabled], [name], [updated_at]) VALUES (1, CAST(N'2024-02-09T18:35:11.8830000' AS DateTime2), 1, N'Alimentos y Bebidas', CAST(N'2024-02-09T19:02:10.8831920' AS DateTime2))
INSERT [dbo].[categories] ([id], [created_at], [is_enabled], [name], [updated_at]) VALUES (2, CAST(N'2024-02-09T18:35:28.4672590' AS DateTime2), 1, N'Notebooks', CAST(N'2024-02-09T18:35:28.4672590' AS DateTime2))
INSERT [dbo].[categories] ([id], [created_at], [is_enabled], [name], [updated_at]) VALUES (3, CAST(N'2024-02-09T18:35:36.3240000' AS DateTime2), 1, N'Electrodomésticos', CAST(N'2024-02-09T18:50:36.2505950' AS DateTime2))
INSERT [dbo].[categories] ([id], [created_at], [is_enabled], [name], [updated_at]) VALUES (4, CAST(N'2024-02-09T18:35:41.0162590' AS DateTime2), 1, N'Ropa', CAST(N'2024-02-09T18:35:41.0162590' AS DateTime2))
INSERT [dbo].[categories] ([id], [created_at], [is_enabled], [name], [updated_at]) VALUES (5, CAST(N'2024-02-09T18:36:59.9862560' AS DateTime2), 1, N'Hardware', CAST(N'2024-02-09T18:36:59.9862560' AS DateTime2))
SET IDENTITY_INSERT [dbo].[categories] OFF
GO
SET IDENTITY_INSERT [dbo].[products] ON 

INSERT [dbo].[products] ([id], [created_at], [description], [image], [is_enabled], [price], [sku], [title], [updated_at], [category_id], [provider_id]) VALUES (1, CAST(N'2024-02-09T18:39:24.6870000' AS DateTime2), N'Procesador:
AMD Ryzen™ 5 3450U

Sistema Operativo:
Ubuntu Linux

Tarjeta de video:
Tarjeta gráfica integrada AMD Radeon Vega 8

Pantalla:
14.0"

Memoria:
8 GB

Almacenamiento:
256 GB', N'https://ar.tienda.dell.com/cdn/shop/files/DELL_YG53W_INT_2_1.jpg?v=1697808564&width=800', 1, 1300, N'DVR5', N'Dell Vostro 3405 Ryzen 5', CAST(N'2024-02-09T18:40:12.4206600' AS DateTime2), 2, 2)
INSERT [dbo].[products] ([id], [created_at], [description], [image], [is_enabled], [price], [sku], [title], [updated_at], [category_id], [provider_id]) VALUES (2, CAST(N'2024-02-09T18:41:28.9620000' AS DateTime2), N'Procesador:
Intel® Core™ i7-1255U

Sistema Operativo:
Windows 11 Pro Multilingüe

Tarjeta de video:
Tarjeta gráfica integrada Intel® Iris® Xe Graphics

Pantalla:
14.0"

Memoria:
16 GB DDR4

Almacenamiento:
512 GB', N'https://riazcomputer.com/wp-content/uploads/2022/08/dell-5430.jpg', 1, 3600, N'DLI54', N'Dell Latitude 5430 i7', CAST(N'2024-02-09T18:42:53.2726950' AS DateTime2), 2, 2)
INSERT [dbo].[products] ([id], [created_at], [description], [image], [is_enabled], [price], [sku], [title], [updated_at], [category_id], [provider_id]) VALUES (3, CAST(N'2024-02-09T18:44:20.9000000' AS DateTime2), N'Procesador:
Intel® Core™ i7-1250U

Sistema Operativo:
Windows 11 Home

Tarjeta de video:
Tarjeta gráfica integrada Intel® Iris® Xe Graphics

Pantalla:
13.4"

Memoria:
16 GB

Almacenamiento:
512 GB', N'https://www.brandimia.com/productos/2VGTC.jpg', 1, 6000, N'DXP93', N'Dell XPS 9315 i7', CAST(N'2024-02-09T18:47:39.1861950' AS DateTime2), 2, 2)
INSERT [dbo].[products] ([id], [created_at], [description], [image], [is_enabled], [price], [sku], [title], [updated_at], [category_id], [provider_id]) VALUES (4, CAST(N'2024-02-09T18:48:46.9150000' AS DateTime2), N'Cazadora varsity confeccionada en tejido efecto ante. Bolsillos de doble vivo en cadera y detalle de bolsillo interior. Aplicación de bordados combinados a contraste en delantero y espalda. Acabados en rib. Cierre frontal con botones a presión.', N'https://static.zara.net/photos///2023/I/0/2/p/3918/402/707/2/w/563/3918402707_6_1_1.jpg?ts=1684763108616', 1, 1700, N'CBZ304', N'Cazadora Bomber Bordado', CAST(N'2024-02-09T18:52:03.7430530' AS DateTime2), 4, 3)
INSERT [dbo].[products] ([id], [created_at], [description], [image], [is_enabled], [price], [sku], [title], [updated_at], [category_id], [provider_id]) VALUES (5, CAST(N'2024-02-09T18:50:29.6243590' AS DateTime2), N'Polo de punto tejido en hilatura de algodón y seda. Cuello solapa con cierre frontal de botonadura. Manga corta. Acabados en rib.', N'https://static.zara.net/photos///2023/V/0/2/p/0077/406/832/2/w/563/0077406832_6_1_1.jpg?ts=1683017155401', 1, 1100, N'PZA834', N'Polo Punto Algodón', CAST(N'2024-02-09T18:50:29.6243590' AS DateTime2), 4, 3)
INSERT [dbo].[products] ([id], [created_at], [description], [image], [is_enabled], [price], [sku], [title], [updated_at], [category_id], [provider_id]) VALUES (6, CAST(N'2024-02-09T18:51:41.2542980' AS DateTime2), N'Jeans baggy fit. Cinco bolsillos. Efecto lavado. Bajo acabado irregular. Cierre frontal con cremallera y botón.', N'https://static.zara.net/photos///2023/I/0/2/p/4365/304/406/2/w/563/4365304406_6_1_1.jpg?ts=1688397762195', 1, 1150, N'JBFZ942', N'Jeans Baggy Fit', CAST(N'2024-02-09T19:12:28.0384330' AS DateTime2), 4, 3)
INSERT [dbo].[products] ([id], [created_at], [description], [image], [is_enabled], [price], [sku], [title], [updated_at], [category_id], [provider_id]) VALUES (7, CAST(N'2024-02-09T18:56:38.8710000' AS DateTime2), N'Modelo : BS35WCCR

Tipo de aire acondicionado : Split

Alimentación : Eléctrica', N'https://static.hendel.com/media/catalog/product/cache/0c3e9ac8430b5a3e77d1544ae1698a10/5/1/51773_0.jpg', 1, 500, N'BSW512', N'Aire acondicionado BS35WCCR', CAST(N'2024-02-09T19:12:26.7942700' AS DateTime2), 3, 4)
INSERT [dbo].[products] ([id], [created_at], [description], [image], [is_enabled], [price], [sku], [title], [updated_at], [category_id], [provider_id]) VALUES (8, CAST(N'2024-02-09T18:59:13.0789300' AS DateTime2), N'La belleza del sistema de libre Joint Multi Aire Acondicionado (FJM) es que usted puede tener hasta 5 unidades interiores conectadas a una sola unidad exterior. Esto le permite enfriar o calentar múltiples áreas de su hogar desde el mismo sistema, controlando la temperaturas unidad interior individual.', N'https://www.climatecnica.com/img.5380.fl.aire-acondicionado-multisplit-samsung-inverter-unidades-exteriores.jpg', 1, 400, N'FJM82', N'Aire Acondicionado Multisplit FJM', CAST(N'2024-02-09T18:59:13.0789300' AS DateTime2), 3, 4)
INSERT [dbo].[products] ([id], [created_at], [description], [image], [is_enabled], [price], [sku], [title], [updated_at], [category_id], [provider_id]) VALUES (9, CAST(N'2024-02-09T19:00:29.4304580' AS DateTime2), N'Control remoto inalámbrico
Display led oculto
Bajo nivel de ruido
Cinco modos de operación: Enfriamiento, Calefacción, Deshumidificación, Ventilación: Automático
Operación programable: Permite determinar el funcionamiento del equipo por un período de tiempo programable para encendido y apagado.', N'https://www.laplataclima.com.ar/wp-content/uploads/2018/12/imagen-1-SPLIT-TRANE-INVERTER-4MXW1109AB000AA-2600W-2250FR-FC.jpg', 1, 1500, N'MXW401', N'Aire Acondicionado Split Trane 4MXW', CAST(N'2024-02-09T19:00:29.4304580' AS DateTime2), 3, 4)
INSERT [dbo].[products] ([id], [created_at], [description], [image], [is_enabled], [price], [sku], [title], [updated_at], [category_id], [provider_id]) VALUES (10, CAST(N'2024-02-09T19:05:21.6060000' AS DateTime2), N'Esta elegante caja de bombones surtidos ofrece una experiencia gustativa única, perfecta para los amantes del chocolate. Cada bombón es una obra de arte, con rellenos que van desde cremosos pralinés hasta intensos ganaches de frutas, pasando por trufas suavemente espolvoreadas con cacao. La selección incluye variedades de chocolate negro, con leche y blanco, cada una diseñada para satisfacer tanto a los paladares tradicionales como a los más aventureros.', N'https://http2.mlstatic.com/D_NQ_NP_2X_866707-MLA45982749375_052021-F.webp', 1, 150, N'CBS293', N'Caja Bombones Surtidos', CAST(N'2024-02-09T19:10:12.1489170' AS DateTime2), 1, 5)
INSERT [dbo].[products] ([id], [created_at], [description], [image], [is_enabled], [price], [sku], [title], [updated_at], [category_id], [provider_id]) VALUES (11, CAST(N'2024-02-09T19:06:27.9950000' AS DateTime2), N'Esta caja premium de turrones incluye 50 unidades de los más finos turrones, cuidadosamente seleccionados para ofrecer una variedad de texturas y sabores. Desde el clásico turrón de Alicante, crujiente y lleno de almendras, hasta el suave y cremoso turrón de Jijona, esta selección abarca también opciones innovadoras como turrones de chocolate, coco, y frutas confitadas. Cada turrón está elaborado siguiendo recetas tradicionales con ingredientes de alta calidad, garantizando un sabor auténtico y una experiencia inolvidable.', N'https://i0.wp.com/golmarymar.com.ar/wp-content/uploads/CajaTurronArcor.jpg?fit=600%2C600&ssl=1', 1, 100, N'TJA2049', N'Caja de Turrones 50 Unidades', CAST(N'2024-02-09T19:10:44.6293630' AS DateTime2), 1, 5)
INSERT [dbo].[products] ([id], [created_at], [description], [image], [is_enabled], [price], [sku], [title], [updated_at], [category_id], [provider_id]) VALUES (12, CAST(N'2024-02-09T19:08:47.1100000' AS DateTime2), N'Esta colorida caja contiene una amplia variedad de caramelos, cada uno envuelto individualmente, garantizando frescura y calidad. Los sabores van desde los clásicos frutales hasta exóticas combinaciones, pasando por opciones mentoladas y eucalipto para una experiencia refrescante. ', N'https://jumboargentina.vtexassets.com/arquivos/ids/683501/Caja-De-Caramelos-Arcor-Surtida-X-242g-1-882977.jpg?v=637770596325300000', 1, 150, N'CSA571', N'Caja de Caramelos Surtidos', CAST(N'2024-02-09T19:10:29.1953590' AS DateTime2), 1, 5)
SET IDENTITY_INSERT [dbo].[products] OFF
GO
SET IDENTITY_INSERT [dbo].[purchase_orders] ON 

INSERT [dbo].[purchase_orders] ([id], [created_at], [delivery_date], [issue_date], [reception_info], [status], [total], [updated_at], [provider_id]) VALUES (1, CAST(N'2024-02-09T19:13:50.6915740' AS DateTime2), CAST(N'2024-02-10' AS Date), CAST(N'2024-02-09' AS Date), N'Agradecemos su preferencia y confianza en nuestros productos y servicios. Su orden de compra ha sido procesada exitosamente y actualmente está siendo preparada para su envío. Recibirá un correo electrónico con el número de seguimiento una vez que las computadoras hayan sido despachadas. Para cualquier consulta o información adicional, por favor, no dude en contactarnos.', N'COMPLETADA', 15800, CAST(N'2024-02-09T19:18:18.3509110' AS DateTime2), 2)
INSERT [dbo].[purchase_orders] ([id], [created_at], [delivery_date], [issue_date], [reception_info], [status], [total], [updated_at], [provider_id]) VALUES (2, CAST(N'2024-02-09T19:15:09.6240000' AS DateTime2), CAST(N'2024-02-15' AS Date), CAST(N'2024-02-09' AS Date), N'Por favor, tenga en cuenta que el envío de prendas de vestir puede requerir un embalaje especial para asegurar que lleguen en perfecto estado. Nos comprometemos a realizar el envío con la máxima eficiencia para garantizar una entrega rápida y segura.', N'PENDIENTE', 11350, CAST(N'2024-02-09T19:15:31.4483740' AS DateTime2), 3)
INSERT [dbo].[purchase_orders] ([id], [created_at], [delivery_date], [issue_date], [reception_info], [status], [total], [updated_at], [provider_id]) VALUES (3, CAST(N'2024-02-09T19:16:31.3438210' AS DateTime2), CAST(N'2024-02-15' AS Date), CAST(N'2024-02-09' AS Date), N'Tenga en cuenta que la instalación de estos sistemas requiere una planificación y coordinación especializada para asegurar el máximo rendimiento y eficacia. Nuestro equipo de instalación certificado está listo para trabajar con usted para programar una instalación que sea conveniente y minimice las interrupciones.', N'EXPIRADA', 1900, CAST(N'2024-02-09T19:18:27.7534540' AS DateTime2), 4)
INSERT [dbo].[purchase_orders] ([id], [created_at], [delivery_date], [issue_date], [reception_info], [status], [total], [updated_at], [provider_id]) VALUES (4, CAST(N'2024-02-09T19:18:15.0231880' AS DateTime2), CAST(N'2024-02-20' AS Date), CAST(N'2024-02-09' AS Date), N'Para asegurar que su experiencia sea tan gratificante como el sabor de nuestros productos, cada caja será empacada con el mayor cuidado, manteniendo la frescura y calidad hasta el momento de su disfrute. Entendemos la importancia de cada detalle, por lo que nos esforzamos por exceder sus expectativas en cada paso.', N'PENDIENTE', 1900, CAST(N'2024-02-09T19:18:15.0231880' AS DateTime2), 5)
INSERT [dbo].[purchase_orders] ([id], [created_at], [delivery_date], [issue_date], [reception_info], [status], [total], [updated_at], [provider_id]) VALUES (5, CAST(N'2024-02-09T19:18:53.3177700' AS DateTime2), CAST(N'2024-02-17' AS Date), CAST(N'2024-02-09' AS Date), N'Dado el valor y la complejidad de estos productos, aseguraremos que sean entregados e instalados con el mayor cuidado. Nuestro objetivo es brindarle una experiencia sin problemas desde la compra hasta la instalación final.', N'CANCELADA', 400, CAST(N'2024-02-09T19:18:56.2537300' AS DateTime2), 4)
SET IDENTITY_INSERT [dbo].[purchase_orders] OFF
GO
SET IDENTITY_INSERT [dbo].[order_details] ON 

INSERT [dbo].[order_details] ([id], [created_at], [quantity], [updated_at], [product_id], [order_id]) VALUES (1, CAST(N'2024-02-09T19:13:50.6975540' AS DateTime2), 2, CAST(N'2024-02-09T19:13:50.6975540' AS DateTime2), 2, 1)
INSERT [dbo].[order_details] ([id], [created_at], [quantity], [updated_at], [product_id], [order_id]) VALUES (2, CAST(N'2024-02-09T19:13:50.7003680' AS DateTime2), 2, CAST(N'2024-02-09T19:13:50.7003680' AS DateTime2), 1, 1)
INSERT [dbo].[order_details] ([id], [created_at], [quantity], [updated_at], [product_id], [order_id]) VALUES (3, CAST(N'2024-02-09T19:13:50.7003680' AS DateTime2), 1, CAST(N'2024-02-09T19:13:50.7003680' AS DateTime2), 3, 1)
INSERT [dbo].[order_details] ([id], [created_at], [quantity], [updated_at], [product_id], [order_id]) VALUES (4, CAST(N'2024-02-09T19:15:09.6270000' AS DateTime2), 5, CAST(N'2024-02-09T19:15:31.4503760' AS DateTime2), 6, 2)
INSERT [dbo].[order_details] ([id], [created_at], [quantity], [updated_at], [product_id], [order_id]) VALUES (5, CAST(N'2024-02-09T19:15:09.6280000' AS DateTime2), 2, CAST(N'2024-02-09T19:15:31.4539180' AS DateTime2), 5, 2)
INSERT [dbo].[order_details] ([id], [created_at], [quantity], [updated_at], [product_id], [order_id]) VALUES (6, CAST(N'2024-02-09T19:15:09.6290000' AS DateTime2), 2, CAST(N'2024-02-09T19:15:31.4539180' AS DateTime2), 4, 2)
INSERT [dbo].[order_details] ([id], [created_at], [quantity], [updated_at], [product_id], [order_id]) VALUES (7, CAST(N'2024-02-09T19:16:31.3468090' AS DateTime2), 1, CAST(N'2024-02-09T19:16:31.3468090' AS DateTime2), 8, 3)
INSERT [dbo].[order_details] ([id], [created_at], [quantity], [updated_at], [product_id], [order_id]) VALUES (8, CAST(N'2024-02-09T19:16:31.3488030' AS DateTime2), 1, CAST(N'2024-02-09T19:16:31.3488030' AS DateTime2), 9, 3)
INSERT [dbo].[order_details] ([id], [created_at], [quantity], [updated_at], [product_id], [order_id]) VALUES (9, CAST(N'2024-02-09T19:18:15.0252630' AS DateTime2), 5, CAST(N'2024-02-09T19:18:15.0252630' AS DateTime2), 10, 4)
INSERT [dbo].[order_details] ([id], [created_at], [quantity], [updated_at], [product_id], [order_id]) VALUES (10, CAST(N'2024-02-09T19:18:15.0271750' AS DateTime2), 1, CAST(N'2024-02-09T19:18:15.0271750' AS DateTime2), 12, 4)
INSERT [dbo].[order_details] ([id], [created_at], [quantity], [updated_at], [product_id], [order_id]) VALUES (11, CAST(N'2024-02-09T19:18:15.0281720' AS DateTime2), 10, CAST(N'2024-02-09T19:18:15.0281720' AS DateTime2), 11, 4)
INSERT [dbo].[order_details] ([id], [created_at], [quantity], [updated_at], [product_id], [order_id]) VALUES (12, CAST(N'2024-02-09T19:18:53.3198060' AS DateTime2), 1, CAST(N'2024-02-09T19:18:53.3198060' AS DateTime2), 8, 5)
SET IDENTITY_INSERT [dbo].[order_details] OFF
GO
SET IDENTITY_INSERT [dbo].[users] ON 

INSERT [dbo].[users] ([id], [created_at], [email], [password], [updated_at]) VALUES (1, CAST(N'2024-02-09T15:00:23.8000000' AS DateTime2), N'admin@gmail.com', N'asjadmin123', CAST(N'2024-02-09T15:00:23.8000000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[users] OFF
GO
