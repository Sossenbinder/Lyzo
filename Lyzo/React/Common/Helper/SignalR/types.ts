export enum NotificationType {
	StockPost,
}

export enum Operation {
	Create,
	Update,
	Delete
}

export type Notification<T> = {

	readonly Operation: Operation;

	readonly NotificationType: NotificationType;

	readonly Payload: T;
}