import { useRouter } from "next/router";

export default function useUrlParams() {
  const router = useRouter();
  try {
    return JSON.parse(decodeURIComponent(router.asPath.substring(2)));
  } catch (e) {
    return {}
  };
}