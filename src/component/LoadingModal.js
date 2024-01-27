import { Background, LoadingText } from "../assets/styles/Styles";
import { useLoadingContext } from "./LoadingContext";
import { SyncLoader } from "react-spinners";

export default function LoadingModal() {
  const { loadingCount } = useLoadingContext();

  if (loadingCount > 0) {
    return (
      <Background>
        <LoadingText>잠시만 기다려 주세요.</LoadingText>
        <br />
        <SyncLoader color="purple" />
      </Background>
    );
  }

  return null;
}
