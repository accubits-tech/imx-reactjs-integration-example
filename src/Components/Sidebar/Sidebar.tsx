import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ImmutableX, Balance, ImmutableXConfiguration } from "@imtbl/core-sdk";
import useOnclickOutside from "react-cool-onclickoutside";
import "./Sidebar.css";
import { ProviderPreference } from "@imtbl/imx-sdk";

interface Props {
  balance: string
  wallet: string
  core: ImmutableX
  signin: (providerPreference:ProviderPreference) => any;
  setSideHandler: (params: boolean) => any;
  disconnectWalletHandler: () => any;
  getSelectedDetails: any;
}

const Sidebar = ({
  wallet,
  balance,
  core,
  signin,
  setSideHandler,
  disconnectWalletHandler,
  getSelectedDetails,
}: Props) => {
  const [sidebarTab, setSidebarTab] = useState("listing")
  const [addressDropdown, setAddressDropdown] = useState(false)
  const [walletDropdown, setWalletDropdown] = useState(false)

  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSidebarTab(location?.pathname?.split("/")[1]);
  }, [location?.pathname]);

  useEffect(() => {
    getSelectedDetails()
  }, []);

  const dropDownClick = useOnclickOutside(() => {
    setAddressDropdown(false);
  });

  const sidebarConfig = [
    {
      LabelName: "Listing",
      Link: "/listing",
      icon: "fa fa-briefcase",
    },
    {
      LabelName: "Inventory",
      Link: "/inventory",
      icon: "fa fa-user",
    },
    {
      LabelName: "Mint",
      Link: "/minting",
      icon: "fa fa-plus",
    },
    {
      LabelName: "Deposit",
      Link: "/deposit",
      icon: "fa fa-hand-o-up",
    },
    {
      LabelName: "Withdrawal",
      Link: "/withdrawal",
      icon: "fa fa-hand-o-down",
    },
    {
      LabelName: "Settings",
      Link: "/settings",
      icon: "fa fa-gear",
    },
  ];

  return (
    <div className="main-sidebar">
      <div className="hamburger-div">
        <img src="https://gateway.pinata.cloud/ipfs/Qma4mx3nFs9fj95teBw19mwFHyUf1m6enPeVpxcngn93GK/logo.svg" alt="immutableX" />
        <svg
          aria-hidden="true"
          className="pointer"
          onClick={() => setSideHandler(false)}
          role="img"
          width="2em"
          height="2em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 16 16"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"
          />
        </svg>
      </div>
      <div className="logo">
        <div className="signin-btn" ref={dropDownClick}>
          <button
            className={
              wallet && wallet !== "undefined"
                ? "connect-btn wallet-text"
                : "connect-btn"
            }
            onClick={
              wallet && wallet !== "undefined" ?
                () => setAddressDropdown(!addressDropdown)
                :
                () => setWalletDropdown(!walletDropdown)
            }
            type="button"
          >
            {wallet && wallet !== "undefined" ? (
              <>
                {wallet?.slice(0, 6)}...{wallet?.slice(-4)}
                <i className="fa fa-angle-down"></i>
              </>
            ) : (
              `Connect Wallet`
            )}
          </button>
          {walletDropdown && (
            <div className="walletDropdown">
              <div
                className="select-wallet pointer"
                onClick={() => {
                  signin(ProviderPreference.METAMASK)
                  navigate("/listing")
                  setWalletDropdown(false)
                }}
              >
                Metamask
              </div>
              <div
                className="select-wallet pointer"
                onClick={() => {
                  signin(ProviderPreference.MAGIC_LINK)
                  navigate("/listing")
                  setWalletDropdown(false)
                }}
              >
                Magic
              </div>
            </div>
          )}
          {addressDropdown && (
            <div className="addressDropdown">
              <div
                className="disconnect-wallet pointer"
                onClick={() => {
                  disconnectWalletHandler()
                  navigate("/listing")
                  setAddressDropdown(false)
                }}
              >
                Disconnect Wallet
              </div>
            </div>
          )}
        </div>
      </div>
      <ul className="sidebar-options">
        {
          sidebarConfig.map((menu, ind) => {
            return (
              <li
                key={ind}
                className={`${
                  menu.Link.includes(sidebarTab) ? "active-tab" : "tab"
                }   pointer`}
                onClick={() => {
                  navigate(menu.Link);
                }}
              >
                <i className={menu.icon} aria-hidden="true"></i>
                <span>{menu.LabelName}</span>
              </li>
            );
          })
        }
      </ul>
      {wallet && wallet !== "undefined" && (
        <div className="balance-div">
          <h5>
            Your Balance <br></br>{" "}
            <div className="inline-text">
              {balance}
            </div>
          </h5>
          <div className="eth-div">
            <span className="eth-icon">
              <i className="fab fa-ethereum"></i>
            </span>
            ETH
          </div>
          <button
            className="bal-btn pointer"
            type="button"
            onClick={() => {
              navigate("/deposit");
            }}
          >
          <i className="fa fa-plus-circle"></i>
            <span className="bal-btn-text">Top Up Balance</span>
            <i className="fa fa-angle-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar
