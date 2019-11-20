import TLV from '../src/tlv';
import chai = require('chai');

const assert = chai.assert;

describe('TLV Test', () => {

	it('should parse TLV', () => {
		const tlv = new TLV(29, Buffer.from('Hello World!', 'utf-8'));
		const tlvBuffer = tlv.toBuffer();
		const expandedBuffer = Buffer.concat([tlvBuffer, Buffer.alloc(42, 10)]);
		const restoredTlv = TLV.parse(tlvBuffer);
		assert.equal(Number(restoredTlv.type), 29);
		assert.equal(restoredTlv.dataSize, 12);
		assert.equal(restoredTlv.tlvSize, 14);
		assert.equal(restoredTlv.value.toString('utf-8'), 'Hello World!');
	});

});
