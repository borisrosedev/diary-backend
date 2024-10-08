const tryCatch = (cb, res, message) => {
  try {
    cb();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message, error: err });
  }
};

export default tryCatch;
