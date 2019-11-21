export interface TLVType<T> {

	fromBuffer(buffer: Buffer): T;

	toBuffer(value: T): Buffer;

}
