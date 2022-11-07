const express = require('express')
const pc = require('../controllers/people')

const router = express.Router()

router.route('/').get(pc.getPeople).post(pc.createPerson)


router.get('/:personID', pc.getPerson)

router.put('/:personID', pc.updatePerson)

router.delete('/:personID', pc.deletePerson)

module.exports = router