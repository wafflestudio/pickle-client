import { useState } from "react";
import { useUserQuery } from "../../services/repositories/user";

export default function Login() {
  const { me, login } = useUserQuery();
  const [input, setInput] = useState({ email: "", password: "" });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!input.email || !input.password) return;
        login.mutate(input);
      }}
    >
      <div>{me.status}</div>
      <input
        type="text"
        value={input.email}
        onChange={(e) => setInput({ ...input, email: e.target.value })}
      />
      <input
        type="password"
        value={input.password}
        onChange={(e) => setInput({ ...input, password: e.target.value })}
      />
      <button type="submit">로그인</button>
    </form>
  );
}
