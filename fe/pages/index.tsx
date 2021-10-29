import { useWeb3React } from '@web3-react/core'
import { metamask } from "../components/connectors/metamask"
import { Wallet } from "../components"

export default function LoginPage() {
  const { active, activate, deactivate } = useWeb3React();

  const handleConnect = () => {
    try {
      activate(metamask);
    } catch (error) {
      console.log(error);
    }
  }
  const handleDisconnect = () => deactivate();

  return active ? (
    <>
      <Wallet/>
      <div className="flex justify-end">
        <button className="btn-sec" onClick={handleDisconnect}>
          Disconnect from Metamask
        </button>
      </div>
    </>
  ) : (
    <>
      <p className="mb-4 text-sm">
        Hello, it's a page where you can get info such as ENP token balance. To proceed connect to Metamask, please.
      </p>
      <p className="mb-4 text-sm">
        Currently are supported only Ropsten and Binance smart chain testnet.
      </p>
      <div className="flex justify-end">
        <button className="btn-pr" onClick={handleConnect}>
          Connect to Metamask
        </button>
      </div>
    </>
  )
}