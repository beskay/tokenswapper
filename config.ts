import { http, createPublicClient, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";

////////////////////////////////////////////////////////////////////
// Clients

const transport = http("https://eth.llamarpc.com");

export const publicClient = {
  mainnet: createPublicClient({
    chain: mainnet,
    transport,
  }),
};

export const account = privateKeyToAccount(Bun.argv[8]);

export const walletClient = createWalletClient({
  account,
  chain: mainnet,
  transport,
});
