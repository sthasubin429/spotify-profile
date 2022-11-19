import { useRouter } from "next/router";
import { spotifyTokenResponse } from "../interface/spotify";

export default function useUrlParams(): spotifyTokenResponse | null {
  const router = useRouter();
  try {
    return JSON.parse(decodeURIComponent(router.asPath.substring(2)));
  } catch (e) {
    return null;
  };
}