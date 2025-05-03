import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

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
      <div className="relative w-full max-w-md">
        <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
          Contraseña
        </label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          className="w-full pr-10 border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tu contraseña"
        />
        <button
          type="button"
          className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={
            showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
          }
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
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
