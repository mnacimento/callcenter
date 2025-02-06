import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import background from '../assets/home.jpg';
import { RegisterInterface } from '../interface/register.interface';

const RegisterSchema = Yup.object().shape({
  nombreCompleto: Yup.string().required('Es obligatorio'),
  email: Yup.string().email('Debe ser un correo válido').required('Obligatorio'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Obligatorio'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Obligatorio'),
});

function Register() {
  const formik = useFormik<RegisterInterface>({
    initialValues: {
      nombreCompleto: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log('Registro enviado:', values);
    },
  });

  return (
    <div
      className="
        w-screen
        h-screen
        bg-cover
        bg-center
        flex
        items-center
        justify-center
      "
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div
        className="
          w-11/12
          max-w-2xl
          bg-white/90
          border
          border-gray-200
          rounded-xl
          shadow-lg
          p-8
          md:p-10
        "
      >
        <h1 className="text-4xl font-semibold text-gray-800 text-center mb-8">
          Registrarse
        </h1>

        <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">
          <div>
            <label
              htmlFor="nombreCompleto"
              className="block text-base font-medium text-gray-700 mb-1"
            >
              Nombre completo
            </label>
            <input
              id="nombreCompleto"
              name="nombreCompleto"
              type="text"
              placeholder="Juan Pérez"
              className={`
                py-3 px-4 block w-full border rounded-md text-base
                focus:border-blue-500 focus:ring-blue-500
                ${
                  formik.touched.nombreCompleto && formik.errors.nombreCompleto
                    ? 'border-red-500'
                    : 'border-gray-300'
                }
              `}
              value={formik.values.nombreCompleto}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.nombreCompleto && formik.errors.nombreCompleto && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.nombreCompleto}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700 mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              className={`
                py-3 px-4 block w-full border rounded-md text-base
                focus:border-blue-500 focus:ring-blue-500
                ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-500'
                    : 'border-gray-300'
                }
              `}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              className={`
                py-3 px-4 block w-full border rounded-md text-base
                focus:border-blue-500 focus:ring-blue-500
                ${
                  formik.touched.password && formik.errors.password
                    ? 'border-red-500'
                    : 'border-gray-300'
                }
              `}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-base font-medium text-gray-700 mb-1"
            >
              Confirmar contraseña
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="********"
              className={`
                py-3 px-4 block w-full border rounded-md text-base
                focus:border-blue-500 focus:ring-blue-500
                ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? 'border-red-500'
                    : 'border-gray-300'
                }
              `}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm">¿Ya tienes cuenta?</span>
            <Link to="/" className="text-sm text-blue-600 hover:underline">
              Iniciar sesión
            </Link>
          </div>

          <button
            type="submit"
            disabled={!formik.values.email || !formik.values.password || !formik.values.confirmPassword || !formik.values.nombreCompleto}
            className="
              btn inline-flex w-full items-center justify-center
              px-4 py-3 text-base font-medium text-white
              bg-blue-600 rounded hover:bg-blue-700
              focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:bg-gray-400 disabled:hover:bg-gray-400
              disabled:cursor-not-allowed disabled:opacity-60
            "
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
