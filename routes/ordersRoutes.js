import express from 'express';
import OrdersController from '../controllers/ordersController.js';
const router = express.Router();

router.get('/:id', OrdersController.getOrderContoller);
router.get('/', OrdersController.getOrdersController);
router.get('/produto/:produto', OrdersController.getProductValueController);
router.get('/cliente/:cliente', OrdersController.getOrdersValueController);
router.post('/', OrdersController.createOrderController);
router.put('/', OrdersController.updateOrderController);
router.patch('/updateEntregue', OrdersController.updateEntregueController);
router.delete('/:id', OrdersController.deleteOrderController);
router.get(
    '/produtoMaisvendidos/product/prod',
    OrdersController.getProductsMoreSalesController
);

router.use((err, req, res, next) => {
    global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

export default router;
