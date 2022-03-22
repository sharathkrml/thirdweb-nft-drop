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
  useEffect(() => {
    if (address) {
      setIsOpen(false);
    }
  }, [address]);
  useEffect(() => {
    getTotalSupply();
  }, [nftDropContract]);

  return (
    <div className={styles.main} id="root">
      {address && (
        <div className={styles.addressComponent}>
          {address.substring(0, 9)}....
        </div>
      )}
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src="https://gateway.ipfscdn.io/ipfs/QmeRNyXC5KQLQVgZMVQfv6YBCQfSG2MbZSHAcdjCzN9eG9/0.jpg"
          alt="test"
        />
      </div>
      <h1 className={styles.name}>Equilibrium #3429</h1>
      <p className={styles.desc}>
        Our Equilibrium collection promotes balance and calm
      </p>
      <Button
        toggleModal={toggleModal}
        address={address}
        totalClaimedSupply={totalClaimedSupply}
        totalUnclaimedSupply={totalUnclaimedSupply}
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
