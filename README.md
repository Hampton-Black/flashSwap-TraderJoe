# Flash Swap Arbitrage Bot on Avalanche

This project is partly fulfilling a bounty put out by Trader Joe's team, and partly as a learning project for myself.

This is a node.js "bot" that scans the price of the AVAX/USDT.e pools on Trader Joe and Pangolin for an arbitrage opportunity.
When one presents itself, the bot uses a flash swap, rather than flash loan, and performs the arbitrage trade.

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
