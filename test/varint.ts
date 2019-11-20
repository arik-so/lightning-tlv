import VarInt from '../src/varint';
import chai = require('chai');

const assert = chai.assert;

describe('VarInt Test', () => {
	it('should serialize some varints', () => {
		const testValues = [
			{
				'name': 'zero',
				'value': 0,
				'bytes': '00'
			},
			{
				'name': 'one byte high',
				'value': 252,
				'bytes': 'fc'
			},
			{
				'name': 'two byte low',
				'value': 253,
				'bytes': 'fd00fd'
			},
			{
				'name': 'two byte high',
				'value': 65535,
				'bytes': 'fdffff'
			},
			{
				'name': 'four byte low',
				'value': 65536,
				'bytes': 'fe00010000'
			},
			{
				'name': 'four byte high',
				'value': 4294967295,
				'bytes': 'feffffffff'
			},
			{
				'name': 'eight byte low',
				'value': 4294967296,
				'bytes': 'ff0000000100000000'
			},
			{
				'name': 'eight byte high',
				'value': BigInt('18446744073709551615'),
				'bytes': 'ffffffffffffffffff'
			}
		];

		for (const currentTest of testValues) {
			const value = currentTest.value;
			const expectedEncoding = currentTest.bytes;
			const varint = new VarInt(value);
			const encoding = varint.toBuffer();
			assert.equal(encoding.toString('hex'), expectedEncoding);
			const decoding = VarInt.parse(encoding);
			// the expected encoding is in hex, so twice as long
			assert.equal(decoding.length, expectedEncoding.length / 2);
			assert.equal(decoding.value, value);
		}

	});
});
