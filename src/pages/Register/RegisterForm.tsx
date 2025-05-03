import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <div className="relative w-full max-w-md">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className="mt-1 w-full pr-10 rounded-md border px-3 py-2"
            placeholder="Contraseña*"
            required
          />
          <button
            type="button"
            className="absolute top-4 right-3 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
      </div>

      <div>
        <div className="relative w-full max-w-md">
          <input
            id="password"
            name="password"
            type={showConfirmPassword ? "text" : "password"}
            className="mt-1 w-full pr-10 rounded-md border px-3 py-2"
            placeholder="Confirmar contraseña*"
            required
          />
          <button
            type="button"
            className="absolute top-4 right-3 text-gray-500 hover:text-gray-700"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={
              showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
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
