import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;

async function getOrder(id) {
    const allOrders = await getOrders();
    const order = allOrders.find(order => order.id === parseInt(id));
    if (order) {
        return order;
    }
    throw new Error('Registro não foi encontrado 1');
}

async function getOrders() {
    const allOrders = JSON.parse(await readFile(global.fileName));
    return allOrders.pedidos;
}

async function insertOrder(order) {
    const allOrders = JSON.parse(await readFile(global.fileName));

    order = {
        id: allOrders.nextId++,
        cliente: order.cliente,
        produto: order.produto,
        valor: order.valor,
        entregue: false,
        timestamp: new Date(),
    };

    allOrders.pedidos.push(order);
    await writeFile(global.fileName, JSON.stringify(allOrders, null, 4));
    return order;
}

async function updateOrder(order) {
    const allOrders = JSON.parse(await readFile(global.fileName));
    const index = allOrders.pedidos.findIndex(({ id }) => id === order.id);
    if (index === -1) {
        throw new Error('Registro não foi encontrado');
    }
    allOrders.pedidos[index].cliente = order.cliente;
    allOrders.pedidos[index].produto = order.produto;
    allOrders.pedidos[index].valor = order.valor;
    allOrders.pedidos[index].entregue = order.entregue;
    allOrders.pedidos[index].timestamp = new Date();
    await writeFile(global.fileName, JSON.stringify(allOrders, null, 4));
    return allOrders.pedidos[index];
}

async function deleteOrder(id) {
    const allOrders = JSON.parse(await readFile(global.fileName));
    allOrders.pedidos = allOrders.pedidos.filter(
        order => order.id !== parseInt(id)
    );
    await writeFile(global.fileName, JSON.stringify(allOrders, null, 4));
    return allOrders;
}

export default { getOrder, getOrders, insertOrder, updateOrder, deleteOrder };
