import AuthContainer from "../../component/AuthContainer";
import { useEffect } from "react";
import {
  refreshTokenListAPI,
  deleteRefreshTokenAPI,
  logoutAllAPI,
} from "../../api/AuthApis";
import useApiWithLoading from "../../api/useApiWithLoading";
import { useRef, useState } from "react";
import { getLoginRefreshToken } from "../../storage/LoginCookie";
import { Modal } from "../../component/Modal";
import { useNavigate } from "react-router-dom";

function MemberLoginList() {
  const navigate = useNavigate();

  const callRefreshTokenListAPI = useRef(
    useApiWithLoading(refreshTokenListAPI)
  );

  const [isApiLoading, setApiLoading] = useState(false);
  const [refreshTokenList, setRefreshTokenList] = useState(null);

  const fetchRefreshTokenList = async () => {
    const refreshToken = getLoginRefreshToken();
    const listResponse = await callRefreshTokenListAPI.current({
      refreshToken,
    });
    if (listResponse.status) {
      setRefreshTokenList(listResponse.data);
    }
  };

  useEffect(() => {
    fetchRefreshTokenList();
  }, []);

  const [isLogoutAllModalOpen, setIsLogoutAllModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [selectedSecret, setSelectedSecret] = useState(null);

  const handleLogoutAllButtonClick = () => {
    setIsLogoutAllModalOpen(true);
  };

  const handleLogoutButtonClick = (secret) => {
    setSelectedSecret(secret);
    setIsLogoutModalOpen(true);
  };

  const handleLogoutAllModalClose = () => {
    setIsLogoutAllModalOpen(false);
  };

  const handleLogoutModalClose = () => {
    setIsLogoutModalOpen(false);
  };

  const handleConfirmLogoutAll = async () => {
    setApiLoading(true);
    const response = await logoutAllAPI();
    if (response.status) {
      alert("성공적으로 모든 기기를 로그아웃 시켰습니다.");
      navigate("/auth/logout");
    } else {
      alert(response.statusMessage);
      setIsLogoutAllModalOpen(false);
      fetchRefreshTokenList();
    }
    setApiLoading(false);
  };

  const handleConfirmLogout = async () => {
    setApiLoading(true);
    const response = await deleteRefreshTokenAPI({ secret: selectedSecret });
    if (response.status) {
      alert("성공적으로 해당 기기를 로그아웃 시켰습니다.");
    } else {
      alert(response.statusMessage);
    }
    setIsLogoutModalOpen(false);
    fetchRefreshTokenList();
    setApiLoading(false);
  };

  return (
    <>
      <AuthContainer title="현재 로그인 목록" maxWidth="max-w-3xl">
        <div className="flex flex-col space-y-4">
          <div className="text-gray-500 pt-5">
            <p>
              현재 로그인 중인 기기 또는 PC의 목록을 확인하고 원격으로 로그아웃
              할 수 있습니다.
            </p>
            <p>
              로그아웃 반영에는 최대 30분 정도가 소요될 수 있으니 참고해주세요.
            </p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => handleLogoutAllButtonClick()}
              className="px-4 py-1 bg-red-500 text-white font-medium rounded hover:bg-red-700"
            >
              전체 로그아웃
            </button>
          </div>
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-6 border-r border-indigo-500"
                  >
                    브라우저
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 border-r border-indigo-500"
                  >
                    운영체제
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 border-r border-indigo-500"
                  >
                    로그인 IP
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 border-r border-indigo-500"
                  >
                    최근 접속 일시
                  </th>
                  <th scope="col" className="py-3 px-6">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody>
                {refreshTokenList &&
                  refreshTokenList.map((item) => (
                    <tr key={item.secret} className="bg-gray-100">
                      <td className="py-4 px-6 border-r border-indigo-500">
                        {item.browser}
                      </td>
                      <td className="py-4 px-6 border-r border-indigo-500">
                        {item.os}
                      </td>
                      <td className="py-4 px-6 border-r border-indigo-500">
                        {item.ipAddress}
                      </td>
                      <td className="py-4 px-6 border-r border-indigo-500">
                        {item.date}
                      </td>
                      <td className="py-4 px-6">
                        {item.current === true ? (
                          "지금 접속중"
                        ) : (
                          <button
                            onClick={() => handleLogoutButtonClick(item.secret)}
                            className="px-4 py-1 bg-blue-500 text-white font-medium rounded hover:bg-blue-700"
                          >
                            로그아웃
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </AuthContainer>
      <Modal
        isApiLoading={isApiLoading}
        title={"해당 기기를 로그아웃 하시겠습니까?"}
        body={"로그아웃 반영까지 최대 30분이 소요될 수 있습니다."}
        isOpen={isLogoutModalOpen}
        onClose={handleLogoutModalClose}
        onConfirm={handleConfirmLogout}
      />
      <Modal
        isApiLoading={isApiLoading}
        title={"모든 기기를 로그아웃 하시겠습니까?"}
        body={"로그아웃 반영까지 최대 30분이 소요될 수 있습니다."}
        isOpen={isLogoutAllModalOpen}
        onClose={handleLogoutAllModalClose}
        onConfirm={handleConfirmLogoutAll}
      />
    </>
  );
}

export default MemberLoginList;
