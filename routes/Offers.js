import express from 'express';
// import { getAllCities } from '../controllers/Cities.js';
import { getAllOffersForTask, getAmountUnreadOffers, postNewOffer, setReadOffers, deleteOfferById, getAllUnreadOffers } from '../controllers/Offers.js';
const routerOffers = express.Router();

routerOffers.get('/offers/:task_id', getAllOffersForTask)
routerOffers.get('/offers/unread/:user_id', getAmountUnreadOffers)
routerOffers.get('/offers/unread/getall/:user_id', getAllUnreadOffers)
routerOffers.put('/offers/unread/:offer_id', setReadOffers)
routerOffers.post('/offers', postNewOffer)
routerOffers.delete('/offers/:id', deleteOfferById)

export default routerOffers