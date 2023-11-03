import 'express-async-errors';
import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { engine } from 'express-handlebars';

import { ENV } from './configs/envs';
import { header } from './middlewares/headers';

const app: Application = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: '10kb' }));

app.use(helmet());

app.use(compression());

app.use(header);

app.engine('handlebars', engine());

app.set('view engine', 'handlebars');

app.set('views', './views');

ENV.MODE.MODE === 'development' ? app.use(morgan('dev')) : '';

export default app;
