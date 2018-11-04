const Order = require("./../models/Order");
const errorHandler = require("./../utils/errorHandler");

//(get) localhost/api/order?offset=2&limit=5
module.exports.getAll = async (req, res) => {
  const query = {
    user: req.user.id
  };

  if (req.query.start) {
    query.data = {
      // Більше обо рівне
      $gte: req.query.start
    };
  }

  if (req.query.end) {
    if (!query.data) {
      query.data = {};
    }
    //менше або рівне
    query.data["$lte"] = req.query.end;
  }

  if (req.query.order) {
    query.order = +req.query.order;
  }

  try {
    const orders = await Order.find(query)
      .sort({ data: -1 })
      .skip(+req.query.offset)
      .limit(+req.query.limit);

    res.status(200).json(orders);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async (req, res) => {
  try {
    const lastOrder = await Order.findOne({
      user: req.user.id
    }).sort({
      data: -1
    });
    const maxOrder = lastOrder ? maxOrder.order : 0;
    const order = await new Order({
      list: req.body.list,
      user: req.user.id,
      order: maxOrder + 1
    }).save();

    res.statys(200).json(order);
  } catch (e) {
    errorHandler(res, e);
  }
};
