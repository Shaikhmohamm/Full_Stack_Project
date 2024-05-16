import dotenv from 'dotenv'
import MovieModel from './models/movieModel.js';
import TvseriesModel from './models/Tvseriesmodel.js'
import {moviedata} from './data/movies.js'
import {tvseriesdata} from './data/TVseries.js'
import mongoose from 'mongoose'

dotenv.config();

// Connect to MongoDB database
const DATABASE_URL = `${process.env.MONGO_URL}`;
mongoose.connect(DATABASE_URL);
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Database created...'))

// Function to create movie database
const createmoviedatabase = async () => {
    await MovieModel.deleteMany({})
    await MovieModel.insertMany(moviedata)
    console.log('success')
}

// Function to create TV series database
const createtvseriesdatabase = async () => {
    await TvseriesModel.deleteMany({})
    await TvseriesModel.insertMany(tvseriesdata)
    await mongoose.disconnect();
    console.log('success')
}

// Create movie database
createmoviedatabase()

// Create TV series database
createtvseriesdatabase()
