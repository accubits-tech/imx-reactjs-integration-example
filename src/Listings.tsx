import { Link } from '@imtbl/imx-sdk';
import './Listings.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface InventoryProps {
  wallet: any,
  link: Link,
  selectedOrderId: string,
  setSelectedOrderId: any,
  sigin: () => any,
  setAssets?:any,
}
const Listings = ({ wallet, link, selectedOrderId, setSelectedOrderId, sigin, setAssets }: InventoryProps) => {

  const [userdata, setUserData] = useState([]);
  const [buttonname, setButtonName] = useState('Gods Unchained');
  const navigate = useNavigate()
  const buttonClick = (e: any) => {
    setButtonName(e.target.innerText)
  }

  useEffect(() => {
    axios.get(`https://api.sandbox.x.immutable.com/v1/orders?buy_token_type=ETH&direction=asc&include_fees=true&order_by=buy_quantity_with_fees&page_size=48&sell_token_address=0xcdc73eae1312dffab420bb9afb8641cb30aeace1&sell_token_type=ERC721&status=active`)
      .then(res => {
        const persons = res.data.result;
        setUserData(persons)
      })
  }, [])


  return (
    <>
      <div className='inline-div'>
        <div className='top-header'>
          <h3 style={{ 'marginLeft': '21px' }}> Listed Assets</h3>
          <button className={`list-btn ${buttonname == 'Guild of Guardians' ? '' : 'not-active-btn'}`}
            value={buttonname}
            type="button"
            onClick={(e) => buttonClick(e)}>Guild of Guardians</button>
          <button className={`list-btn ${buttonname == 'Gods Unchained' ? '' : 'not-active-btn'}`}
            value={buttonname}
            onClick={(e) => buttonClick(e)}
            type="button">Gods Unchained</button>
          <button className={`list-btn ${buttonname == 'Other' ? '' : 'not-active-btn'}`}
            value={buttonname}
            type="button"
            onClick={(e) => buttonClick(e)}>Other</button>
        </div>
        <div className='card-split'>
          {
            userdata.map((user: any, key) => {
              return (
                <div key={key}
                  className={`cards ${user?.order_id.toString() === selectedOrderId && `cards-selected`}`}
                  onClick={() => {setAssets(user); navigate(`/listing/assets/${user?.order_id}`) }}>

                  <div className='img-div'>
                    <img src={user['sell']['data']['properties']['image_url']} alt="" />
                  </div>
                  <p>{user['sell']['data']['properties']['name']}</p>
                  <div className='sub-container'>
                    <img className='avatar-img'
                      src={user['sell']['data']['properties']['collection']['icon_url']} alt="" />
                    <span className='text-spn'>Test Launch NFTs</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Listings