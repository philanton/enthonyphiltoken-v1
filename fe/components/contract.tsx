import { useState, useEffect, ChangeEvent } from 'react'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import config from "../abi/EnthonyPhilTokenV2.json"
import { OwhBalance } from './owhBalance'

export const Contract = ({ account, chainId }) => {
  const { library: web3 } = useWeb3React<Web3>();
  
  const [contract, setContract] = useState(null);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("0");
  const [price, setPrice] = useState("0");
  const [balance, setBalance] = useState("0");
  const [amount, setAmount] = useState("0");

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value);
  const updateBalance = async () => {
    const _balance = await contract.methods.balanceOf(account).call();
    setBalance(_balance);
  }
  const handleBuyToken = async () => {
    const numTokens = parseInt(amount);
    const priceInWei = parseInt(price);
    console.log(numTokens, priceInWei)
    web3.eth.sendTransaction({
      from: account,
      to: config["chains"][chainId],
      value: `${numTokens * priceInWei}`
    })
  }

  const getContractInfo = async () => {
    try {
      const chainId = await web3.eth.getChainId();
      const contractAddress = config["chains"][chainId];
      const _contract = new web3.eth.Contract(config["abi"] as AbiItem[], contractAddress);
      setContract(_contract);
      console.log(_contract);

      setName(await _contract.methods.name().call());
      setSymbol(await _contract.methods.symbol().call());
      setSupply(await _contract.methods.totalSupply().call());
      setPrice(await _contract.methods.tokenPrice().call());
      setBalance(await _contract.methods.balanceOf(account).call());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getContractInfo();
  }, [chainId])

  useEffect(() => {
    if (!contract) return;
    updateBalance();
  }, [account])

  useEffect(() => {
    if (!contract) return;
    contract.events.BuyToken({ sender: account }).on("data", async () => {
      await updateBalance();
    })
  }, [contract])

  return (
    <>
      <h2 className="mb-0">Token {symbol} ({name})</h2>
      <div className="flex justify-between mb-4">
        <p className="p-1 text-sm border-b-2 border-r-2">
          Price: <span className="text-blue-600">{web3.utils.fromWei(price)} ETH</span>
        </p>
        <p className="p-1 text-sm border-b-2 border-l-2">
          Total supply: <span className="text-blue-600">{supply} {symbol}</span>
        </p>
      </div>
      <p className="mb-4">
        Balance: <span className="text-blue-800">{balance} {symbol}</span>
      </p>
      <div className="flex mb-4">
        <input
          type="text"
          className={`border-2 px-2 flex-grow outline-none focus:bg-gray-100`}
          value={amount}
          onChange={handleAmountChange}
          placeholder="buy tokens"
        />
        <button className="btn-pr" onClick={handleBuyToken}>Buy</button>
      </div>
      <OwhBalance contract={contract} />
    </>
  )
}