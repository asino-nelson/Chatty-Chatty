// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import LoginInput from "../../components/Auths/LoginInput";

const LoginPage = () => {

  const {loginUser} = useContext(AuthContext)
  const handleSubmit = e => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    email.length > 0 && loginUser(email, password)

    console.log(email);
    console.log(password);
  }

  return (
    <div>
      <section className="h-screen w-full bg-green-400 text-lg text-white flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center bg-green-900 py-10 px-28 rounded-md">
          <p className="text-2xl font-bold">Login</p>
          <form onSubmit={handleSubmit} className="py-5">
            <LoginInput
              placeholder={"Enter email"}
              type={"email"}
              name={"email"}
            />
            <LoginInput
              placeholder={"Enter password"}
              type={"password"}
              name={"password"}
            />
            <div className="pt-1 mb-4">
              <button className="bg-green-500 hover:bg-green-400 w-full rounded-md py-2" type="submit">
                Login
              </button>
            </div>
            <a href="#">Forgot password?</a>
            <p className="mb-5 pb-2">Dont have an account?
              <Link to={"/register"} className="text-green-400">Register Now</Link> </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
