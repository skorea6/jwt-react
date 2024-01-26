import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Auth";
import memberInfoReducer from "./MemberInfo";
import emailTokenReducer from "./EmailToken";

export default configureStore({
  reducer: {
    token: tokenReducer,
    memberInfo: memberInfoReducer,
    emailToken: emailTokenReducer,
  },
});
