// import { useLocation } from "react-router";
import { Menu } from "antd";
// import { NavLink } from "react-router-dom";
import { useRouter } from "next/router";
import Link from "next/link";

function MenuItems() {
  const router = useRouter();
  const { pathname } = router.asPath;

  return (
    <Menu
      theme="light"
      mode="horizontal"
      style={{
        display: "flex",
        fontSize: "17px",
        fontWeight: "500",
        width: "100%",
        justifyContent: "center",
      }}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="/home">
        <Link href="/"><a>🚀 Home</a></Link>
      </Menu.Item>
      <Menu.Item key="/wallet">
        <Link href="/wallet"><a>👛 Wallet</a></Link>
      </Menu.Item>
      <Menu.Item key="/onramp">
        <Link href="/onramp"><a>💵 Fiat</a></Link>
      </Menu.Item>
      <Menu.Item key="/erc20balance">
        <Link href="/erc20balance"><a>💰 Balances</a></Link>
      </Menu.Item>
      <Menu.Item key="/erc20transfers">
        <Link href="/erc20transfers"><a>💸 Transfers</a></Link>
      </Menu.Item>
      <Menu.Item key="/contract">
        <Link href="/contract"><a>📄 Contract</a></Link>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
