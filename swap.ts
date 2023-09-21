import { parseGwei, parseEther } from "viem";
import { account, publicClient, walletClient } from "./config";
import { abiUniswapV3 } from "./abiUniswapV3";
import { abiUniswapV2 } from "./abiUniswapV2";

const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const token = Bun.argv[4];
const recipient = account.address;

const amountToBuyInEther = parseEther(Bun.argv[6]);

const swapETHForTokenUniV3 = async () => {
  const exactInputSingleParams = {
    tokenIn: WETH,
    tokenOut: token,
    fee: 10000, // 1% fee for shitcoin pairs (high volatility)
    recipient: recipient,
    amountIn: amountToBuyInEther,
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
  };

  const { request } = await publicClient.mainnet.simulateContract({
    address: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45", // Uniswap V3 Router
    abi: abiUniswapV3,
    functionName: "exactInputSingle",
    args: [exactInputSingleParams],
    //gas: 200000,
    //maxFeePerGas: parseGwei("200"),
    //maxPriorityFeePerGas: parseGwei("2"),
    value: amountToBuyInEther,
    account,
  });

  const hash = await walletClient.writeContract(request);
  console.log("hash", hash);
  console.log("Transaction executed!");
};

const swapETHForTokenUniV2 = async () => {
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 10 minutes from the current Unix time

  const { request } = await publicClient.mainnet.simulateContract({
    address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // Uniswap V2 Router
    abi: abiUniswapV2,
    functionName: "swapExactETHForTokens",
    args: [
      0, // amountOutMin
      [
        WETH, // tokenIn
        token, // tokenOut
      ],
      account.address, // to
      deadline, // deadline
    ],
    //gas: 200000,
    //maxFeePerGas: parseGwei("200"),
    //maxPriorityFeePerGas: parseGwei("2"),
    value: amountToBuyInEther,
    account,
  });

  const hash = await walletClient.writeContract(request);
  console.log("hash", hash);
  console.log("Transaction executed!");
};

const askForConfirmation = async () => {
  console.log(`\nSwapping ETH for token ${token}`);
  console.log(`Input amount in ETH: ${Bun.argv[6]}`);
  console.log(`Recipient: ${recipient}\n`);
  const prompt = "Do you want to continue? (y/n) ";
  process.stdout.write(prompt);
  for await (const line of console) {
    if (line == "y") break;
    else if (line == "n") process.exit(0);
    else process.stdout.write(prompt);
  }
};

if (Bun.argv[2] == "v3") {
  console.log(`\nSelected Uniswap V3...`);

  await askForConfirmation();

  swapETHForTokenUniV3();
} else if (Bun.argv[2] == "v2") {
  console.log(`\nSelected Uniswap V2...`);

  await askForConfirmation();

  swapETHForTokenUniV2();
} else console.log("Invalid argument");
