import express from 'express';
import cors from 'cors';
import { PORT, PROD } from './constants';
import * as db from './database';
import { Table } from './database/tables';
import { apiPerform } from './api';

const app = express();

if (PROD) {
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
}
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.get('/posts', async (req, res) => {
	await apiPerform(res, () => {
		return db.getRowsWithProperties(Table.posts, req.query);
	});
});
app.post('/posts', async (req, res) => {
	await apiPerform(res, () => {
		return db.insertIntoTable(Table.posts, req.body);
	});
});

app.get('/channels', async (req, res) => {
	await apiPerform(res, () => {
		return db.getRowsWithProperties(Table.channels, req.query);
	});
});
app.post('/channels', async (req, res) => {
	await apiPerform(res, () => {
		return db.insertIntoTable(Table.channels, req.body);
	});
});

app.get('/apitest', (req, res) => {
	res.json({ testJson: 'Hello World' });
});

app.listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`);
});

