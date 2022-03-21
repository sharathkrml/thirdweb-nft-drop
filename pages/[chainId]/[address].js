import { useRouter } from "next/router";
import { ThirdwebProvider } from "@thirdweb-dev/react";
export default function NftDrop() {
  const router = useRouter();
  //to catch something like
  //http://127.0.0.1:3000/80001/0x3b1b6401a6E2993790D1F4E9D7805DcBcD00323E
  const { chainId, address } = router.query;
  console.log(chainId);
  console.log(address);

  return (
    <ThirdwebProvider desiredChainId={chainId}>
      <h1>Hellow orkls</h1>
    </ThirdwebProvider>
  );
}
