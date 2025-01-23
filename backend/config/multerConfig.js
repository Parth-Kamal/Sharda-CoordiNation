import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, path.join(process.cwd(), "uploads"));
   },
   filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
   },
});

const upload = multer({
   storage,
   fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      if (extname) {
         return cb(null, true);
      }
      cb("Error: Images Only!");
   },
});

export default upload;
