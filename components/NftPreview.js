import React, { useState } from "react";
import Button from "./Button";
import styles from "./NftPreview.module.css";
import Modal from "react-modal";
import Image from "next/image";
Modal.setAppElement("#root");
function NftPreview({ contractAddress }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <div className={styles.main} id="root">
      <div className={styles.addressComponent}>0x7fdc80....</div>
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
      <Button toggleModal={toggleModal} />
      {/* <ConnectModal /> */}
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
          <div className={`${styles.walletWrapper} ${styles.metamask}`}>
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
