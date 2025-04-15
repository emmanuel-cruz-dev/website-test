import "./Register.css";
import RegisterForm from "./RegisterForm";

function Register() {
  return (
    <section className="register flex items-center justify-center min-h-[37rem] -mt-8 relative">
      <article
        className={`bg-white relative w-full max-w-md rounded-lg p-6 backdrop-blur-md bg-opacity-90 shadow-lg`}
      >
        <h2 className="mb-4 text-center text-2xl font-semibold">Registro</h2>
        <RegisterForm />
      </article>
    </section>
  );
}

export default Register;
