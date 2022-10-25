import './App.css';
import { Link, ImmutableXClient, ProviderPreference } from '@imtbl/imx-sdk';
import { ImmutableX, Balance, ImmutableXConfiguration } from "@imtbl/core-sdk";
import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Marketplace from './Marketplace';
import Inventory from './Inventory';
import Bridging from './Bridging';
import Sidebar from "./Components/Sidebar/Sidebar";
import getRoutes from "./util/Router";
import { ethers } from "ethers";
import getNetworkConfig from './util/Network';

require('dotenv').config();

const App = () => {
  const [selectedDetails, setSelectedDetails] = useState<any>(Object)

  // Initialize ImmutableX Core SDK
  const config: ImmutableXConfiguration = getNetworkConfig(process.env.REACT_APP_NETWORK_TYPE)
  const core = new ImmutableX(config)

  // initialise ImmutableX Link SDK
  const link = new Link(process.env.REACT_APP_SANDBOX_LINK_URL)
  
  // general
  const [tab, setTab] = useState<string>("marketplace")
  const [wallet, setWallet] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [balance, setBalance] = useState<string>("")
  const [client, setClient] = useState<ImmutableXClient>(Object)
  const [sidebar, setSidebar] = useState(true)
  const [selectedOrderId, setSelectedOrderId] = useState("")
  const [statemaintain, setStatemaintain] = useState<any>([])

  useEffect(() => {
    buildIMXClient()
  }, [])

  const setAssets = (data: any) => {
    localStorage.setItem("assetdetail", JSON.stringify(data));
  };

  // initialise an Immutable X Client to interact with apis more easily
  async function buildIMXClient() {
    const publicApiUrl: string = process.env.REACT_APP_SANDBOX_ENV_URL ?? '';
    setClient(await ImmutableXClient.build({publicApiUrl}))
  }

  async function linkSetup(providerPreference:ProviderPreference): Promise<void> {
    const linkRes = await link.setup({ providerPreference })
    setAddress(linkRes.address)

    localStorage.setItem("address", address)
    setWallet(address)

    console.log("Link Response: " + linkRes)

    updateBalance(core,address)
  }

  const getUpdatedEthBalance = async(core:ImmutableX, address:string) => {
    const res:Balance = await core.getBalance({
      owner: address,
      address: "eth",
    })
  
    const unformattedBalance: string = res.balance
  
    const formattedBalance = ethers.utils.formatUnits(
      res.balance,
      18
    )
  
    return formattedBalance
  }

  const updateBalance = async(core:ImmutableX, address:string) => {
    setBalance(await getUpdatedEthBalance(core, address))

    localStorage.setItem("balance", balance);
  }

  const disconnectWalletHandler = () => {
    setWallet("undefined");
    localStorage.removeItem("address");
    localStorage.removeItem("balance");
    localStorage.removeItem("stateDetails");
    localStorage.removeItem("assetdetail");
    localStorage.removeItem("Result");
    localStorage.removeItem("signinMessage");
  };

  function handleTabs() {
    if (client.address) {
      switch (tab) {
        case 'inventory':
          if (wallet === 'undefined') return <div>Connect wallet</div>
          return <Inventory
            client={client}
            link={link}
            wallet={wallet}
          />
        case 'bridging':
          if (wallet === 'undefined') return <div>Connect wallet</div>
          return <Bridging
            client={client}
            link={link}
            wallet={wallet}
          />
        default:
          return (
            <Marketplace
              client={client}
              link={link}
              //selectedOrderId={selectedOrderId}
            />
          )
      }
    }
    return null
  }

  const setSidebarHandler = (value: boolean) => {
    return setSidebar(value);
  };

  const getSelectedDetails = () => {
    setSelectedDetails(JSON.parse(localStorage.getItem("assetdetail") || "{}"));
    //setBalance(JSON.parse(localStorage.getItem("balance") || "{}"));
    setWallet(localStorage.getItem("address") || "undefined");
    setStatemaintain(JSON.parse(localStorage.getItem("stateDetails") || "{}"));
  };

  const redirect = (btnName: any) => {
    if (btnName == "Start") {
      window.open(
        "https://docs.x.immutable.com/",
        "_blank",
        "noopener,noreferrer"
      );
      // window.location.href = "";
    } else if (btnName == "Contact") {
      window.open(
        "https://www.immutable.com/contact",
        "_blank",
        "noopener,noreferrer"
      );
      // window.location.href = "";
    }
  };

  return (
    <div className="App">
      <div className="sidebar">
        {sidebar && (
          <Sidebar
            balance={balance}
            wallet={wallet}
            core={core}
            signin={linkSetup}
            setSideHandler={setSidebarHandler}
            disconnectWalletHandler={disconnectWalletHandler}
            getSelectedDetails={getSelectedDetails}
          />
        )}
        <div className="inner-section">
          <div className="header-title">
            {!sidebar && (
              <div className="hamburger-div">
                <svg
                  aria-hidden="true"
                  className="pointer"
                  onClick={() => setSidebarHandler(true)}
                  role="img"
                  width="3em"
                  height="3em"
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
            )}
            <div className="header-text-div">
              <h1>Powering the next generation of web3 games</h1>
              <div className="header-btn">
                <button
                  className="button1"
                  onClick={(e) => redirect("Start")}
                  type="button"
                >
                  Start Building
                </button>
                <button
                  className="button2"
                  onClick={(e) => redirect("Contact")}
                  type="button"
                >
                  Contact Us
                </button>
              </div>
            </div>
            <div className="logoframe">
              <iframe
                src={
                  "https://player.vimeo.com/video/720459459?h=8ce82285ae&autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0&background=1:"
                }
              ></iframe>
            </div>
          </div>
          <div className="sub-content">
            <Routes>
              {getRoutes().map((item:any, key:number) => (
                <Route
                  path={item.path}
                  key={key}
                  element={
                    (wallet && wallet !== "undefined") || item.skip ? (
                      <item.element
                        client={client}
                        selectedOrderId={selectedOrderId}
                        setSelectedOrderId={setSelectedOrderId}
                        link={link}
                        wallet={localStorage.getItem("address")}
                        sigin={linkSetup}
                        stateDetails={[statemaintain]}
                        details={selectedDetails}
                        getSelectedDetails={getSelectedDetails}
                        setAssets={setAssets}
                      />
                    ) : (
                      <div className='inline-mint connect-wallet-section'>
                        <h1>Connect Wallet</h1>
                      </div>
                    )
                  }
                ></Route>
              ))}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
