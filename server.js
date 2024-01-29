import app from './app.js';
import { connectDB } from './db/mongoConnect.js';

const startServer = async () => {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log(`Server is running. Use our API on port: ${process.env.PORT}`);
  });
};

startServer();
