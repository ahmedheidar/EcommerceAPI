import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
const app = express();
dotenv.config();

// Start the server
app.listen(process.env.PORT || 5000, () => {
    console.log('Express server is running at http://localhost:' + process.env.PORT);
}
);

// Connect to MongoDB using async/await
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB is Connected...');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
})();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);