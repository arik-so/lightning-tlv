import TLV from '../src/tlv';
import chai = require('chai');
import {TypeTu32Handler} from '../src/types/type_tu32_handler';
import {TypeTu16Handler} from '../src/types/type_tu16_handler';
import {TypeTu64Handler} from '../src/types/type_tu64_handler';

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

	describe('TLV Type Test', () => {

		describe('Tu16 Tests', () => {
			it('should test tu16 middle single byte value', () => {
				const value = 240;
				const converter = new TypeTu16Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 1);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, 240);
			});

			it('should test tu16 maximum single byte value', () => {
				const value = 255;
				const converter = new TypeTu16Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 1);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, 255);
			});

			it('should test tu16 minimum double byte value', () => {
				const value = 256;
				const converter = new TypeTu16Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 2);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, 256);
			});
		});

		describe('Tu32 Tests', () => {
			it('should test tu32 middle single byte value', () => {
				const value = 240;
				const converter = new TypeTu32Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 1);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, 240);
			});

			it('should test tu32 maximum single byte value', () => {
				const value = 255;
				const converter = new TypeTu32Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 1);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, 255);
			});

			it('should test tu32 minimum double byte value', () => {
				const value = 256;
				const converter = new TypeTu32Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 2);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, 256);
			});

			it('should test tu32 maximum double byte value', () => {
				const value = 65535;
				const converter = new TypeTu32Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 2);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, 65535);
			});

			it('should test tu32 minimum triple byte value', () => {
				const value = 65536;
				const converter = new TypeTu32Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 3);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, 65536);
			});

			it('should test tu32 maximum triple byte value', () => {
				const value = 0xffffff;
				const converter = new TypeTu32Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 3);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, 0xffffff);
			});

			it('should test tu32 minimum quadruple byte value', () => {
				const value = 0x1000000;
				const converter = new TypeTu32Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 4);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, 0x1000000);
			});
		});

		describe('Tu64 Tests', () => {
			it('should test tu64 middle single byte value', () => {
				const value = 240;
				const converter = new TypeTu64Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 1);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, BigInt(240));
			});

			it('should test tu64 maximum single byte value', () => {
				const value = 255;
				const converter = new TypeTu64Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 1);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, BigInt(255));
			});

			it('should test tu64 minimum double byte value', () => {
				const value = 256;
				const converter = new TypeTu64Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 2);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, BigInt(256));
			});

			it('should test tu64 maximum double byte value', () => {
				const value = 65535;
				const converter = new TypeTu64Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 2);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, BigInt(65535));
			});

			it('should test tu64 minimum triple byte value', () => {
				const value = 65536;
				const converter = new TypeTu64Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 3);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, BigInt(65536));
			});

			it('should test tu64 maximum triple byte value', () => {
				const value = 0xffffff;
				const converter = new TypeTu64Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 3);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, BigInt(0xffffff));
			});

			it('should test tu64 minimum quadruple byte value', () => {
				const value = 0x1000000;
				const converter = new TypeTu64Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 4);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, BigInt(0x1000000));
			});

			it('should test tu64 maximum septuple byte value', () => {
				const value = BigInt('0xffffffffffffff');
				const converter = new TypeTu64Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 7);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, value);
			});

			it('should test tu64 mimimum octuple byte value', () => {
				const value = BigInt('0x100000000000000');
				const converter = new TypeTu64Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 8);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, value);
			});

			it('should test tu64 maximum octuple byte value', () => {
				const value = BigInt('0xffffffffffffffff');
				const converter = new TypeTu64Handler();
				const buffer = converter.toBuffer(value);
				assert.equal(buffer.length, 8);
				const restoredValue = converter.fromBuffer(buffer);
				assert.equal(restoredValue, value);
			});
		});

	});

});
