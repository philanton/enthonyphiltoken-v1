import { AccountInfo } from './accountInfo'
import { Contract } from './contract'

export const Wallet = () => {
  const { ethereum } = window as any;

  return (
    <>
      <AccountInfo account={ethereum.selectedAddress} chainId={ethereum.networkVersion}/>
      <Contract account={ethereum.selectedAddress} chainId={ethereum.networkVersion}/> 
    </>
  )
}