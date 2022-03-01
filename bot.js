/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
require('dotenv').config();
const { ethers } = require('ethers');
// const { MockProvider } = require('ethereum-waffle');
// const Moralis = require('moralis/node');

// Trader Joe/Pangolin ABIs
// import { abi } from './abis/IUniswapV2Pair.json';
// import { abi as _abi } from './abis/IUniswapV2Factory.json'; // where is Pangolin ABI?
const pangolinABI = require('./abis/Pangolin.json');
const joeABI = require('./abis/JoePair.json');
const traderJoeABI = require('./abis/JoeFactoryContractABI.json');

// Private Key of address that deployed smart contract
// const privateKey = process.env.PRIVATE_KEY;
// your contract address
const flashSwapAddress = process.env.FLASH_SWAPPER;

// use your own Infura node in production
// const provider = new ethers.providers.InfuraProvider('testnet', process.env.INFURA_KEY);
// const provider = new MockProvider();

// Moralis node/server
// const serverUrl = process.env.SERVER_URL;
// const appId = process.env.APP_ID;
// Moralis.start({ serverUrl, appId });
const rpcEndpoint = process.env.RPC_ENDPOINT;
const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);

// const wallet = new ethers.Wallet(privateKey, provider);
const signer = provider.getSigner();

// Amount to trade
const AVAX_TRADE = 45;
const USDT_TRADE = 3500;

const runBot = async () => {
  const joeFactory = new ethers.Contract(
    '0x60aE616a2155Ee3d9A68541Ba4544862310933d4', // Trader Joe, snowtrace.io
    traderJoeABI.abi, signer,
  );
  const pangolinFactory = new ethers.Contract(
    '0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106', // Pangolin, snowtrace.io
    pangolinABI.abi, signer,
  );
  const avaxAddress = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'; // WAVAX
  const usdtAddress = '0xc7198437980c041c805A1EDcbA50c1Ce5db95118'; // USDT.e

  let joeAvaxUsdt;
  let pangolinAvaxUsdt;

  const loadPairs = async () => {
    joeAvaxUsdt = new ethers.Contract(
      await joeFactory.getPair(avaxAddress, usdtAddress),
      joeABI.abi, signer,
    );
    pangolinAvaxUsdt = new ethers.Contract(
      await pangolinFactory.getPair(avaxAddress, usdtAddress),
      pangolinABI.abi, signer,
    );
  };

  await loadPairs();

  provider.on('block', async (blockNumber) => {
    try {
      console.log(blockNumber);

      const joeReserves = await joeAvaxUsdt.getReserves();
      const pangolinReserves = await pangolinAvaxUsdt.getReserves();

      const reserve0Joe = Number(ethers.utils.formatUnits(joeReserves[0], 18));

      const reserve1Joe = Number(ethers.utils.formatUnits(joeReserves[1], 18));

      const reserve0Pangolin = Number(ethers.utils.formatUnits(pangolinReserves[0], 18));
      const reserve1Pangolin = Number(ethers.utils.formatUnits(pangolinReserves[1], 18));

      const priceTraderJoe = reserve0Joe / reserve1Joe;
      const pricePangolin = reserve0Pangolin / reserve1Pangolin;

      const shouldStartAVAX = priceTraderJoe < pricePangolin; // what determines order?

      // subtracting two 0.3% fees for flash swap. Verify
      const spread = Math.abs((priceTraderJoe / pricePangolin - 1) * 100) - 0.6;

      const shouldTrade = spread > (
        (shouldStartAVAX ? AVAX_TRADE : USDT_TRADE)
         / Number(
           ethers.utils.formatEther(joeReserves[shouldStartAVAX ? 0 : 1]),
         ));

      console.log(`TRADER JOE PRICE ${priceTraderJoe}`);
      console.log(`PANGOLIN PRICE ${pricePangolin}`);
      console.log(`PROFITABLE? ${shouldTrade}`);
      console.log(`CURRENT SPREAD: ${(priceTraderJoe / pricePangolin - 1) * 100}%`);
      console.log(`ABSOLUTE SPREAD: ${spread}`);

      if (!shouldTrade) return;

      const gasLimit = await joeAvaxUsdt.estimateGas.swap(
        !shouldStartAVAX ? USDT_TRADE : 0,
        shouldStartAVAX ? AVAX_TRADE : 0,
        flashSwapAddress,
        ethers.utils.toUtf8Bytes('1'),
      );

      const gasPrice = await wallet.getGasPrice();

      const gasCost = Number(ethers.utils.formatEther(gasPrice.mul(gasLimit)));

      const shouldSendTx = shouldStartAVAX
        ? (gasCost / AVAX_TRADE) < spread
        : (gasCost / (USDT_TRADE / pricePangolin)) < spread;

      // don't trade if gasCost is higher than the spread
      if (!shouldSendTx) return;

      const options = {
        gasPrice,
        gasLimit,
      };
      const tx = await joeAvaxUsdt.swap(
        !shouldStartAVAX ? USDT_TRADE : 0,
        shouldStartAVAX ? AVAX_TRADE : 0,
        flashSwapAddress,
        ethers.utils.toUtf8Bytes('1'), options,
      );

      console.log('ARBITRAGE EXECUTED! PENDING TX TO BE MINED');
      console.log(tx);

      await tx.wait();

      console.log('SUCCESS! TX MINED');
    } catch (err) {
      console.error(err);
    }
  });
};

console.log('Bot started!');

runBot()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
