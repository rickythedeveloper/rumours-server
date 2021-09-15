import { Pool } from 'pg';
import { PROD } from '../constants';
import { Table, TableProperty } from './tables';

export const pool = PROD ?
	new Pool({
		connectionString: process.env.DATABASE_URL,
		ssl: PROD ? { rejectUnauthorized: false } : false,
	}) :
	new Pool({
		database: 'rumours',
	});

export const getRowsWithProperties = async <T extends Table>(
	table: T,
	properties?: Partial<TableProperty<T>>,
	conditionType: 'AND' | 'OR' = 'AND',
): Promise<TableProperty<T>[]> => {
	if (properties === undefined || Object.entries(properties).length === 0) {
		const results = await pool.query<TableProperty<T>>(`SELECT * FROM ${Table[table]}`);
		return results.rows;
	} else {
		let queryString =
			`SELECT * FROM ${Table[table]} WHERE `
			+ Object.keys(properties).map((key, index) => `${key}=$${index + 1}`).join(` ${conditionType} `);
		const results = await pool.query<TableProperty<T>>(queryString, Object.values(properties));
		return results.rows;
	}
};
