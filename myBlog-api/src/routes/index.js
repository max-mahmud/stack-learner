const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const ownership = require('../middleware/ownerShip');
const authController = require('../api/v1/auth/authController');
const articleController = require('../api/v1/article/articleController');
const updateItemPatch = require('../api/v2/controllers/updateItemPatch');
// const { controllers: userController } = require('../api/v1/user');

// Auth routes
router
  .post('/api/v1/auth/signup', authController.register)
  .post('/api/v1/auth/signin', authController.login);

// Article routes
router
  .route('/api/v1/articles')
  .get(articleController.findAllItems)
  .post(authenticate, authorize(['admin', 'user']), articleController.create);

router
  .route('/api/v1/articles/:id')
  .get(articleController.findSingleItem)
  .put(authenticate, authorize(['user', 'admin']), articleController.updateItem)
  .patch(
    authenticate,
    authorize(['user', 'admin']),
    articleController.updateItemPatch
  )
  .delete(
    authenticate,
    authorize(['admin', 'user']),
    ownership('Article'),
    articleController.removeItem
  );

router
  .route('/api/v2/articles/:id')
  .patch(authenticate, updateItemPatch);

// User routes
// router
//   .route('/api/v1/users')
//   .get(authenticate, authorize(['admin']), userController.findAllItems)
//   .post(authenticate, authorize(['admin']), userController.create);

module.exports = router;