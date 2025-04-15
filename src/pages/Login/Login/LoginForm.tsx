import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <form className="space-y-4 text-black">
      <div>
        <input
          type="email"
          name="email"
          placeholder="Correo eléctronico*"
          className="mt-1 w-full rounded-md border px-3 py-2"
          required
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Contraseña*"
          className="mt-1 w-full rounded-md border px-3 py-2"
          required
        />
      </div>
      <p className={`mt-4 text-center text-sm`}>
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className={`text-blue-600 hover:underline`}>
          Regístrate
        </Link>
      </p>
      <button
        type="submit"
        className="btn__primary btn__lime w-full text-white"
      >
        Inicia sesión
      </button>
    </form>
  );
}

export default LoginForm;
