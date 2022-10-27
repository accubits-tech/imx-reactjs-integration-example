import { ethers, Wallet } from 'ethers';
import { Link, ImmutableXClient } from '@imtbl/imx-sdk';
import { ImmutableX } from '@imtbl/core-sdk';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getNetwork from './util/Network';
require('dotenv').config();

interface MintProps {
    client: ImmutableXClient,
    link: Link,
    wallet: any,
    setAssets?: any
}
const Minting = ({ client, link, wallet, setAssets }: MintProps) => {

  //Initialize ImmutableX Core SDK
  const config = getNetwork(process.env.REACT_APP_NETWORK_TYPE)
  const core = new ImmutableX(config)

  const [mintTokenAddressv2, setMintTokenAddressv2] = useState('')
  const [mintTokenIdv2, setMintTokenIdv2] = useState('')
  const [mintBlueprintv2, setMintBlueprintv2] = useState('')
  const [mintAmountv2, setMintAmountv2] = useState(0)
  const [mintReceivingWalletv2, setMintReceivingWalletv2] = useState('')
  const [mintRoyaltyAmountv2, setMintRoyaltyAmountv2] = useState('')
  const [mintRoyaltyWalletv2, setMintRoyaltyWalletv2] = useState('')
  const navigate = useNavigate()

  async function mintv2() {

      /**
      //If you want to mint on a back end server you can also provide the private key of your wallet directly to the minter. 
      //Please note: you should never share your private key and so ensure this is only done on a server that is not accessible from the internet
      const minterPrivateKey: string = process.env.REACT_APP_MINTER_PK ?? ''; // registered minter for your contract
      const minter = new ethers.Wallet(minterPrivateKey).connect(provider);
      **/
  
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner(); //get Signature from Metamask wallet
  
      const publicApiUrl: string = process.env.REACT_APP_SANDBOX_ENV_URL ?? '';
      const starkContractAddress: string = process.env.REACT_APP_SANDBOX_STARK_CONTRACT_ADDRESS ?? '';
      const registrationContractAddress: string = process.env.REACT_APP_SANDBOX_REGISTRATION_ADDRESS ?? '';
      const minterClient = await ImmutableXClient.build({
        publicApiUrl,
        signer,
        starkContractAddress,
        registrationContractAddress,
      })
  
      console.log(minterClient)

      const tokens = [...Array(mintAmountv2)].map((_,i) => ({
        id: (Number(mintTokenIdv2) + i).toString(),
        blueprint: 'Launch '+ (Number(mintTokenIdv2) + i),
      }))

      const result = await minterClient.mintV2([{
        contractAddress: mintTokenAddressv2.toLowerCase(),
        users: [{
          etherKey: mintReceivingWalletv2.toLowerCase(),
          tokens
        }],
        royalties: [{
          recipient: mintRoyaltyWalletv2.toLowerCase(),
          //try looking here too
          percentage: Number(mintRoyaltyAmountv2)
        }],
      }]) 
      console.log("Token Minted! Result: " + result)        
      
      const assetResponse = await core.listAssets({
        user: wallet,
        sellOrders: true
      })
      navigate('/inventory')
    }
    
  return (
      <div className='mint-div'>
        <div className='inline-mint'>

          <div className='theader-mint'>
            <h2 style={{ 'marginLeft': '21px' }}> MintV2 - with Royalties NFT</h2>
          </div>

          <div className='inline-controls '>
            <label>
              Token Address:
              <input type="text" className='input-field' value={mintTokenAddressv2} onChange={e => setMintTokenAddressv2(e.target.value)} />
            </label>

            <label>
              Token ID:
              <input type="text" className='input-field' value={mintTokenIdv2} onChange={e => setMintTokenIdv2(e.target.value)} />
            </label>

            <label>
              Receiving Wallet:
              <input type="text" className='input-field' value={mintReceivingWalletv2} onChange={e => setMintReceivingWalletv2(e.target.value)} />
            </label>

            <label>
              Amount to mint:
              <input type="text" className='input-field' value={mintAmountv2} onChange={e => setMintAmountv2(Number(e.target.value))} />
            </label>

            <label>
              Blueprint:
              <input type="text" className='input-field' value={mintBlueprintv2} onChange={e => setMintBlueprintv2(e.target.value)} />
            </label>

            <label>
              Royalty %:
              <input type="number" className='input-field' value={mintRoyaltyAmountv2} onChange={e => setMintRoyaltyAmountv2(e.target.value)} />
            </label>

            <label>
              Royalty Receiving Wallet:
              <input type="text" className='input-field' value={mintRoyaltyWalletv2} onChange={e => setMintRoyaltyWalletv2(e.target.value)} />
            </label>

            <button className='invent-btns' onClick={mintv2}>MintV2</button>
          </div>
        </div>
      </div>
  )
}

export default Minting