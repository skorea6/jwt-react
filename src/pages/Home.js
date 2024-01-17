import { useSelector } from "react-redux";

function Home() {
  const { userId, email, nick } = useSelector((state) => state.token);

  return (
    <div>
      Home
      <br />
      {userId}
      <br />
      {email}
      <br />
      {nick}
      <br />
    </div>
  );
}

export default Home;
