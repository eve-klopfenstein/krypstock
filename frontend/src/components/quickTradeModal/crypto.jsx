import React, { useRef, useState,  useEffect } from 'react';
import { Background, CloseModalButton, ContentWrapper, ModalContent, CryptStockFormSelectWrapper, CrypStockTransacWrapper} from '../../styles/components/modalStyles';
import {useSelector} from "react-redux";
import {ButtonWrapper} from '../../styles/components/cryptoStyles/quickTradeStyles'
import { Link } from 'react-router-dom';
import {ShrinkingComponentWrapper } from '../../styles/globalParts/containerStyles';
import { postNewTransactionFetch } from '../../store/fetches/transactionFetches';
import portfoliosFetch from '../../store/fetches/portfoliosFetches';
import { portfoliosAction } from '../../store/actions/portfoliosAction';
import {useDispatch} from "react-redux";


export const CryptoModal = ({ showCryptoModal, setCryptoShowModal, symbol }) => {
    const allPortfoliosArray = useSelector(state => state.portfoliosReducer.portfolios) 
    const [buySell, setBuySell] = useState();  
    const [portfolioID, setPortfolioID] = useState();
    const [amount, setAmount] = useState();
    const [pricePerCoin, setPricePerCoin] = useState();
    const type = "C";

    const dispatch = useDispatch();


    const submitHandler = (e) => {
            e.preventDefault();
            console.log(buySell, portfolioID, symbol, amount, pricePerCoin,type)
            postNewTransactionFetch(buySell, portfolioID, symbol, amount, pricePerCoin, type)
                .then(data => {
                    console.log(data)
                    // console.log('in crypto quicktrade submitHandler', data)
                })
     
                setCryptoShowModal(false)
    }

  const modalRef = useRef();

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setCryptoShowModal(false);
    }
  };

// fetching portfolio list here becuase it takes time
// to get portfolio list from redux store unless 
// we go back to portfolio page to fetch

  useEffect(() => {
    portfoliosFetch()
      .then(data =>{
          const action = portfoliosAction(data.results);
          dispatch(action); 
      })
  }, []);

  return (
    <>
      {showCryptoModal ? (

            <Background onClick={closeModal} ref={modalRef}>
            <ContentWrapper>
            <ShrinkingComponentWrapper showCryptoModal={showCryptoModal}>
                <ModalContent> 
                    <form onSubmit={submitHandler}>
                        <CryptStockFormSelectWrapper>
                        <div className="title">
                           <h4>Crypto Quick Trade</h4> 
                        </div>
                        {
                        !allPortfoliosArray || allPortfoliosArray.length === 0 ?
                        null
                        :
                            <div className="buySell">
                                <select className="selector" defaultValue={'DEFAULT'} onChange={e => setBuySell(e.target.value)} required>
                                    <option value="DEFAULT" disabled>Select</option>
                                    <option value="B">Buy</option>
                                    <option value="S">Sell</option>
                                </select>
                            </div>
                        }
                        </CryptStockFormSelectWrapper>  
                        {
                         !allPortfoliosArray || allPortfoliosArray.length === 0 ?
                         <div className='empty'>
                             <span>You need a portfolio to trade</span>
                             <br/>
                             <Link to="/portfolio-list/">
                                 <span className='create-portfolio'>Create your first portfolio</span>
                             </Link>
                         </div>
                         : 
                        <>
                            <CrypStockTransacWrapper>
                                <div className="amountInput">
                                    <div>
                                    <label htmlFor="company-input">Portfolio</label>
                                    </div>
                                    <div>
                                    <select className="selector" defaultValue={'DEFAULT'} onChange={ e => setPortfolioID(e.target.value)} required>
                                        <option value="DEFAULT" disabled>Select portfolio</option>
                                        {
                                            allPortfoliosArray.map( (portfolio, index) => 
                                                <option key={index} value={portfolio.id}>{`${portfolio.name}`}</option>
                                            )
                                        }
                                    </select>
                                    </div>
                                   
                                </div>
                                <div className="currSelect amountInput">
                                    <div>
                                    <label htmlFor="company-input">Cryptocurrency</label>
                                    </div>
                                    <div>
                                    <p className="selector">{symbol}</p>
                                    </div> 
                                </div>  
                                <div className="amountInput">
                                    <div>
                                    <label>Amount</label>
                                    </div>
                                   <div>
                                   <input className="input" type="text" name="amount" placeholder="amount" value={amount} onChange={e => setAmount(e.target.value)} required/>
                                   </div>
                                </div>
                                <div className="amountInput">
                                    <div>
                                    <p>Price per Coin</p>
                                    </div>
                                    <div>
                                    <input className="input" type="number" placeholder="0" value={pricePerCoin} onChange={e => setPricePerCoin(e.target.value)} required />
                                    </div>
                                    
                                </div>
                                <div className="transacItem amountInput">
                                    <div>
                                    <p>Total Price</p>
                                    </div>
                                    <div>
                                    <span>{`${amount*pricePerCoin ? parseFloat(amount*pricePerCoin).toFixed(2) : '0.00'}  USD`}</span>
                                    </div>
                                </div>
                            </CrypStockTransacWrapper>
                            {/* {
                                incorrectSymbol ? <h3>NOPE</h3> : ''
                            } */}
                            <ButtonWrapper>
                                <button type="submit" value="Submit">Submit</button>
                            </ButtonWrapper>
                        </>
                        }
                    </form>
                </ModalContent>
                <CloseModalButton
                aria-label='Close modal'
                onClick={() => setCryptoShowModal(false)}
                />
            </ShrinkingComponentWrapper>
            </ContentWrapper>
            </Background>
      ) : null}
    </>
  );
};