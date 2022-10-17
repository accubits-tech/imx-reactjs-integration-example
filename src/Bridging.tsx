
import { Link, ImmutableXClient, ImmutableMethodResults, ERC721TokenType, ETHTokenType, ImmutableRollupStatus, ERC20TokenType  } from '@imtbl/imx-sdk';
import { ImmutableX, ImmutableXConfiguration } from '@imtbl/core-sdk';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import getNetworkConfig from './util/Network';
require('dotenv').config();

interface BridgingProps {
  client: ImmutableXClient,
  link: Link,
  wallet: string
}

const Bridging = ({client, link, wallet}: BridgingProps) => {
  // withdrawals
  const location = useLocation();

  //Initialize ImmutableX Core SDK
  const config: ImmutableXConfiguration = getNetworkConfig(process.env.REACT_APP_NETWORK_TYPE)
  const core = new ImmutableX(config)
  
  const [screenName, setScreenName] = useState("");
  const [preparingWithdrawals, setPreparingWithdrawals] = useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);
  const [readyWithdrawals, setReadyWithdrawals] = useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);
  const [completedWithdrawals, setCompletedWithdrawals] = useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);

  //ETH
  const [depositAmountETH, setDepositAmountETH] = useState('');
  const [prepareAmountETH, setPrepareAmountETH] = useState('');

  //ERC20
  const [depositAmountERC20, setDepositAmountERC20] = useState('');
  const [prepareAmountERC20, setPrepareAmountERC20] = useState('');
  const [depositTokenSymbolERC20, setDepositTokenSymbolERC20] = useState('');
  const [depositTokenAddressERC20, setDepositTokenAddressERC20] = useState('');

  //NFT
  const [depositTokenIdNFT, setDepositTokenIdNFT] = useState('');
  const [depositTokenAddressNFT, setDepositTokenAddressNFT] = useState('');
  const [prepareTokenIdNFT, setPrepareTokenIdNFT] = useState('');
  const [prepareTokenAddressNFT, setPrepareTokenAddressNFT] = useState('');
  const [completeTokenIdNFT, setCompleteTokenIdNFT] = useState('');
  const [completeTokenAddressNFT, setCompleteTokenAddressNFT] = useState('');

  useEffect(() => {
    setScreenName(location?.pathname?.split("/")[1])
    const checkPath = location?.pathname?.split("/")[1]
    if (checkPath == 'withdrawal') {
      load()
    }
  }, [location?.pathname])

  async function load(): Promise<void> {
    // setPreparingWithdrawals(await client.getWithdrawals({
    //   user: wallet,
    //   rollup_status: ImmutableRollupStatus.included
    // })) // included in batch awaiting confirmation
    // setReadyWithdrawals(await client.getWithdrawals({
    //   user: wallet,
    //   rollup_status: ImmutableRollupStatus.confirmed,
    //   withdrawn_to_wallet: false
    // })) // confirmed on-chain in a batch and ready to be withdrawn
    // setCompletedWithdrawals(await client.getWithdrawals({
    //   user: wallet,
    //   withdrawn_to_wallet: true
    // })) // confirmed on-chain in a batch and already withdrawn to L1 wallet
  };

  // deposit eth
  async function depositETH() {
    await link.deposit({
      type: ETHTokenType.ETH,
      amount: depositAmountETH,
    })
  };

  async function depositERC20() {
    await link.deposit({
      type: ERC20TokenType.ERC20,
      tokenAddress: depositTokenAddressERC20,
      symbol: depositTokenSymbolERC20,
      amount: depositAmountERC20,
    })
  };

  // deposit an NFT
  async function depositNFT() {
    await link.deposit({
      type: ERC721TokenType.ERC721,
      tokenId: depositTokenIdNFT,
      tokenAddress: depositTokenAddressNFT
    })
  };

  // prepare an NFT withdrawal
  async function prepareWithdrawalNFT() {
    await link.prepareWithdrawal({
      type: ERC721TokenType.ERC721,
      tokenId: prepareTokenIdNFT,
      tokenAddress: prepareTokenAddressNFT
    })
  };

  // prepare an eth withdrawal
  async function prepareWithdrawalETH() {
    await link.prepareWithdrawal({
      type: ETHTokenType.ETH,
      amount: prepareAmountETH,
    })
  };

  // complete an NFT withdrawal
  async function completeWithdrawalNFT() {
    await link.completeWithdrawal({
      type: ERC721TokenType.ERC721,
      tokenId: completeTokenIdNFT,
      tokenAddress: completeTokenAddressNFT
    })
  };

  // complete an eth withdrawal
  async function completeWithdrawalETH() {
    await link.completeWithdrawal({
      type: ETHTokenType.ETH,
    })
  };

  async function fiatToCryptoHandler(): Promise<void> {
    const res = await link.fiatToCrypto({})
  };

  return (
    <div className='mint-div'>
      <div className='inline-mint'>

        {/* Deposits */}

        {screenName == 'deposit' &&
          <>
            {/* ETH */}

            <div className='theader-mint'>
              <h2 style={{ 'marginLeft': '21px' }}>ETH</h2>
            </div>

            <div className='inline-controls order '>
              <label>
                Amount (ETH):
                <input type="text" className='input-field' value={depositAmountETH} onChange={e => setDepositAmountETH(e.target.value)} />
              </label>

              <br />

              <button className='invent-btns' onClick={depositETH}>Deposit ETH</button>
            </div>
            
            <br />

            {/* ERC20 */}

            <div className='theader-mint'>
              <h2 style={{ 'marginLeft': '21px' }}>ERC20</h2>
            </div>

            <div className='inline-controls '>
              <label>
                Token Symbol:
                <input type="text" className='input-field' value={depositTokenSymbolERC20} onChange={e => setDepositTokenSymbolERC20(e.target.value)} />
              </label>
              <label>
                Token Address:
                <input type="text" className='input-field' value={depositTokenAddressERC20} onChange={e => setDepositTokenAddressERC20(e.target.value)} />
              </label>
              <label>
                Amount (ERC20):
                <input type="text" className='input-field' value={depositAmountERC20} onChange={e => setDepositAmountERC20(e.target.value)} />
              </label>

              <button className='invent-btns' onClick={depositERC20}>Deposit ERC20</button>
            </div>

            <br />

            {/* NFT */}
            
            <div className='theader-mint'>
              <h2 style={{ 'marginLeft': '21px' }}>NFT:</h2>
            </div>

            <div className='inline-controls '>
              <label>
                Token ID:
                <input type="text" className='input-field' value={depositTokenIdNFT} onChange={e => setDepositTokenIdNFT(e.target.value)} />
              </label>
              <label>
                Token Address:
                <input type="text" className='input-field' value={depositTokenAddressNFT} onChange={e => setDepositTokenAddressNFT(e.target.value)} />
              </label>

              <br />

              <button className='invent-btns' onClick={depositNFT}>Deposit NFT</button>
            </div>

            <br />
            
            {/* Fiat */}

            <div className='theader-mint'>
              <h3 style={{ 'marginLeft': '21px' }}>Fiat to Crypto Deposit:</h3>
            </div>

            <div style={{ 'marginLeft': '21px' }}>
              <button className='invent-btns' style={{ marginTop: '0px' }} onClick={fiatToCryptoHandler}>Deposit Fiat</button>
            </div>
          </>
        }

        {screenName == 'withdrawal' &&
          <>
            <div className='theader-mint'>
              <h4 style={{ 'marginLeft': '21px' }}>Prepare ETH for withdrawal (submit to be rolled up and confirmed on chain in the next batch):</h4>
            </div>

            <div className='inline-controls order'>
              <label>
                Amount (ETH):
                <input type="text" className='input-field' value={prepareAmountETH} onChange={e => setPrepareAmountETH(e.target.value)} />
              </label>
              <button className='invent-btns deposit-btn' onClick={prepareWithdrawalETH}>Prepare ETH Withdrawal</button>
            </div>
            <div className='theader-mint'>
              <h4 style={{ 'marginLeft': '21px' }}> Complete ETH withdrawal (withdraws entire eth balance that is ready for withdrawal to L1 wallet):</h4>
            </div>


            <div className="inline-controls">
              <button className='invent-btns deposit-btn complete-btn' onClick={completeWithdrawalETH}>Complete ETH Withdrawal</button>
            </div>
          </>
        }

        {screenName == 'withdrawal' &&
          <>
            <div className='theader-mint'>
              <h4 style={{ 'marginLeft': '21px' }}>  Prepare NFT for withdrawal (submit to be rolled up and confirmed on chain in the next batch):</h4>
            </div>

            <div className='inline-controls'>
              <label>
                Token ID:
                <input type="text" className='input-field' value={prepareTokenIdNFT} onChange={e => setPrepareTokenIdNFT(e.target.value)} />
              </label>
              <label>
                Token Address:
                <input type="text" className='input-field' value={prepareTokenAddressNFT} onChange={e => setPrepareTokenAddressNFT(e.target.value)} />
              </label>
              <button className='invent-btns deposit-btn' onClick={prepareWithdrawalNFT}>Prepare NFT Withdrawal</button>
            </div>

            <div className='theader-mint'>
              <h4 style={{ 'marginLeft': '21px' }}> Complete NFT withdrawal (withdraws single NFT that is ready for withdrawal to L1 wallet):</h4>
            </div>

            <div className='inline-controls'>

              <label>
                Token ID:
                <input type="text" className='input-field' value={completeTokenIdNFT} onChange={e => setCompleteTokenIdNFT(e.target.value)} />
              </label>
              <label>
                Token Address:
                <input type="text" className='input-field' value={completeTokenAddressNFT} onChange={e => setCompleteTokenAddressNFT(e.target.value)} />
              </label>
              <button className='invent-btns deposit-btn' onClick={completeWithdrawalNFT}>Complete NFT Withdrawal</button>
            </div>
            <div>
              Withdrawals being prepared:
              {JSON.stringify(preparingWithdrawals)}
            </div>
            <br/><br/>
            <div>
              Ready for withdrawal:
              {JSON.stringify(readyWithdrawals)}
            </div>
            <br/><br/>
            <div>
              Withdrawn to wallet:
              {JSON.stringify(completedWithdrawals)}
            </div>
          </>
        }

        
      </div>
    </div>
  );
}

export default Bridging;
