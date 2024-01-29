import AuthContainer from "../../component/AuthContainer";
import { CurrentPasswordInput } from "../../component/MemberInput";
import { MdDelete } from "react-icons/md";
import { ButtonNotLoading } from "../../component/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { deleteMember } from "../../api/MemberApis";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../component/Modal";
import { useSelector } from "react-redux";

function MemberDelete() {
  const navigate = useNavigate();
  const { userType } = useSelector((state) => state.memberInfo);

  const [isApiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const [isMemberDeleteModalOpen, setIsMemberDeleteModalOpen] = useState(false);
  const [apiRequestData, setApiRequestData] = useState({});

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onValid = async ({ currentPassword }) => {
    setApiRequestData({ currentPassword });
    setIsMemberDeleteModalOpen(true);
  };

  const handleMemberDeleteModalClose = () => {
    setIsMemberDeleteModalOpen(false);
  };

  const handleConfirmMemberDelete = async () => {
    setApiLoading(true);
    const response = await deleteMember(apiRequestData);

    if (response.status) {
      alert("회원 탈퇴가 완료 되었습니다!");
      navigate("/auth/logout");
    } else {
      setApiError(response.statusMessage);
      setIsMemberDeleteModalOpen(false);
    }
    setApiLoading(false);
  };

  return (
    <>
      <AuthContainer title="회원 탈퇴">
        <form className="mt-8 space-y-3" onSubmit={handleSubmit(onValid)}>
          <div className="rounded-md shadow-sm -space-y-px">
            {userType !== "SOCIAL" && (
              <CurrentPasswordInput register={register} errors={errors} />
            )}
          </div>
          <div className="mt-3">
            {apiError && (
              <p className="text-sm font-medium text-rose-500">{apiError}</p>
            )}
          </div>
          <div className="mt-3">
            <ButtonNotLoading color="red" icon={MdDelete}>
              회원 탈퇴
            </ButtonNotLoading>
          </div>
        </form>
      </AuthContainer>
      <Modal
        isApiLoading={isApiLoading}
        title={"진심으로 탈퇴 하시겠습니까?"}
        body={"탈퇴시 모든 정보가 삭제되어 복구할 수 없습니다."}
        isOpen={isMemberDeleteModalOpen}
        onClose={handleMemberDeleteModalClose}
        onConfirm={handleConfirmMemberDelete}
      />
    </>
  );
}

export default MemberDelete;
