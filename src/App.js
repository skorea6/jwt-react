import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import PublicNotAuthRoute from "./routes/PublicNotAuthRoute";
import Header from "./pages/Header";
import AutoIssueToken from "./component/AutoIssueToken";
import SignUp from "./pages/auth/SignUp";
import SignUpEmail from "./pages/auth/SignUpEmail";
import SignUpSocial from "./pages/auth/SignUpSocial";
import LoginSocial from "./pages/auth/LoginSocial";
import { LoadingContextProvider } from "./component/LoadingContext";
import LoadingModal from "./component/LoadingModal";
import MemberUpdate from "./pages/member/MemberUpdate";
import FindUserId from "./pages/auth/find/findUserId";
import FindPassword from "./pages/auth/find/findPassword";
import FindPasswordReset from "./pages/auth/find/findPasswordReset";
import MemberLoginList from "./pages/member/MemberLoginList";
import { PageTitle } from "./component/PageTitle";
import MemberDelete from "./pages/member/MemberDelete";
import Footer from "./pages/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <LoadingContextProvider>
          <AutoIssueToken />
          <div className="flex flex-col min-h-screen">
            <main className="mb-auto">
              <Header />
              <Routes>
                <Route path="/" element={<PublicRoute element={Home} />} />

                <Route element={<PrivateRoute />}>
                  <Route
                    path="/member/update"
                    element={
                      <>
                        <PageTitle subTitle="회원정보수정" />
                        <MemberUpdate />
                      </>
                    }
                  />
                  <Route
                    path="/member/login-list"
                    element={
                      <>
                        <PageTitle subTitle="로그인목록" />
                        <MemberLoginList />
                      </>
                    }
                  />
                  <Route
                    path="/member/delete"
                    element={
                      <>
                        <PageTitle subTitle="회원탈퇴" />
                        <MemberDelete />
                      </>
                    }
                  />
                  <Route
                    path="/auth/logout"
                    element={
                      <>
                        <PageTitle subTitle="로그아웃" />
                        <Logout />
                      </>
                    }
                  />
                </Route>

                <Route
                  path="/auth/login"
                  element={
                    <PublicNotAuthRoute title="로그인" element={Login} />
                  }
                />

                <Route
                  path="/auth/login/social"
                  element={
                    <PublicNotAuthRoute
                      title="소셜 로그인"
                      element={LoginSocial}
                    />
                  }
                />

                <Route
                  path="/auth/signup"
                  element={
                    <PublicNotAuthRoute title="회원가입" element={SignUp} />
                  }
                />

                <Route
                  path="/auth/signup/email"
                  element={
                    <PublicNotAuthRoute
                      title="일반 회원가입"
                      element={SignUpEmail}
                    />
                  }
                />

                <Route
                  path="/auth/signup/social"
                  element={
                    <PublicNotAuthRoute
                      title="소셜 회원가입"
                      element={SignUpSocial}
                    />
                  }
                />

                <Route
                  path="/auth/find/user-id"
                  element={
                    <PublicNotAuthRoute
                      title="아이디 찾기"
                      element={FindUserId}
                    />
                  }
                />

                <Route
                  path="/auth/find/password"
                  element={
                    <PublicNotAuthRoute
                      title="비밀번호 찾기"
                      element={FindPassword}
                    />
                  }
                />

                <Route
                  path="/auth/find/password/reset"
                  element={
                    <PublicNotAuthRoute
                      title="비밀번호 재설정"
                      element={FindPasswordReset}
                    />
                  }
                />
              </Routes>
            </main>
            <Footer />
            <LoadingModal />
          </div>
        </LoadingContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
