import {TLVType} from '../tlv_type';

class Tu32 implements TLVType<number> {

	fromBuffer(buffer: Buffer): number {
		return undefined;
	}

	toBuffer(value: number): Buffer {
		return undefined;
	}

}
