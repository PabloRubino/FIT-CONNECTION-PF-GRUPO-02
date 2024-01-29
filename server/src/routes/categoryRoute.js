<<<<<<< HEAD
const { Router } = require("express");
const {
  getAllCategoriesHandler,
  postCategoriesHandler,
  deleteCategoriesHandler,
  putCategoriesHandler,
} = require("../handlers/categoryHandler");
=======
const { Router } = require('express');
const { getAllCategoriesHandler,
    postCategoriesHandler,
    deleteCategoriesHandler,
    putCategoriesHandler } = require('../handlers/categoryHandler');
>>>>>>> develop-copia
const router = Router();

router.get("/", getAllCategoriesHandler);
router.put("/:id", putCategoriesHandler);
router.delete("/:id", deleteCategoriesHandler);
router.post("/", postCategoriesHandler);

module.exports = router;
