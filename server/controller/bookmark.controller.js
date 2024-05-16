import User from '../models/UserModel.js'
import MovieModel from '../models/movieModel.js'
import TvseriesModel from  '../models/Tvseriesmodel.js'

// controller to add to bookmark movies and series
export const addBookmarkController = async (req, res) => {
    const { movieId, tvseriesId } = req.body;
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the bookmark already exists
        if (movieId && user.bookmarkmovie.includes(movieId)) {
            return res.status(400).json({ message: 'Movie bookmark already exists', success: false });
        }

        if (tvseriesId && user.bookmarkseries.includes(tvseriesId)) {
            return res.status(400).json({ message: 'TV series bookmark already exists', success: false });
        }

        // Add unique movie ID to bookmarks
        if (movieId) {
            user.bookmarkmovie.push(movieId);
        }

        // Add unique TV series ID to bookmarks
        if (tvseriesId) {
            user.bookmarkseries.push(tvseriesId);
        }

        await user.save();
        res.status(201).json({
            success: true,
            message: "Bookmark added successfully",
            movie: user.bookmarkmovie,
            series: user.bookmarkseries
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to get user's bookmarked movies and TV series
export const bookmarkControllers = async (req, res) => {
    try {
      // Find the user document based on the user ID in the request
      const user = await User.findById(req.userId);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const bookmarkMovies = await Promise.all(user.bookmarkmovie.map(async (movieId) => {
        const movie = await MovieModel.findById(movieId);
        return movie;
    }));
    const bookmarktvseries = await Promise.all(user.bookmarkseries.map(async (tvid) => {
        const tvshow = await TvseriesModel.findById(tvid)
        return tvshow
    }));
    const newUser = { ...user.toObject(), bookmarkmovie: bookmarkMovies, bookmarkseries: bookmarktvseries };

    res.status(200).send({
        success: true,
        massage: 'all bookmark found',
        bookmark: newUser
    })
} catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // controller for checking the bookmark
  export const checkbookmark = async (req, res) => {
    const user = await User.findById(req.userId);

    return res.status(200).json({
        message: 'bookmark exists',
        success: true,
        bookmarkmovie: user.bookmarkmovie,
        bookmarkseries: user.bookmarkseries
    });
};


  // remove the bookmark controller
  export const deleteBookmarkController  = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the bookmark exists and remove it
        let removedBookmark = null;
        if (user.bookmarkmovie.includes(id)) {
            removedBookmark = id;
            user.bookmarkmovie.pull(id);
        }
        if (user.bookmarkseries.includes(id)) {
            removedBookmark = id;
            user.bookmarkseries.pull(id);
        }

        if (!removedBookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }

        // Save the updated user document
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Bookmark deleted successfully',
            removedBookmark
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}