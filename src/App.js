import "./App.css";
import * as fcl from "@onflow/fcl";
import { useState, useEffect } from "react";
import { createFlowSdk } from "@rarible/flow-sdk";
import { toFlowContractAddress } from "@rarible/flow-sdk/build/common/flow-address";

fcl.config({
  "app.detail.title": "UnitasLink",
  "app.detail.icon":
    "https://media-exp1.licdn.com/dms/image/C4E0BAQFL1t6iI_kqKw/company-logo_200_200/0/1637403038197?e=2147483647&v=beta&t=iy10IydYGG-oI7ZpSnLrEQaJnfXqsEGc6xYg6NtcOOc",
  "accessNode.api": "https://rest-mainnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/authn",
});

/* link
http://localhost:3000/?metaUrl=ipfs://ipfs/QmV2Xpz8aiNVbnKN8Cz48hB1mw8AjaoMTvpHrpkqqyVBUK
*/

const queryParams = new URLSearchParams(window.location.search);
const sdk = createFlowSdk(fcl, "mainnet");

function App() {
  const [isMinting, setIsMinting] = useState(false);

  useEffect(() => {
    logIn();
    return () => {
      fcl.unauthenticate();
    };
  }, []);

  const logIn = async () => {
    fcl.unauthenticate();
    await fcl.authenticate();
    await mint();
  };

  const mint = async () => {
    var metaUrl = queryParams.get("metaUrl");

    try {
      setIsMinting(true);

      const collectionAddress = toFlowContractAddress(
        "A.01ab36aaf654a13e.RaribleNFT"
      );

      const royalties = [];

      const response = await sdk.nft.mint(
        collectionAddress,
        metaUrl,
        royalties
      );

      console.log(response);

      setIsMinting(false);
    } catch (e) {
      setIsMinting(false);
      alert(e);
    }
  };

  return (
    <div className="App">
      <div className="center-div">
        <div className="loader"></div>
        <p>{isMinting ? "Mint In Progress..." : "Connecting To Wallet.." } </p>
      </div>
    </div>
  );
}

export default App;
