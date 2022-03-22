import React from "react";
import styles from "./Button.module.css";
function Button({
  toggleModal,
  address,
  totalClaimedSupply,
  totalUnclaimedSupply,
  claimNft,
  btnLoading,
  allClaimed,
}) {
  const renderButton = () => {
    if (!address) {
      return (
        <button
          onClick={toggleModal}
          className={`${styles.mainButton} ${styles.claimButton}`}
        >
          Connect Wallet
        </button>
      );
    }
    if (allClaimed) {
      return (
        <button className={`${styles.mainButton} ${styles.nothingLeft}`}>
          Nothing left
        </button>
      );
    }
    if (btnLoading) {
      return (
        <button
          onClick={claimNft}
          className={`${styles.mainButton} ${styles.nothingLeft}`}
        >
          loading........
        </button>
      );
    }
    return (
      <button
        onClick={claimNft}
        className={`${styles.mainButton} ${styles.claimButton}`}
      >
        Mint
      </button>
    );
  };
  return (
    <>
      <div className={styles.btnWrapper}>
        <a className={styles.externalLink} href="https://thirdweb.com/">
          <svg
            width="13.5"
            height="13.5"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
            ></path>
          </svg>
        </a>
        {renderButton()}
      </div>
      {totalClaimedSupply && (
        <div className={styles.amountClaimed}>
          {totalClaimedSupply}/{totalUnclaimedSupply + totalClaimedSupply}{" "}
          claimed
        </div>
      )}
    </>
  );
}

export default Button;
