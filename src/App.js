import { useEffect, useState } from "react";
import Web3 from "web3";
import AppAuthenticated from "./components/AppAuthenticated";

function App() {

  const [walletConnected, setWalletConnected] = useState(false)
  const [instruction, setInstruction] = useState("Waiting for connection with wallet ...")

  useEffect(()=>{

    const connectWallet = async () => {
      if(typeof window.ethereum !== 'undefined'){
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          window.web3 = new Web3(window.ethereum);
        } catch (error) {
          setInstruction("")
          return;
        }
      
        setInstruction("Wallet connection denied, reload the page to try again.")
        setWalletConnected(true);
      }
    }
    connectWallet();
  }, [])

  return (
   <div>
    {window.ethereum ? (
      walletConnected ? <AppAuthenticated/> : instruction
    ) : "Metamask or Other EIP-1102 / EIP-1193 compliant wallet not found"}
   </div>
  );
}

export default App;
