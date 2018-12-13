const transactionController = require('../../controllers/transactionController')
const router = require('express').Router();
const db = require('../../models')

require('./paramHelpers')(router)

// transaction routes
router.route('/transactions')
  .get(transactionController.findAll)
  .post(transactionController.create)

router.route('/transactions/:id')
  .get(transactionController.findById)
  .put(transactionController.update)
  .delete(transactionController.remove)

// userFieldName === 'userId' means paid BY user
// userFieldName === 'paidUserId' means paid TO user
router.route('/transactions/paid/:userFieldName/:uid')
  .get(transactionController.totalAmtPaid)

router.route('/users/:userId/tx/from')
  .get((req, res) => {
    db.Transaction.find({ fromUser: req.params.userId })
      .populate('fromUser', 'username')
      .select('-raw')
      .then(dbTxns => {
        res.json(dbTxns)
      })
      .catch(err => res.status(500).json(err))
  })

router.route('/users/:userId/tx/to')
  .get((req, res) => {
    db.Transaction.find({ txOutputs: { $elemMatch: { userId: req.params.userId } } })
      .populate('fromUser', 'username')
      .select('-raw')
      .then(dbTxns => res.json(dbTxns))
      .catch(err => {
        console.log('\n >>>>> GET user/tx/to ERR:\n', err)
        res.status(500).json(err)
      })
  })

module.exports = router