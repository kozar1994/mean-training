const Category = require("./../models/Category");
const Position = require("./../models/Position");
const errorHandler = require("./../utils/errorHandler");

module.exports.getAll = async function(req, res) {
  try {
    const categorys = await Category.find({ user: req.user.id });
    res.statys(200).json(categorys);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getById = async function(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    res.statys(200).json(category);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.remove = async function(req, res) {
  try {
    await Category.findById(req.params.id);
    await Position.remove({ category: req.params.id });
    res.statys(200).json({
      massege: "Категорія удалина"
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async function(req, res) {
  const category = new Category({
    name: req.body.name,
    user: req.user.id,
    imageSrc: req.file ? req.file.path : ""
  });

  try {
    await category.save();
    res.status(201).json(category);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async function(req, res) {
  const update = {
    name: req.body.name
  };

  if (req.file) {
    update.imageSrc = req.file.path;
  }
  try {
    const category = await Category.findByIdAndUpdate(
      {
        _id: req.params.id
      },
      {
        $set: this.update
      },
      {
        new: true
      }
    );
  } catch (e) {
    errorHandler(res, e);
  }
};
