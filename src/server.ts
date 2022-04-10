import express from 'express';
import routes from './routes/index';
import { ErrorHandler } from './middlewares/errorHandler';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ErrorCode, ErrorMsg } from './models/apiResponse';

const app = express();

app.listen(3001, () => {
    console.log(`server started at http://localhost:3001/api`);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//middleware for CORS requests
const corsOption = {
    origin: ['*'],
    optionsSuccessStatus: 200, // for some lagacy browsers
};
app.use(cors(corsOption));

app.use('/api', routes);

app.use((req, res) => ErrorHandler.sendCorrectError(res, ErrorCode.BadRequestError, ErrorMsg.General_NotFoundError));

export default app;
