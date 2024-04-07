const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
  public_id: Date.now(),
  resource_type: "auto",
};

exports.createImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, options);
    return res.send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

exports.removeImage = async (req, res) => {
  try {
    let image_id = req.body.public_id;
    await cloudinary.uploader.destroy(image_id, (result) => {
      res.send(result);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
