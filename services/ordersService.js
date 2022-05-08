import OrdersRepository from '../repositories/ordersRepository.js';

async function getOrderService(id) {
    return await OrdersRepository.getOrder(id);
}

async function getOrdersService() {
    return await OrdersRepository.getOrders();
}
/** Obter o valor total dos pedidos entregues de um cliente passado como parametro */
async function getOrdersValueService(cliente) {
    const allOrders = await OrdersRepository.getOrders();
    const total = allOrders
        .filter(p => p.cliente === cliente && p.entregue)
        .map(p => p.valor)
        .reduce((acumulador, valorAtual) => acumulador + valorAtual);

    return total.toString();
}
/** Obter o valor total dos pedidos entregues de um cliente passado como parametro */

async function createOrderService(order) {
    return await OrdersRepository.insertOrder(order);
}

async function updateOrderService(order) {
    return await OrdersRepository.updateOrder(order);
}

async function updateEntregueService(order) {
    const orderToUpdate = await OrdersRepository.getOrder(order.id);
    orderToUpdate.entregue = order.entregue;
    return await OrdersRepository.updateOrder(orderToUpdate);
}

async function deleteOrderSerivce(id) {
    return await OrdersRepository.deleteOrder(id);
}

/** Obter o valor total dos produtos realizados  */
async function getProductValueService(produto) {
    const allOrders = await OrdersRepository.getOrders();
    let productValue = 0;
    //Todos os produto realizados em acordo com o passado como parametro
    const allProducts = allOrders.filter(order => order.produto === produto);
    const productsEntregues = allProducts.filter(order => order.entregue);
    for (let product of productsEntregues) {
        productValue += product.valor;
    }
    const returnValue = {
        ValorTotalProduto: productValue,
    };
    return returnValue;
}
/** Obter o valor total dos produtos realizados */

async function getProductsMoreSalesService() {
    const allOrders = await OrdersRepository.getOrders();
    const allOrdersEntregues = allOrders.filter(order => order.entregue);
    const array = [];
    allOrdersEntregues
        .reduce((acc, val) => {
            if (acc.find(a => a.pizza == val.produto)) {
                acc.find(a => a.pizza == val.produto).quantidade++;
            } else {
                acc.push({
                    pizza: val.produto,
                    quantidade: 1,
                });
            }
            return acc;
        }, [])
        .sort((a, b) => b.quantidade - a.quantidade)
        .map(a => array.push(`${a.pizza} - ${a.quantidade}`));

    return array;
}

export default {
    getOrderService,
    getOrdersService,
    createOrderService,
    updateOrderService,
    updateEntregueService,
    deleteOrderSerivce,
    getOrdersValueService,
    getProductValueService,
    getProductsMoreSalesService,
};
