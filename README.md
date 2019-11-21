# lightning-tlv

[![Build Status](https://travis-ci.com/arik-so/lightning-tlv.svg?branch=master)](https://travis-ci.com/arik-so/lightning-tlv)

Utility for encoding and parsing TLV packets as defined in Lightning Network's BOLT 1.

## Install

```shell script
npm install lightning-tlv
```

## Usage Examples

### BigSize

Lightning's BigSize integer serialization, which is the big-endian counterparty of Bitcoin's CompactSize.

To use it, we first need to import the class.

```typescript
import {BigSize} from 'lightning-tlv';
```

#### Serialize

```typescript
const integer = 2038; // coincidentally, also the year of the timestamp problem
const bigSize = new BigSize(integer);
const serialization = bigSize.toBuffer();
console.log(serialization.toString('hex')); // fd07f6
```

#### Deserialize

```typescript
const serialization = Buffer.from('fd07f6ae153910fd', 'hex');
const bigSize = BigSize.parse(serialization);
const bigintValue = bigSize.value;
const regularValue = Number(bigintValue);
const length = bigSize.length; // the parser knows where the BigSize portion ends
console.log(bigintValue); // 2038n
console.log(regularValue); // 2038
console.log(length); // 3
```

### HopPayload TLV

One example TLV used in Lightning is the hop payload, which is a TLV stream consisting of three concatenated TLVs,
which are the `amount_to_forward` (type 2), `outgoing_cltv_value` (type 4), and `short_channel_id` (type 6).
Types 2 and 4 are a `tu64` and a `tu32`, respectively, which are unsigned big-endian integers with trimmed leading 
zeroes. `short_channel_id` is simply a binary identifier. 

To interact with TLVs, we first need to import the class. We will also need some of the custom type handlers.

```typescript
import {TLV, TypeHandler} from 'lightning-tlv'
```

#### Serialize

```typescript
const tu64Handler = new TypeHandler.tu64();
const tu32Handler = new TypeHandler.tu32();

const amountToForwardBuffer = tu64Handler.toBuffer(23);
const amountToForwardTlv = new TLV(2, amountToForwardBuffer);

const outgoingCltvValueBuffer = tu32Handler.toBuffer(34);
const outgoingCltvValueTlv = new TLV(4, outgoingCltvValueBuffer);

const channelIdTlv = new TLV(6, Buffer.from('abcdef10', 'hex'));

const tlvStream = Buffer.concat([amountToForwardTlv.toBuffer(), outgoingCltvValueTlv.toBuffer(), channelIdTlv.toBuffer()]);
console.log(tlvStream.toString('hex')); // 0201170401220604abcdef10
```

#### Deserialize

```typescript
const tlvStream = Buffer.from('0201170401220604abcdef10', 'hex');
let remainingStream = tlvStream;

const amountToForwardTlv = TLV.parse(tlvStream);
remainingStream = remainingStream.slice(amountToForwardTlv.tlvSize);

const outgoingCltvValueTlv = TLV.parse(remainingStream);
remainingStream = remainingStream.slice(outgoingCltvValueTlv.tlvSize);

const channelIdTlv = TLV.parse(remainingStream);

const tu64Handler = new TypeHandler.tu64();
const tu32Handler = new TypeHandler.tu32();

const amountToForward = tu64Handler.fromBuffer(amountToForwardTlv.value);
const outgoingCltvValue = tu32Handler.fromBuffer(outgoingCltvValueTlv.value);
const channelId = channelIdTlv.value;
console.log(amountToForward); // 23n
console.log(outgoingCltvValue); // 34
console.log(channelId.toString('hex')); // abcdef10
```

## License

MIT
