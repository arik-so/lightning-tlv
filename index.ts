import VarInt from './src/varint';
import TLV from './src/tlv';
import {TypeTu16Handler} from './src/types/type_tu16_handler';
import {TypeTu32Handler} from './src/types/type_tu32_handler';
import {TypeTu64Handler} from './src/types/type_tu64_handler';

const TypeHandler = {
	tu16: TypeTu16Handler,
	tu32: TypeTu32Handler,
	tu64: TypeTu64Handler
};

export {
	TLV,
	VarInt,
	TypeHandler
};
