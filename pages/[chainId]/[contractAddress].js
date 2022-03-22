import { useRouter } from "next/router";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import NftPreview from "../../components/NftPreview";
export default function NftDrop() {
  const router = useRouter();
  //to catch something like
  const { chainId, contractAddress } = router.query;
  console.log(chainId);
  console.log(contractAddress);

  return (
    <ThirdwebProvider desiredChainId={chainId}>
      <NftPreview contractAddress={contractAddress} />
    </ThirdwebProvider>
  );
}
