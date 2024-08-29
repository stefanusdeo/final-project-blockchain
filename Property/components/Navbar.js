"use client";
import { shortenAddress } from "@/utils/hashChar";
import { useAccountAddress } from "@/zustand/addressStore";
import Link from "next/link";
import React from "react";
import WalletIcon from "@/public/wallet.png";
import { connectMetamask } from "@/utils/connectMetamask";

export default function Navbar() {
  const setAccountAddress = useAccountAddress(
    (state) => state.updateAccountAddress
  );

  const handleDisconnect = () => {
    setAccountAddress("");
  };

  const accountChange = (accountName) => {
    setAccountAddress(accountName);
  };

  const connectWallet = async (event) => {
    event.preventDefault();
    const res = await connectMetamask();
    if (res.success) {
      accountChange(res.address);
    }
  };

  const accountAddress = useAccountAddress((state) => state.accountAddress);
  return (
    <>
      <nav className="bg-gray-100 text-gray-500 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-extrabold">
              PropertyApp
            </Link>
          </div>
          <div className="flex space-x-6">
            {accountAddress === "" && (
              <>
                <button
                  className="font-semibold text-grey-500 bg-gray-700 text-white p-2 rounded-xl transition duration-300"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              </>
            )}
            {accountAddress !== "" && (
              <>
                <Link
                  href="/owned-property"
                  className="font-semibold text-grey-500 hover:bg-gray-700 hover:text-white p-2 rounded-xl transition duration-300"
                >
                  My Property
                </Link>
                <div className="flex items-center space-x-2">
                  <img
                    src={WalletIcon.src}
                    className="w-6 h-6"
                    alt="Wallet Icon"
                  />
                  <span className="text-grey-500 font-semibold">
                    {shortenAddress(accountAddress)}
                  </span>
                </div>
                <button
                  className="text-white bg-gray-600 rounded-xl p-2"
                  onClick={handleDisconnect}
                >
                  Disconnect Wallet
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
