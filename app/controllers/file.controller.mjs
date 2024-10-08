const fileController = {
  async uploadOneImage(req, res) {
    if (req.files) {
      return res.status(200).json({ message: "image uploaded" });
    }

    return res.status(400);
  },

  async uploadMultipleImages(req, res) {
    if (req.files) {
      return res.status(200).json({ message: "images uploaded" });
    }

    return res.status(400);
  },

  async uploadOneVideo(req, res) {
    if (req.files) {
      return res.status(200).json({ message: "video uploaded" });
    }

    return res.status(400);
  },

  async uploadMultipleVideos(req, res) {
    if (req.files) {
      return res.status(200).json({ message: "videos uploaded" });
    }

    return res.status(400);
  },
};

export default fileController;
