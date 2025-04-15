import LoginForm from "./LoginForm";
import "./Login.css";

function Login() {
  return (
    <section className="my-12">
      <article
        className={`relative w-full max-w-md rounded-lg bg-white p-6 shadow-md backdrop-blur-md bg-opacity-90
          transition-transform duration-300 group-hover:shadow-lg mx-auto`}
      >
        <h2 className="mb-4 text-center text-2xl font-semibold">
          Inicio de sesión
        </h2>
        <LoginForm />
      </article>
    </section>
  );
}

export default Login;
