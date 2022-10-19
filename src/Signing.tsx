import { useEffect, useState } from 'react';
import { Link, ImmutableXClient } from '@imtbl/imx-sdk';
import './Inventory.css';
require('dotenv').config();

interface SigningProps {
    client: ImmutableXClient,
    link: Link,
    wallet: any
}

const Signing = ({ client, link, wallet }: SigningProps) => {
    const [signin, setSignin] = useState<any>("");
    const [Response, setResponse] = useState<any>("");

    useEffect(() => {
        setResponse(localStorage.getItem('Result'))
        setSignin(localStorage.getItem('signinMessage') !== null ?  localStorage.getItem('signinMessage') : '')
    },[])

    const sigin = () => {
        localStorage.setItem('signinMessage', signin)
        const test = link.sign({
            message: `${signin}`,
            description: 'Message that a user will see',
        }).then((reponse:any) => {
            localStorage.setItem('Result', reponse.result)
            setResponse(reponse.result)
        });
    }


    return (
        <>
            <div className='mint-div'>
                <div className='inline-mint'>
                    <div className='sigin-div'>
                        <div>
                            <div className='theader-signin'>
                                <h3 style={{ 'marginLeft': '21px' }}>Signing </h3>
                            </div>
                            <div className='signin-input-controls'>
                                {/* <label>
                           User Name */}
                                <input type="text" className='sigin-field' placeholder='Input Message' value={signin} onChange={e => setSignin(e.target.value)} />
                                {/* </label> */}
                                <button className='invent-btns cust-position' onClick={sigin}>Signing</button>

                            </div>
                        </div>

                        <div>
                            <div className='theader-signin'>
                                <h3 style={{ 'marginLeft': '2px' }}>Response </h3>
                            </div>
                            <textarea disabled={true} className='text-area' rows={4} cols={4} value={Response}></textarea>

                        </div>
                    </div>




                </div>
                <br />
            </div>
        </>
    )
}

export default Signing