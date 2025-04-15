import { Link } from "react-router-dom";

function RegisterForm() {
  return (
    <form className="space-y-4 text-black">
      <div>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico*"
          className="mt-1 w-full rounded-md border px-3 py-2"
          required
        />
      </div>
      <div>
        <div className="relative">
          <input
            type="password"
            name="password"
            placeholder="Contraseña*"
            className="mt-1 w-full rounded-md border px-3 py-2"
            required
          />
        </div>
      </div>

      <div>
        <div className="relative">
          <input
            type="password"
            name="password"
            placeholder="Confirmar contraseña*"
            className="mt-1 w-full rounded-md border px-3 py-2"
            required
          />
        </div>
      </div>

      <p className={`mt-4 text-center text-sm`}>
        ¿Ya tienes una cuenta?
        <Link to="/login" className={`text-blue-600 hover:underline`}>
          {" "}
          Inicia sesión aquí
        </Link>
      </p>
      <button
        type="submit"
        className="btn__primary btn__lime w-full text-white cursor-pointer"
      >
        Regístrate
      </button>
    </form>
  );
}

export default RegisterForm;
