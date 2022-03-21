import { useRouter } from "next/router";
import { ThirdwebProvider } from "@thirdweb-dev/react";
export default function NftDrop() {
  const router = useRouter();
  const { chainId, address } = router.query;
  console.log(chainId);
  console.log(address);

  return (
    <ThirdwebProvider desiredChainId={chainId}>
      <h1>Hellow orkls</h1>
    </ThirdwebProvider>
  );
}
