import { useState, useEffect, ChangeEvent } from 'react'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'

export const OwhBalance = ({ contract }) => {
  const { library: web3 } = useWeb3React<Web3>();

  const [owhBalance, setOwhBalance] = useState("");
  const [address, setAddress] = useState("");
  const [isInvalidAddress, setIsInvalidAddress] = useState(false);

  useEffect(() => {
    setOwhBalance("");
    setIsInvalidAddress(false);
  }, [contract, address]);

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value);
  const handleAddressSubmit = async () => {
    try {
      const _owhBalance = await contract.methods.owhBalanceOf(address).call();
      setOwhBalance(_owhBalance);
    } catch {
      setIsInvalidAddress(true);
    }
  };

  return (
    <>
      <h2>External test</h2>
      <p className="mb-4">
        You can also check the result of envoking<> </>
        <span className="rounded-sm bg-gray-200 px-1">owhBalanceOf(address who)</span><> </>
        function of this smart contract.
      </p>
      <div className="flex mb-4">
        <input
          type="text"
          className={`border-2 px-2 flex-grow outline-none focus:bg-gray-100 ${isInvalidAddress && "bg-red-300"}`}
          value={address}
          onChange={handleAddressChange}
          placeholder="someone's address"
        />
        <button className="btn-pr" onClick={handleAddressSubmit}>Check</button>
      </div>
      {owhBalance && (
        <p className="mb-4">
          The owhBalance is: <span className="text-blue-600">{web3.utils.fromWei(owhBalance)}</span>
        </p>
      )}
    </>
  )
}