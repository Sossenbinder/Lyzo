declare namespace JSX {
	type TChildren =
		| Element
		| string
		| number
		| boolean
		| null
		| typeof undefined;

	interface IntrinsicAttributes {
		children?: TChildren | TChildren[];
	}
}
