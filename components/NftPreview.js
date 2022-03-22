import React from "react";
import styles from "./NftPreview.module.css";
function NftPreview({ contractAddress }) {
  return (
    <div className={styles.main}>
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
    </div>
  );
}

export default NftPreview;
