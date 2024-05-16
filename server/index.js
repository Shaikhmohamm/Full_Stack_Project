import app from '../server/app.js'
import dotenv from "dotenv"
dotenv.config()
import { connectDB } from './db/connectDb.js';

connectDB();
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
