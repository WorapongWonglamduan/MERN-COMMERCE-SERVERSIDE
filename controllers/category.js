exports.list = async (req, res) => {
  try {
    return res.send("list Category");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

exports.create = async (req, res) => {
  try {
    return res.send("create Category");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.edit = async (req, res) => {
  try {
    return res.send("edit Category");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.update = async (req, res) => {
  try {
    return res.send("update Category");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
exports.remove = async (req, res) => {
  try {
    return res.send("delete Category");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
