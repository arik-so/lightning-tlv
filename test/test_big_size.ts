import {test} from 'tap';

import BigSize from '../src/big_size';

const tests = [
	{
		args: 0,
		description: 'A zero value should return a zero byte',
		expected: {bytes: '00'},
	},
	{
		args: 252,
		description: 'A byte high should return a single byte',
		expected: {bytes: 'fc'},
	},
	{
		args: 253,
		description: 'Passing byte boundary should expand into a few bytes',
		expected: {bytes: 'fd00fd'},
	},
	{
		args: 65535,
		description: 'Serialize below the 4 byte boundary should return 3 bytes',
		expected: {bytes: 'fdffff'},
	},
	{
		args: 65536,
		description: 'Serialize above the 4 byte boundary should return 5 bytes',
		expected: {bytes: 'fe00010000'},
	},
	{
		args: 4294967295,
		description: 'Serialize below the 5 byte boundary should return 5 bytes',
		expected: {bytes: 'feffffffff'},
	},
	{
		args: 4294967296,
		description: 'Serialize above the 8 byte boundary should return 9 bytes',
		expected: {bytes: 'ff0000000100000000'},
	},
	{
		args: BigInt('18446744073709551615'),
		description: 'Serialize a large number should max out the 9 bytes',
		expected: {bytes: 'ffffffffffffffffff'},
	},
];

tests.forEach(({args, description, expected}) => {
	return test(description, ({end, equal, throws}) => {
		const bigSize = new BigSize(args);
		const {bytes} = expected;

		const parsed = BigSize.parse(bigSize.toBuffer());

		equal(bigSize.toBuffer().toString('hex'), bytes, 'Got expected encoded');
		equal(bigSize.length, Buffer.from(bytes, 'hex').length, 'Got length');
		equal(parsed.value.toString(), BigInt(args).toString(), 'Got decoded');

		return end();
	});
});
