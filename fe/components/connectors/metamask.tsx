import { InjectedConnector } from '@web3-react/injected-connector';

export const metamask = new InjectedConnector({
    supportedChainIds: [
        3, // ropsten
        97, // bnb testnet
    ]
})