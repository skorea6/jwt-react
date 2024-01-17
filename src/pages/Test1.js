import { useSelector } from "react-redux";

function Test1() {
  const { userId, email, nick } = useSelector((state) => state.token);

  return (
    <div>
      Test1
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

export default Test1;
