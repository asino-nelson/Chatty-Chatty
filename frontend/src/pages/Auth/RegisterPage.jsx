import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import RegisterInput from "../../components/Auths/RegisterInput";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { registerUser } = useContext(AuthContext);

  console.log(email);
  console.log(username);
  console.log(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(email, username, password, password2);
  };

  return (
    <div>
      <section className="h-screen w-full bg-green-400 text-lg text-white flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center bg-green-900 py-10 px-28 rounded-md">
          <p className="text-2xl font-bold">Register</p>
          <form className="py-5" onSubmit={handleSubmit}>
            <RegisterInput
              placeholder={"Enter username"}
              type={"text"}
              name={"username"}
              onchange={(e) => setUsername(e.target.value)}
            />
            <RegisterInput
              placeholder={"Enter email"}
              type={"email"}
              name={"email"}
              onchange={(e) => setEmail(e.target.value)}
            />
            <RegisterInput
              placeholder={"Enter password"}
              type={"password"}
              name={"password"}
              onchange={(e) => setPassword(e.target.value)}
            />
            <RegisterInput
              placeholder={"Confirm password"}
              type={"password"}
              name={"password2"}
              onchange={(e) => setPassword2(e.target.value)}
            />
            <div className="pt-1 mb-4">
              <button
                className="bg-green-500 hover:bg-green-400 w-full rounded-md py-2"
                type="submit"
              >
                Register
              </button>
            </div>
            <p className="mb-5 pb-2">
              Already have an account?{" "}
              <Link to={"/login"} className="text-green-400">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
