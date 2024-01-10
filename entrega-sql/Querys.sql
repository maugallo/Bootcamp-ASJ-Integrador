-- Bootcamp ASJ - Gallo Mauro

-- 1. Obtener todos los productos, mostrando nombre del producto, categoría, proveedor (razón social y codigo proveedor), precio.

SELECT p.title,
       c.category,
       prov.company_name,
       prov.code AS provider_code,
       p.price
FROM   products p
       JOIN categories c
         ON p.category_id = c.id
       JOIN providers prov
         ON p.provider_id = prov.id; 

-- 2. En el listado anterior, además de los datos mostrados, traer el campo imagen aunque el producto NO tenga una. Sino tiene imagen, mostrar "-".

SELECT prod.title,
       c.category,
       prov.company_name,
       prov.code               AS provider_code,
       prod.price,
       Isnull(prod.image, '-') AS image
FROM   products prod
       JOIN categories c
         ON prod.category_id = c.id
       JOIN providers prov
         ON prod.provider_id = prov.id; 

-- 3. Mostrar los datos que se pueden modificar (en el front) del producto con ID = 2.

SELECT prod.sku,
       prod.title,
       prod.price,
       prod.image,
       prod.description,
       prov.company_name,
       cat.category
FROM   products prod
       JOIN providers prov
         ON prod.provider_id = prov.id
       JOIN categories cat
         ON prod.category_id = cat.id
WHERE  prod.id = 2; 

-- 4. Listar todos los proveedores cuyo teléfono tenga la característica de Córdoba (351) o que la provincia sea igual a alguna de las 3 con más proveedores.

SELECT prov.company_name
FROM   providers prov
       JOIN contacts cont
         ON prov.id = cont.provider_id
       JOIN addresses addr
         ON prov.address_id = addr.id
       JOIN localities
         ON addr.locality_id = localities.id
       JOIN provinces
         ON localities.province_id = provinces.id
WHERE  cont.telephone LIKE '351%'
        OR provinces.id IN (SELECT TOP 3 provinces.id
                            FROM   providers
                                   JOIN addresses
                                     ON providers.address_id = addresses.id
                                   JOIN localities
                                     ON addresses.locality_id = localities.id
                                   JOIN provinces
                                     ON localities.province_id = provinces.id
                            GROUP  BY provinces.id
                            ORDER  BY Count(providers.id) DESC);

-- 5. Traer un listado de todos los proveedores que no hayan sido eliminados , y ordenados por razon social, codigo proveedor y fecha en que se dió de alta ASC. De este listado mostrar los datos que correspondan con su tabla del front.

SELECT prov.code,
       prov.company_name,
       prov.website,
       cont.email,
       cont.telephone,
       prov.name,
       prov.sirname
FROM   providers prov
       JOIN contacts cont
         ON prov.id = cont.provider_id
WHERE  is_enabled = 1
ORDER  BY prov.company_name,
          prov.code,
          prov.created_at; 

-- 6. Obtener razon social, codigo proveedor, imagen, web, email, teléfono y los datos del contacto del proveedor con más ordenes de compra cargadas.

SELECT prov.company_name,
       prov.code,
       prov.logo,
       prov.website,
       prov.NAME,
       prov.sirname,
       cont.email,
       cont.telephone
FROM   providers prov
       JOIN contacts cont
         ON prov.id = cont.provider_id
WHERE  prov.id = (SELECT TOP 1 prov.id
                  FROM   providers prov
                         JOIN purchase_orders orders
                           ON prov.id = orders.provider_id
                  GROUP  BY prov.id
                  ORDER  BY Count(orders.id) DESC); 

-- 7. Mostrar la fecha emisión, nº de orden, razon social y codigo de proveedor, y la cantidad de productos de cada orden.

SELECT orders.issue_date,
       orders.id                    AS order_number,
       prov.company_name,
       prov.code,
       Sum(orders_details.quantity) AS product_quantity
FROM   purchase_orders orders
       JOIN orders_details
         ON orders.id = orders_details.order_id
       JOIN providers prov
         ON orders.provider_id = prov.id
       JOIN products prod
         ON orders_details.product_id = prod.id
GROUP  BY orders.issue_date,
          orders.id,
          prov.company_name,
          prov.code; 

-- 8. En el listado anterior, diferenciar cuando una orden está Cancelada o no, y el total de la misma.

SELECT orders.issue_date,
       orders.id                    AS order_number,
       prov.company_name,
       prov.code,
       Sum(orders_details.quantity) AS product_quantity,
       status.order_status,
       orders.total
FROM   purchase_orders orders
       JOIN orders_details
         ON orders.id = orders_details.order_id
       JOIN providers prov
         ON orders.provider_id = prov.id
       JOIN products prod
         ON orders_details.product_id = prod.id
       JOIN orders_status status
         ON orders.status_id = status.id
GROUP  BY orders.issue_date,
          orders.id,
          prov.company_name,
          prov.code,
          status.order_status,
          orders.total; 

-- 9. Mostrar el detalle de una orden de compra del proveedor 3, trayendo: SKU del producto, nombre producto, cantidad y subtotal.

SELECT prod.sku,
       prod.title,
       orders_details.quantity,
       ( prod.price * orders_details.quantity ) AS subtotal
FROM   purchase_orders orders
       JOIN orders_details
         ON orders.id = orders_details.order_id
       JOIN products prod
         ON orders_details.product_id = prod.id
       JOIN providers prov
         ON orders.provider_id = prov.id
WHERE  prov.id = 3; 

-- 10. Cambiar el estado a Cancelada y la fecha de modificación a la orden de compra con ID = 4.

UPDATE purchase_orders
SET    status_id = 2,
       updated_at = Getdate()
WHERE  purchase_orders.id = 4; 

-- 11. Escribir la sentencia para eliminar el producto con id = 1 (NO EJECUTAR, SÓLO MOSTRAR SENTENCIA).

/*
Al realizar la eliminación de un producto, primero necesitaremos eliminar todos aquellos detalles de compra que tengan como FK el id del producto.
Una vez eliminados los detalles, eliminaremos todas aquellas órdenes de compra que no tengan ningún detalle, y por ende, estén vacías.
Finalmente eliminaremos el producto.
*/

/*
DELETE FROM orders_details
FROM orders_details
JOIN products
ON orders_details.product_id = products.id
WHERE products.id = 5;

DELETE FROM purchase_orders
WHERE id NOT IN (SELECT orders.id
				FROM purchase_orders orders
				JOIN orders_details
				ON orders.id = orders_details.order_id);

DELETE FROM products
WHERE  id = 5;
*/