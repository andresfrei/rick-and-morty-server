const { Router } = require('express')
const router = Router()

router.use('/characters', require('./characters'))

router.get('/', (_req, res) => { res.render('index') })
router.get('*', (_req, res) => { res.status(404).render('404') })

module.exports = router
