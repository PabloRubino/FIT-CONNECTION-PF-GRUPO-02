const { ProductServices, Categories } = require("../db");
<<<<<<< HEAD
const {
  filterProducts,
  getPagination,
  getPagingData,
} = require("../../utils/filterProducts");
=======
const filterProducts = require("../../utils/filterProducts");
>>>>>>> b68336ff7707904ad082bd0f9e4373e8db4d9637
const { Op } = require("sequelize");

const getProductServices = async () => {
  try {
    const allProducts = await ProductServices.findAll({
      order: [["name", "ASC"]],
    });
<<<<<<< HEAD
    return allProducts;
=======
    return { Items: allProducts };
>>>>>>> b68336ff7707904ad082bd0f9e4373e8db4d9637
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const getProductServicesById = async (id) => {
  try {
    const product = await ProductServices.findByPk(id);
    return product;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

<<<<<<< HEAD
const getProductServicesByName = async (name) => {
  try {
    const product = await ProductServices.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    if (product.length === 0) {
      throw new Error("No se encontro un producto con ese nombre.");
    }
    return product;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

=======
>>>>>>> b68336ff7707904ad082bd0f9e4373e8db4d9637
const createProductServices = async (
  name,
  price,
  description,
  status,
  code,
  image_url,
  stock,
  category_id
) => {
  try {
<<<<<<< HEAD
    const productCode = await ProductServices.findOne({
      where: {
        code: code,
      },
    });
    if (productCode) {
      throw new Error("There is already a product with that code");
    }
=======
>>>>>>> b68336ff7707904ad082bd0f9e4373e8db4d9637
    // Buscamos la categoria correspondiente con el id proporcionado.
    const category = await Categories.findByPk(category_id);

    if (!category) {
      throw new Error("Categoría no encontrada.");
    }

    const product = await ProductServices.create({
      name,
      price,
      description,
      status,
      code,
      image_url,
      stock,
    });

    // Agregamos la categoría correspondiente al producto.
    await category.addProductServices(product);

    // Establecemos que un producto solo puede pertenecer a una categoría.
    await product.setCategories(category);

<<<<<<< HEAD
    return { message: "Producto creado con exito." };
=======
    return { message: "Producto creado con exito.", product };
>>>>>>> b68336ff7707904ad082bd0f9e4373e8db4d9637
  } catch (error) {
    throw new Error(`Error al crear el producto: ${error.message}`);
  }
};

const updateProductServices = async (id, newData) => {
  try {
    const product = await ProductServices.findByPk(id);
    await product.update(newData);
<<<<<<< HEAD
    return { message: "Producto actualizado exitosamente." };
  } catch (error) {
    throw new Error(error.message);
=======
    const updatedProducts = await ProductServices.findAll();
    return {
      message: "Producto actualizado exitosamente.",
      products: updatedProducts,
    };
  } catch (error) {
    throw new Error({ error: error.message });
>>>>>>> b68336ff7707904ad082bd0f9e4373e8db4d9637
  }
};

const deleteProductServices = async (id) => {
  try {
    const product = await ProductServices.findByPk(id);
    await product.destroy();
<<<<<<< HEAD
    return { message: "Product deleted successfully" };
=======
    const updatedProducts = await ProductServices.findAll();
    return {
      message: "Product deleted successfully",
      products: updatedProducts,
    };
>>>>>>> b68336ff7707904ad082bd0f9e4373e8db4d9637
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

// ESTE ES EL CONROLLER DE  FILTROS Y ORDENAMIENTOS COMBINADOS
<<<<<<< HEAD

=======
>>>>>>> b68336ff7707904ad082bd0f9e4373e8db4d9637
const filterAndOrder = async (
  sortOrder,
  minPrice,
  maxPrice,
  category_id,
  name,
<<<<<<< HEAD
  code,
  page,
  size
) => {
  try {
    const { limit, offset } = getPagination(page, size);
    const validate = sortOrder && sortOrder.toUpperCase();
    let whereClause = {};
    let filterConditions = {};

    // Si se proporcionan minPrice y maxPrice, aplicar filtro por rango
    if (minPrice !== undefined && maxPrice !== undefined) {
      const minPriceNum = parseFloat(minPrice);
      const maxPriceNum = parseFloat(maxPrice);

=======
  code
) => {
  try {
    const validate = sortOrder && sortOrder.toUpperCase();
    let whereClause = {};
    // Si se proporcionan minPrice y maxPrice, aplicar filtro por rango
    if (minPrice !== undefined && maxPrice !== undefined) {
      // Convertir las cadenas a números usando parseFloat
      const minPriceNum = parseFloat(minPrice);
      const maxPriceNum = parseFloat(maxPrice);

      // Verificar si las conversiones fueron exitosas
>>>>>>> b68336ff7707904ad082bd0f9e4373e8db4d9637
      if (!isNaN(minPriceNum) && !isNaN(maxPriceNum)) {
        const priceFilter = {
          price: {
            [Op.between]: [minPriceNum, maxPriceNum],
          },
        };
<<<<<<< HEAD
        filterConditions = { ...filterConditions, ...priceFilter };
=======
        whereClause = { ...whereClause, ...priceFilter };
>>>>>>> b68336ff7707904ad082bd0f9e4373e8db4d9637
      } else {
        throw new Error(
          "Los valores de minPrice y maxPrice deben ser números válidos."
        );
      }
<<<<<<< HEAD
    } else if (minPrice !== undefined) {
      const minPriceNum = parseFloat(minPrice);

      if (!isNaN(minPriceNum)) {
        const priceFilter = {
          price: {
            [Op.gte]: minPriceNum,
          },
        };
        filterConditions = { ...filterConditions, ...priceFilter };
      } else {
        throw new Error("El valor de minPrice debe ser un número válido.");
      }
    } else if (maxPrice !== undefined) {
      const maxPriceNum = parseFloat(maxPrice);

      if (!isNaN(maxPriceNum)) {
        const priceFilter = {
          price: {
            [Op.lte]: maxPriceNum,
          },
        };
        filterConditions = { ...filterConditions, ...priceFilter };
      } else {
        throw new Error("El valor de maxPrice debe ser un número válido.");
      }
    }
    // aqui combina por nombre , id y marca

    if (category_id || name || code) {
      filterConditions = {
        ...filterConditions,
        ...filterProducts(category_id, name, code),
      };
    }

    whereClause = { ...whereClause, ...filterConditions };

    const orderClause = validate ? [["price", validate]] : undefined;

    const productosFilteredandOrdered = await ProductServices.findAndCountAll({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });
    const response = getPagingData(productosFilteredandOrdered, page, limit);
    return response;
  } catch (error) {
    console.error(error);
=======
    }
    //Si se proporciona category_id, name o code, aplicar filtro
    if (category_id || name || code) {
      const filterConditions = filterProducts(category_id, name, code);
      whereClause = { ...whereClause, ...filterConditions };
    }

    const orderClause = validate ? [["price", validate]] : undefined;

    const productosFilteredandOrdered = await ProductServices.findAll({
      where: whereClause,
      order: orderClause,
    });

    if (productosFilteredandOrdered.length === 0) {
      throw new Error(
        "No existen productos que cumplan con los criterios de búsqueda."
      );
    }

    return { Items: productosFilteredandOrdered };
  } catch (error) {
>>>>>>> b68336ff7707904ad082bd0f9e4373e8db4d9637
    throw new Error(error.message);
  }
};

module.exports = {
  getProductServices,
  getProductServicesById,
<<<<<<< HEAD
  getProductServicesByName,
  createProductServices,
  updateProductServices,
  deleteProductServices,
  filterByCategory,
  orderByPrice,
  productfilter,
=======
  createProductServices,
  updateProductServices,
  deleteProductServices,
>>>>>>> b68336ff7707904ad082bd0f9e4373e8db4d9637
  filterAndOrder,
};
