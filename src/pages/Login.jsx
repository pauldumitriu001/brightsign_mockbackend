import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import useAuthStore from "../stores/auth";
import { useNavigate } from "react-router";

export default function Login() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const setUser = useAuthStore((state) => state.setUser); //in order to update the store user, we need to use this setUser function
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        navigate("/", { replace: false });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Wrong!");
        console.error(error);
        // ..
      });
  }

  return (
    <div className="flex flex-row">
      <form onSubmit={handleLogin}>
        <div>
          <p>
            <input
              className="input"
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
                })
              }
              required
            />
          </p>
        </div>
        <div>
          <p className="control has-icons-left">
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
                })
              }
              required
            />
          </p>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
