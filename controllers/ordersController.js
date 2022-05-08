import OrdersService from '../services/ordersService.js';

async function getOrderContoller(req, res, next) {
    try {
        const order = await OrdersService.getOrderService(req.params.id);
        if (!order) {
            throw new Error('Não existe registro com o ID informado!');
        }
        res.send(order);
        global.logger.info(`GET /order/:id ${req.params.id}`);
    } catch (err) {
        next(err);
    }
}

async function getOrdersController(_req, res, next) {
    try {
        const data = await OrdersService.getOrdersService();
        res.send(data);
        global.logger.info('GET /orders');
    } catch (err) {
        next(err);
    }
}

async function createOrderController(req, res, next) {
    try {
        const order = req.body;
        if (!order.cliente || order.valor == null || !order.produto) {
            throw new Error('Cliente, valor e produto são obrigatorios!');
        }
        const orderAfterInsert = await OrdersService.createOrderService(order);
        res.send(orderAfterInsert);
        global.logger.info(`POST /orders ${JSON.stringify(orderAfterInsert)}`);
    } catch (err) {
        next(err);
    }
}

async function updateOrderController(req, res, next) {
    try {
        const order = req.body;
        if (
            !order.id ||
            !order.cliente ||
            order.valor == null ||
            !order.produto
        ) {
            throw new Error('Cliente, valor e produto são obrigatorios!');
        }
        const orderAfterUpdate = await OrdersService.updateOrderService(order);
        res.send(orderAfterUpdate);
        global.logger.info(`PUT /orders ${JSON.stringify(orderAfterUpdate)}`);
    } catch (err) {
        next(err);
    }
}

async function updateEntregueController(req, res, next) {
    try {
        const order = req.body;
        if (!order.id || !order.entregue == null) {
            throw new Error('Id e o status entregue são obrigatório');
        }

        res.send(await OrdersService.updateEntregueService(order));
        global.logger.info(
            `PATCH /order/updateEntregue ${JSON.stringify(order)}`
        );
    } catch (err) {
        next(err);
    }
}

async function deleteOrderController(req, res, next) {
    try {
        await OrdersService.deleteOrderSerivce(req.params.id);
        const delecao = `A conta do Id ${req.params.id} foi excluida com sucesso!`;
        res.send(delecao);
        global.logger.info(`DELETE /order/:id - ${req.params.id}`);
    } catch (err) {
        next(err);
    }
}

async function getOrdersValueController(req, res, next) {
    console.log('Passou aqui 1');
    try {
        const client = req.body.cliente;
        res.send(await OrdersService.getOrdersValueService(client));
    } catch (err) {
        next(err);
    }
}

async function getProductValueController(req, res, next) {
    try {
        const productValue = await OrdersService.getProductValueService(
            req.params.produto
        );
        res.send(productValue);
    } catch (err) {
        next(err);
    }
}

async function getProductsMoreSalesController(_req, res, next) {
    try {
        const productMoreSales =
            await OrdersService.getProductsMoreSalesService();
        res.send(productMoreSales);
    } catch (err) {
        next(err);
    }
}

export default {
    getOrderContoller,
    getOrdersController,
    createOrderController,
    updateOrderController,
    updateEntregueController,
    deleteOrderController,
    getOrdersValueController,
    getProductValueController,
    getProductsMoreSalesController,
};
