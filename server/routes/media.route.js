import express from 'express'
import { 
    getAllMovies, 
    getAllTvSeries, 
    getAllData, getTrending,
    getRecommended
}  from '../controller/media.controller.js'

import {
    moviesearch,
    seriessearch,
    multisearch,
    bookmarksearch
} from '../controller/search.controller.js'
import { authMiddleware } from '../middleware/authMiddleware .middleware.js'

const mediaRouter = express.Router()
// To get all the movies
mediaRouter.get('/media/movies', getAllMovies)
// To get all the tvseries
mediaRouter.get('/media/tvseries', getAllTvSeries)
// To get all the movies and tvseries
mediaRouter.get('/media/getall', getAllData)
// To get all the trending media
mediaRouter.get('/media/trending', getTrending)
// To get all the recommended media
mediaRouter.get('/media/recommended', getRecommended)

// Route to search movies, tv series and both by query
mediaRouter.get('/media/movie/search/:query', moviesearch)
mediaRouter.get('/media/tvseries/search/:query', seriessearch)
mediaRouter.get('/media/all/search/:query', multisearch)
// Route to search in bookmark page
mediaRouter.get('/bookmark/search/:query', authMiddleware, bookmarksearch)
export default mediaRouter