import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { abi } from './helper';
import axios from 'axios';
import Wallet from './modules/wallet';
const account = '0x9E13B7374C0660C5d922349eFC2E316e78bdA58A';

function App() {
  const init = {
    symbol: '',
    name: '',
    tokenCount: '',
    balance: '',
    baseUri: '',
    nftMetadata: '',
  };

  const [initialState, setInitialState] = useState(init);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const ethersProvider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_RINKEBY_URL
    );

    const actress = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      abi,
      ethersProvider
    );
    setContract(actress);
    (async () => {
      let _symbol = await actress.symbol();
      let _name = await actress.name();
      let _tokenCounter = (await actress.tokenCounter()).toNumber();
      let _baseUri = await actress.baseUri();
      let payload = {
        ...initialState,
        symbol: _symbol,
        name: _name,
        tokenCount: _tokenCounter,
        baseUri: _baseUri,
      };
      setInitialState(payload);
    })();
  }, []);

  useEffect(() => {
    let accounts, ids, _balance;
    (async () => {
      if (initialState.baseUri && initialState.tokenCount) {
        accounts = Array(initialState.tokenCount).fill(account);
        ids = Array.from({ length: initialState.tokenCount }, (_, i) => i + 1);
        _balance = await contract.balanceOfBatch(accounts, ids);
        for (let i = 1; i <= initialState.tokenCount; i++) {
          const { data } = await axios.get(`${initialState.baseUri}${i}.json`);
          data.amount = _balance[i - 1].toNumber();
          // console.log(data);
        }
      }
    })();
  }, [initialState.baseUri, initialState.tokenCount]);

  // console.log(initialState);
  return (
    <>
      <h1>my nft app</h1>
      <Wallet />
    </>
  );
}

export default App;
