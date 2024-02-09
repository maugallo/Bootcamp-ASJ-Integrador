# Proyecto Integrador Final

Desarrollo de un *Sistema de Gestión Compras* para manejar información de Proveedores, Productos y Órdenes de compra.

## Ejecutar localmente

Pasos necesarios para correr el proyecto localmente:

- Crear una base de datos llamada
```sql
  CREATE DATABASE Integrador;
```
- Ejecutar el servidor de Java (*puerto 8080*)
> Esto creará todas las tablas y sus respectivas relaciones

- Ejecutar el archivo del repositorio **inserts-script.sql** en SSMS
> Esto insertará distintos registros en todas las tablas.

- Ejecutar el servidor de Angular (*puerto 4300*)
```bash
  ng start -o
```

## API Reference

### Para las principales entidades:

#### Obtener todos los productos

```http
  GET /products
```
| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `isEnabled`      | `Boolean` | **Opcional**. Estado del producto (eliminado o no) |
| `titleOrDescription`      | `String` | **Opcional**. Título o descripción del producto |
| `category`      | `String` | **Opcional**. Categoría del producto |
| `idProvider`      | `Integer` | **Opcional**. ID del proveedor del producto |

#### Obtener un producto

```http
  GET /products/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID del producto a buscar |

#### Obtener todos los proveedores

```http
  GET /providers
```
| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `isEnabled`      | `Boolean` | **Opcional**. Estado del proveedor (eliminado o no) |
| `companyNameOrCode`      | `String` | **Opcional**. Razón social o código del proveedor |

#### Obtener un proveedor

```http
  GET /providers/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID del proveedor a buscar |

#### Obtener todas las órdenes de compra

```http
  GET /purchase-orders
```
| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `status`      | `String` | **Opcional**. Estado de la orden de compra |

#### Obtener una orden de compra

```http
  GET /purchase-orders/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID de la orden a buscar |

## Credenciales para ingreso

### email: admin@gmail.com
### contraseña: asjadmin123

## Desarrollado por

Este proyecto fue desarrollado por: **Mauro Gallo**
