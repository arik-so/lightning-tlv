import {test} from 'tap';

import {TypeTu32Handler} from './../../src/types/type_tu32_handler';

const tests = [
	{
		args: 240,
		description: 'A tu32 middle 1 byte value is converted',
		expected: {bytes: 'f0'},
	},
	{
		args: 255,
		description: 'A tu32 maximum 1 byte value is converted',
		expected: {bytes: 'ff'},
	},
	{
		args: 256,
		description: 'A tu32 minimum 2 byte value is converted',
		expected: {bytes: '0100'},
	},
	{
		args: 65535,
		description: 'A tu32 maximum 2 byte value is converted',
		expected: {bytes: 'ffff'},
	},
	{
		args: 65536,
		description: 'A tu32 minimum 3 byte value is converted',
		expected: {bytes: '010000'},
	},
	{
		args: 0xffffff,
		description: 'A tu32 maximum 3 byte value is converted',
		expected: {bytes: 'ffffff'},
	},
	{
		args: 0x1000000,
		description: 'A tu32 minimum 4 byte value is converted',
		expected: {bytes: '01000000'},
	},
];

tests.forEach(({args, description, expected}) => {
	return test(description, ({end, equal}) => {
		const converter = new TypeTu32Handler();

		const buffer = converter.toBuffer(args);

		equal(buffer.toString('hex'), expected.bytes, 'Got expected bytes');

		const converted = converter.fromBuffer(buffer);

		equal(converted, args, 'Conversion goes backwards and forwards');

		return end();
	});
});
