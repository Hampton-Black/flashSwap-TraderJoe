/* eslint-disable quotes */
import Metamask from "../../../public/WalletIcons/metamaskWallet.png";
import Coin98 from "../../../public/WalletIcons/Coin98.png";
import WalletConnect from "../../../public/WalletIcons/wallet-connect.svg";
import MathWallet from "../../../public/WalletIcons/MathWallet.svg";
import TokenPocket from "../../../public/WalletIcons/TokenPocket.svg";
import SafePal from "../../../public/WalletIcons/SafePal.svg";
import TrustWallet from "../../../public/WalletIcons/TrustWallet.png";

export const connectors = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: "injected",
    priority: 1,
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: "walletconnect",
    priority: 2,
  },
  {
    title: "Trust Wallet",
    icon: TrustWallet,
    connectorId: "injected",
    priority: 3,
  },
  {
    title: "MathWallet",
    icon: MathWallet,
    connectorId: "injected",
    priority: 999,
  },
  {
    title: "TokenPocket",
    icon: TokenPocket,
    connectorId: "injected",
    priority: 999,
  },
  {
    title: "SafePal",
    icon: SafePal,
    connectorId: "injected",
    priority: 999,
  },
  {
    title: "Coin98",
    icon: Coin98,
    connectorId: "injected",
    priority: 999,
  },
];
