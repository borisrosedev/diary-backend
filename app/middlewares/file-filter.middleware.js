import path from "path"

export const fileFilters = {
    video: (req, file, cb) => {
        const filetypes = /.mp4|.avi|.mkv/
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
      
        if (extname) {
          return cb(null, true);
        } else {
          cb('Error: Videos Only!');
        }
    },
    image: (req, file, cb) => {
        const filetypes = /.png|.jpeg|.jpg/
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
      
        console.log("into")
        if (extname) {
          return cb(null, true);
        } else {
          cb('Error: Images Only!');
        }
    }
}

