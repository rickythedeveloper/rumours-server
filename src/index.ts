import express from 'express';
import cors from 'cors';

export const PROD = (process.env.PORT) ? true : false;
export const PORT = process.env.PORT || 8000;

const app = express();
const corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`);
});

