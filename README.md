# Token swapper

Simple script to swap ETH for ERC20 tokens. Supports Uniswap V2 and V3.

Slippage is set to infinity.

## Pre-requisites

- [Bun](https://bun.sh/)

To install Bun:

```bash
curl -fsSL https://bun.sh/install | bash
```

## Installation

Clone the repo and install dependencies with

```bash
bun install
```

## Usage

Run the script with:

```bash
bun run swap.ts v2|v3 --token <token_address> --amount <amount_in_eth> --pkey <privatekey>
```

Shorthand:

```bash
bun run swap.ts v2|v3 -t <token_address> -a <amount_in_eth> -p <privatekey>
```

Example v2 swap:

```bash
bun run swap.ts v2 --token 0x089453742936dd35134383aee9d78bee63a69b01 --amount 0.1 --pkey 0x736bd502819cd843c8d463cf5a50e5e2afa2362fdc5eb48867940b876919052a
```

Example v3 swap:

```bash
bun run swap.ts v3 -t 0x089453742936dd35134383aee9d78bee63a69b01 -a 0.1 --p 0x736bd502819cd843c8d463cf5a50e5e2afa2362fdc5eb48867940b876919052a
```

Before executing the swap the script asks for confirmation, example:

```
Swapping ETH for token 0x089453742936dd35134383aee9d78bee63a69b01 using Uniswap V2...
Input amount in ETH: 1000000000000000
Recipient: 0xE2be2C8B1c7ea0d5e5ed0DCFc4015Aa531d01EDa

Do you want to continue? (y/n)
```
