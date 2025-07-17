import { Router } from 'express';
import { mockProducts } from '../utils/constants.mjs';
const router = Router();

router.get(
    '/api/products', (req, res) =>{
    console.log(req.headers.cookie);
    console.log(req.cookies)
    console.log(req.signedCookies)
    console.log(req.signedCookies.name)
    if(req.signedCookies.name === 'Ivan Vargas')
    return res.send(mockProducts)
    
    
    res.status(403).send({msg: 'Sorry, You need the correct cookie to access this resource'})
}
)

export default router;