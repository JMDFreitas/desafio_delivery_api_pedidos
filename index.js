import express from 'express';
import winston from 'winston';
import { promises as fs } from 'fs';
import OrderRoutes from './routes/ordersRoutes.js';

/** Variavel glogal pode ser usada em todo o prejeto */
global.fileName = 'pedidos.json';

/** Construção e gravação do logger customizavel */
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
    level: 'silly',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'my-orders-delivery-api.log' }),
    ],
    format: combine(
        label({ label: 'my-ordersdelivery-api' }),
        timestamp(),
        myFormat
    ),
});
/** Construção e gravação do logger customizavel */

const { readFile } = fs;
const app = express();
app.use(express.json());
app.use('/orders', OrderRoutes);

app.listen(3000, async () => {
    try {
        await readFile('pedidos.json');
        global.logger.info('API DELIVERY STARTED!');
    } catch (err) {
        global.logger.error(err);
    }
});
