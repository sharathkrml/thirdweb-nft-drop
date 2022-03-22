import React, { useState, useEffect } from "react";
import Button from "./Button";
import styles from "./NftPreview.module.css";
import Modal from "react-modal";
import Image from "next/image";
import { useAddress, useMetamask, useNFTDrop } from "@thirdweb-dev/react";

Modal.setAppElement("#root");
function NftPreview({ contractAddress }) {
  // detemine state of modal
  const [isOpen, setIsOpen] = useState(false);
  const [totalClaimedSupply, setTotalClaimedSupply] = useState();
  const [totalUnclaimedSupply, setTotalUnClaimedSupply] = useState();
  // display image and data
  const [displayData, setDisplayData] = useState();
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const nftDropContract = useNFTDrop(contractAddress);

  function toggleModal() {
    // for manually control modal,for button Component
    setIsOpen(!isOpen);
  }
  const getTotalSupply = async () => {
    try {
      const unclaimed = await nftDropContract.totalUnclaimedSupply();
      console.log("unclaimed ", unclaimed.toNumber());
      setTotalUnClaimedSupply(unclaimed.toNumber());
      const claimed = await nftDropContract.totalClaimedSupply();
      console.log("claimed ", claimed.toNumber());
      setTotalClaimedSupply(claimed.toNumber());
    } catch (error) {
      console.log(error);
    }
  };
  const claimNft = async () => {
    try {
      console.log("minting.......");
      const res = await nftDropContract.claimTo(address, 1);
      console.log("loading.....");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (address) {
      setIsOpen(false);
    }
  }, [address]);
  useEffect(() => {
    getTotalSupply();
  }, [nftDropContract]);
  useEffect(async () => {
    if (totalUnclaimedSupply !== 0) {
      try {
        const res = await nftDropContract.getAllUnclaimed();
        console.log(res[0]);
        setDisplayData(res[0]);
      } catch (error) {
        console.log(error);
      }
    }
  }, [totalUnclaimedSupply]);
  return (
    <div className={styles.main} id="root">
      {address && (
        <div className={styles.addressComponent}>
          {address.substring(0, 9)}....
        </div>
      )}
      <div className={styles.imageWrapper}>
        {displayData && (
          <img className={styles.image} src={displayData.image} alt="test" />
        )}
      </div>
      {displayData && <h1 className={styles.name}>{displayData.name}</h1>}
      {displayData && <p className={styles.desc}>{displayData.description}</p>}
      <Button
        toggleModal={toggleModal}
        address={address}
        totalClaimedSupply={totalClaimedSupply}
        totalUnclaimedSupply={totalUnclaimedSupply}
        claimNft={claimNft}
      />
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
          content: {
            position: "absolute",
            top: "7rem",
            bottom: "7rem",
            left: "5rem",
            right: "5rem",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "10px",
            outline: "none",
            padding: "0px",
          },
        }}
      >
        <div className={styles.ConnectModal}>
          <div
            className={`${styles.walletWrapper} ${styles.metamask}`}
            onClick={connectWithMetamask}
          >
            <Image
              src="/metamask.svg"
              className={styles.walletImage}
              width={95}
              height={95}
              alt="metamask"
            />

            <p className={styles.walletDesc}>Connect using Metamask</p>
          </div>
          <div className={`${styles.walletWrapper} ${styles.walletConnect}`}>
            <Image
              src="/walletConnect.svg"
              width={95}
              height={95}
              className={styles.walletImage}
              alt="walletConnect"
            />
            <p className={styles.walletDesc}>Connect using WalletConnect</p>
          </div>
          <div className={`${styles.walletWrapper} ${styles.coinbase}`}>
            <Image
              src="/Coinbase.svg"
              className={styles.walletImage}
              width={95}
              height={95}
              alt="Coinbase"
            />
            <p className={styles.walletDesc}>Connect using Coinbase</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default NftPreview;
