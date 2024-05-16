import MovieModel from '../models/movieModel.js'
import TvseriesModel from '../models/Tvseriesmodel.js'

// Controller for getting all the movies
export const getAllMovies = async (req, res) => {
     try {
        const moviedata = await MovieModel.find({});

        if (!moviedata) {
            return res.status(200).send({
                success: false,
                message: 'No movie found'
            })
        }

        return res.status(200).send({
            MovieCount: moviedata.length,
            success: true,
            message: 'All movie lists',
            moviedata
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'error while getting movie',
            error
        })
    }
  };

  // Controller for getting all the TV series
  export const getAllTvSeries = async (req, res) => {
    try {
       const tvseriesdata = await TvseriesModel.find({});

       if (!tvseriesdata) {
           return res.status(200).send({
               success: false,
               message: 'No tv series found'
           })
       }

       return res.status(200).send({
           MovieCount: tvseriesdata.length,
           success: true,
           message: 'All tv series lists',
           tvseriesdata
       })
   } catch (error) {
       res.status(400).send({
           success: false,
           message: 'error while getting tv series',
           error
       })
   }
 };

 // Controller to get both movies & tv series data
  export const getAllData = async (req,res) => {
    try {
        const movies = await MovieModel.find({});
        const tvSeries = await TvseriesModel.find({});

        const allData = [...movies, ...tvSeries];

        if (allData.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'No data found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'All data lists',
            dataCount: allData.length,
            allData
        });
    } catch (error) {
        console.error('Error while getting data:', error);
        res.status(400).json({
            success: false,
            message: 'Error while getting data',
            error
        });
    }
  };
// controller to get trending media 
  export const getTrending = async (req, res) => {
    try {
      // Fetch movies and TV series
      const movies = await MovieModel.find().limit(5).lean(); // Limit to 5 movies
      const tvSeries = await TvseriesModel.find().limit(5).lean(); // Limit to 5 TV series
  
      // Combine the results
      const trending = [...movies, ...tvSeries];
  
      // Shuffle the array to mix movies and TV series randomly
      for (let i = trending.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [trending[i], trending[j]] = [trending[j], trending[i]];
      }
  
      res.json({ success: true, count: trending.length, data: trending });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };

  // controller to get recommended media 

  export const getRecommended = async (req, res) => {
    try {
      // Fetch 10 popular movies with high ratings
      const recommendedMovies = await MovieModel.find({ type: "movie" })
        .sort({ rating: -1 }) // Sort by rating (highest first)
        .limit(10) // Limit to 10 movies
        .lean();
  
      // Fetch 10 popular TV series with high ratings
      const recommendedTvSeries = await TvseriesModel.find({ type: "series" })
        .sort({ rating: -1 }) // Sort by rating (highest first)
        .limit(10) // Limit to 10 TV series
        .lean();
  
      // Combine the results
      const recommended = [...recommendedMovies, ...recommendedTvSeries];
  
      // Shuffle the array to mix recommendations randomly
      for (let i = recommended.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [recommended[i], recommended[j]] = [recommended[j], recommended[i]];
      }
  
      res.json({ success: true, recommended });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };