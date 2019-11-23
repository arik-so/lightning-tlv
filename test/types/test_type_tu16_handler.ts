import {test} from 'tap';

import {TypeTu16Handler} from './../../src/types/type_tu16_handler';

const tests = [
	{
		args: 240,
		description: 'A tu16 middle single byte value is converted',
		expected: {bytes: 'f0'},
	},
	{
		args: 255,
		description: 'A tu16 maximum single byte value is converted',
		expected: {bytes: 'ff'},
	},
	{
		args: 256,
		description: 'A tu16 minimum double byte value is converted',
		expected: {bytes: '0100'},
	},
];

tests.forEach(({args, description, expected}) => {
	return test(description, ({end, equal}) => {
		const converter = new TypeTu16Handler();

		const buffer = converter.toBuffer(args);

		equal(buffer.toString('hex'), expected.bytes, 'Got expected bytes');

		const converted = converter.fromBuffer(buffer);

		equal(converted, args, 'Conversion goes backwards and forwards');

		return end();
	});
});
