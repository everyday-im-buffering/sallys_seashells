const router = require('express').Router()
const { models: { Shell }} = require('../db')

router.get('/:id', async (req, res, next) =>{
    try{
        const shell = await Shell.findByPk(req.params.id)
        console.log(shell, 'shell');
        res.json(shell);
    }catch(e){
        next(e)
    }
})

module.exports = router
