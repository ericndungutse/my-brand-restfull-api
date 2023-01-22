const Message = require("../model/message.model");

exports.createMessage = async (req, res) => {
  try {
    const message = await Message.create({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    res.status(201).json({
      satuts: "success",
      data: {
        message,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find();

    res.status(200).json({
      status: "success",
      data: {
        messages,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        message,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
