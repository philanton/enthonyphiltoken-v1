import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'

export const AccountInfo = ({ account, chainId }) => {
  const { library: web3 } = useWeb3React<Web3>();
  const [balance, setBalance] = useState("");

  const updateBalance = async (address: string) => {
    const _balance = await web3.eth.getBalance(address);
    setBalance(web3.utils.fromWei(_balance));
  }

  useEffect(() => {
    updateBalance(account);
  }, [account, chainId])

  return (
    <>
      <h2>
        User Account
      </h2>
      <p className="mb-4">
        Address: <span className="text-blue-700">{account}</span>
      </p>
      <p className="mb-4">
        Balance: <span className="text-blue-800">{balance} ETH</span>
      </p>
    </>
  )
}