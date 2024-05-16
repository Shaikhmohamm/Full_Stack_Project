import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware .middleware.js'
import { addBookmarkController, bookmarkControllers, deleteBookmarkController, checkbookmark } from '../controller/bookmark.controller.js';

const bookmarkRouter = express.Router();


// route to add bookmark
bookmarkRouter.post("/bookmark/add", authMiddleware, addBookmarkController);


// route to get the bookmarked fields
bookmarkRouter.get('/bookmark',authMiddleware, bookmarkControllers)

// route to check the bookmark item
bookmarkRouter.get('/bookmark/check', authMiddleware, checkbookmark)


// route to remove/delete the bookmarked fields
bookmarkRouter.delete('/bookmark/remove/:id', authMiddleware, deleteBookmarkController)

export default bookmarkRouter;