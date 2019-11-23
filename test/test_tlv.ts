import {test} from 'tap';

import TLV from '../src/tlv';

const tests = [
	{
		args: {type: 29, value: 'Hello World!'},
		description: 'A string is encoded as TLV',
		expected: {sizes: {data: 12, tlv: 14}},
	},
];

tests.forEach(({args, description, expected}) => {
	return test(description, ({end, equal}) => {
		const tlv = new TLV(args.type, Buffer.from(args.value, 'utf-8'));

		const parsed = TLV.parse(tlv.toBuffer());

		equal(Number(parsed.type), args.type, 'TLV type is preserved');
		equal(parsed.dataSize, expected.sizes.data, 'Got expected data size');
		equal(parsed.tlvSize, expected.sizes.tlv, 'Got expected TLV size');
		equal(parsed.value.toString('utf-8'), args.value, 'Got expected value');

		return end();
  });
});
