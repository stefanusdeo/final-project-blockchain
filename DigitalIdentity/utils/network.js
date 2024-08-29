export const networkId = 4202;
const TARGET_NETWORK = {
  chainId: "0x106a", // Lisk Sepolia Testnet Chain ID in hexadecimal (11155420 in decimal)
  chainName: "Lisk Sepolia Testnet",
  nativeCurrency: {
    name: "SepoliaETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.sepolia-api.lisk.com"],
  blockExplorerUrls: ["https://blockscout.lisk.com"],
};
export const switchToTargetNetwork = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: TARGET_NETWORK.chainId }],
    });
    return true;
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [TARGET_NETWORK],
        });
        return true;
      } catch (addError) {
        console.error("Failed to add the network:", addError);
        return false;
      }
    } else {
      console.error("Failed to switch the network:", switchError);
      return false;
    }
  }
};
