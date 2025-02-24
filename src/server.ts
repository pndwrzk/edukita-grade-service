import express from 'express';
import cors from 'cors';
import router from '@routes/routes';
import { DB } from '@database/index';
import { PORT } from './config';
import { swaggerSpec, swaggerUi } from './utils/swagger';
import {errorHandler} from './utils/error-handler'


const appServer = express();
const port = PORT;

const corsOptions: cors.CorsOptions = {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],        
    allowedHeaders: ['Content-Type', 'Authorization'],           
    credentials: true,   
    optionsSuccessStatus: 200,                                      
};

appServer.use(cors(corsOptions));
appServer.options('*', cors(corsOptions));


appServer.use(express.json());
appServer.use(express.urlencoded({ extended: true }));

appServer.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


appServer.use('/api/v1', router);
appServer.use(errorHandler);



appServer.all('*', (_req, res) => {
    res.status(404).json({ message: 'Sorry! Page not found', data : null });
});

DB.sequelize
    .authenticate()
    .then(() => {
        console.info('Database connected successfully!');
        appServer.listen(port, () => {
            console.info(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });


