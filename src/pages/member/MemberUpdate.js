import AuthContainer from "../../component/AuthContainer";
import MemberUpdateInfo from "./MemberUpdateInfo";
import MemberUpdatePassword from "./MemberUpdatePassword";
import { useSelector } from "react-redux";
import MemberUpdateEmail from "./MemberUpdateEmail";

function MemberUpdate() {
  const { userType } = useSelector((state) => state.memberInfo);

  return (
    <>
      <AuthContainer title="회원 정보 수정">
        <MemberUpdateInfo />
        {userType !== "SOCIAL" && (
          <>
            <br />
            <hr />
            <MemberUpdatePassword />
            <br />
            <hr />
            <MemberUpdateEmail />
          </>
        )}
      </AuthContainer>
    </>
  );
}

export default MemberUpdate;
