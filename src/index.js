import { app } from "./app.js";
import { connectDB } from "./db/db.js";
import "dotenv/config";

const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is listening on port at: ${PORT}`);
    });
  })
  .catch((err) => console.log("Database connection error: ", err));
