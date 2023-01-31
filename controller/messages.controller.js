const Message = require("../model/message.model");

exports.createMessage = async (req, res, next) => {
  try {
    const message = await Message.create({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    res.status(201).json({
      status: "success",
      data: {
        message,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find();

    res.status(200).json({
      status: "success",
      data: {
        messages,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        message,
      },
    });
  } catch (error) {
    next(error);
  }
};
