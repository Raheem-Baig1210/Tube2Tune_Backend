const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('This is home page...!!!!');
});
router.get('/admin', (req, res) => {
    res.send('This is admin page...!!!!');
});
router.get("/user",(req,res)=>{
    res.send("This is user page...!!!!")
})


module.exports = router;