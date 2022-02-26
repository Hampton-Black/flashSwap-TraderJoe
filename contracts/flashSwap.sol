// SPDX-License-Identifier: MIT
pragma solidity =0.6.12;

//import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Callee.sol";
import "@traderjoe-xyz/core/contracts/traderjoe/interfaces/IJoeCallee.sol";

// import "./UniswapV2Library.sol";
import "@traderjoe-xyz/core/contracts/traderjoe/libraries/JoeLibrary.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
// import "./interfaces/IUniswapV2Pair.sol";
import "@traderjoe-xyz/core/contracts/traderjoe/interfaces/IJoePair.sol";
import "@traderjoe-xyz/core/contracts/traderjoe/interfaces/IERC20.sol";

contract flashSwap is IJoeCallee {
    address immutable factory;
    uint256 constant deadline = 10 days;
    IUniswapV2Router02 immutable pangolinRouter;

    constructor(
        address _factory,
        //address _joeRouter,
        address _pangolinRouter
    ) public {
        factory = _factory;
        pangolinRouter = IUniswapV2Router02(_pangolinRouter);
    }

    function joeCall(
        address _sender,
        uint256 _amount0,
        uint256 _amount1,
        bytes calldata _data
    ) external override {
        address[] memory path = new address[](2);
        uint256 amountToken = _amount0 == 0 ? _amount1 : _amount0;

        address token0 = IJoePair(msg.sender).token0();
        address token1 = IJoePair(msg.sender).token1();

        require(
            msg.sender == JoeLibrary.pairFor(factory, token0, token1),
            "Unauthorized"
        );
        require(_amount0 == 0 || _amount1 == 0);

        path[0] = _amount0 == 0 ? token1 : token0;
        path[1] = _amount0 == 0 ? token0 : token1;

        IERC20Joe token = IERC20Joe(_amount0 == 0 ? token1 : token0);

        token.approve(address(pangolinRouter), amountToken);

        // no need for require() check, if amount required is not sent pangolinRouter will revert
        uint256 amountRequired = JoeLibrary.getAmountsIn(
            factory,
            amountToken,
            path
        )[0];
        uint256 amountReceived = pangolinRouter.swapExactTokensForTokens(
            amountToken,
            amountRequired,
            path,
            msg.sender,
            deadline
        )[1];

        // YEAHH PROFIT
        token.transfer(_sender, amountReceived - amountRequired);
    }
}
