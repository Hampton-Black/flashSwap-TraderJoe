import { Logo } from "./Logo";
import MenuItems from "./MenuItems";
import Chains from "./Chains";
import TokenPrice from "./TokenPrice";
import NativeBalance from "./NativeBalance";
import Account from "./Account/Account";
import styles from "../styles/header.module.css";

export default function Header() {

    return (
        <div style={styles.header}>
            <Logo />
            <MenuItems />
            <div style={styles.headerRight}>
                <Chains />
                <TokenPrice
                address="0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
                chain="eth"
                image="https://cloudflare-ipfs.com/ipfs/QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg/"
                size="40px"
                />
                <NativeBalance />
                <Account />
            </div>
        </div>
    );
}