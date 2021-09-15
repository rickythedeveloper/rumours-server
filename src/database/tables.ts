export interface Channel {
	id: number;
	name: string;
}

export interface Post {
	id: number;
	time: string;
	text: string;
	channel_id: number;
}

export enum Table {
	channels,
	posts,
}

export type TableProperty<T extends Table> =
	T extends Table.channels ? Channel :
		T extends Table.posts ? Post : Post;

export type OmitID<T> = Omit<T, 'id'>;
