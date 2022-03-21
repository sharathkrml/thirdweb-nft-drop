import { useRouter } from "next/router";
import { ThirdwebProvider } from "@thirdweb-dev/react";
export default function NftDrop() {
  const router = useRouter();
  const { chainId } = router.query;
  console.log(chainId);

  return (
    <>
      <h1></h1>
    </>
  );
}
