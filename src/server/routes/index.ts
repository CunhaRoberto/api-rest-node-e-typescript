import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';  
import { CidadesController } from './../controller'

const router = Router();

router.get('/', (_, res) => {
    res.send('Olá, Dev!');
  });
  
// router.post('/user', (req, res) => {
//     res.status(StatusCodes.BAD_REQUEST).json(req.body);
//   });

router.route('/cidades').post(
  CidadesController.createBodyValidation, 
  CidadesController.createQueryValidation, 
  CidadesController.create)



export { router };
