const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

router.get("/:id", async (req, res) => {
  const categoryId = req.params.id;

  const category = await Category.findById(categoryId);
  if (!category) {
    res.status(404).json({ success: false, message: "category not found!" });
  }
  res.status(200).send(category);
});
router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  category = await category.save();
  if (!category) return res.status(404).send("the category was not created");
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const categoryId = req.params.id;
  const category = Category.findByIdAndUpdate(
    categoryId,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    {
      new: true,
    }
  );

  if (!category) {
    res.status(404).json({ success: false, message: "Category not found!" });
  }
  res.status(200).send(category);
});

router.delete("/:id", async (req, res) => {
  const Categoryid = req.params.id;
  Category.findByIdAndRemove(Categoryid)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "the category is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "category not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
