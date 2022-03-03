import React from 'react';
import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import walletLinkModule from '@web3-onboard/walletlink';
import {
  init,
  useConnectWallet,
  useSetChain,
  useWallets,
} from '@web3-onboard/react';

const ETH_RINKEBY_RPC = process.env.REACT_APP_RINKEBY_URL;

const injected = injectedModule();
const walletLink = walletLinkModule();
const walletConnect = walletConnectModule();

const web3Onboard = init({
  wallets: [walletConnect, walletLink, injected],
  chains: [
    {
      id: '0x4',
      token: 'rETH',
      label: 'Ethereum Rinkeby Testnet',
      rpcUrl: ETH_RINKEBY_RPC,
    },
  ],
  appMetadata: {
    name: 'My App',
    icon: 'SHR',
    description: 'My app using Onboard',
  },
});

export default function Wallet() {
  const [{ wallet, connecting }, connect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
  const connectedWallets = useWallets();

  return (
    <>
      <div>Wallet</div>
      <button onClick={() => connect()}>
        {connecting ? 'connecting' : 'connect'}
      </button>
      {wallet && (
        <div>
          <label>Switch Chain</label>
          {settingChain ? (
            <span>Switching chain...</span>
          ) : (
            <select
              onChange={({ target: { value } }) =>
                console.log('onChange called') || setChain({ chainId: value })
              }
              value={connectedChain.id}
            >
              {chains.map(({ id, label }) => {
                return <option value={id}>{label}</option>;
              })}
            </select>
          )}
        </div>
      )}
    </>
  );
}
