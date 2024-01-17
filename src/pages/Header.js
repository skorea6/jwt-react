import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <h1>
        <Link to="/">JWT 테스트 사이트</Link>
      </h1>
      <div className="menu">
        <Link to="/test1" className="link">
          테스트1
        </Link>
        <Link to="/logout" className="link">
          로그아웃
        </Link>
      </div>
    </div>
  );
}
