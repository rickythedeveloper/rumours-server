import express from 'express';
import cors from 'cors';

export const PROD = (process.env.PORT) ? true : false;
export const PORT = process.env.PORT || 8000;

const app = express();

const whitelist = ['http://localhost:3000', 'https://rtd-rumours-client.herokuapp.com'];
const corsOptions = {
	origin: (origin: string | undefined, callback: (err: Error | null, origin?: boolean) => void) => {
		if (origin === undefined || whitelist.indexOf(origin) === -1) {
			callback(new Error('Not allowed by CORS'));
			return;
		} else {
			callback(null, true);
		}
	},
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.get('/apitest', (req, res) => {
	res.json({ testJson: 'Hello World' });
});

app.listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`);
});

