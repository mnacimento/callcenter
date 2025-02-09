import { HeaderProps } from "../interface/header.interface";
import logo from '../assets/logo.png';

export default function Header({
  appName,
  username,
  onLogout,
  onToggleSidebar,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-white px-4 py-2 border-b border-gray-200 shadow">

      <div className="flex items-center gap-2">
        <button
          className="md:hidden p-2 text-gray-600 hover:bg-gray-200 rounded"
          onClick={onToggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <img
          src={logo}
          alt="Logo de la Aplicación"
          className="h-14 w-auto" // Ajusta la altura según prefieras
        />
        <div className="text-xl font-bold text-gray-800">{appName}</div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Bienvenido, <strong>{username}</strong>
        </span>
        <button
          onClick={onLogout}
          className="text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
        >
          Salir
        </button>
      </div>
    </header>
  );
}


//-----------------------------------------------------------------------------------------------------------
// import { HeaderProps } from "../interface/header.interface";
// import logo from '../assets/logo.png';

// export default function Header({
//   appName,
//   username,
//   onLogout,
//   onToggleSidebar,
// }: HeaderProps) {
//   return (
//     <header className="flex flex-col md:flex-row items-center justify-between bg-white px-4 py-2 border-b border-gray-200 shadow space-y-2 md:space-y-0">

//       {/* Grupo Izquierdo: Botón de Menú, Logo y Nombre de la Aplicación */}
//       <div className="flex items-center gap-4">
//         <button
//           className="md:hidden p-2 text-gray-600 hover:bg-gray-200 rounded"
//           onClick={onToggleSidebar}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none" viewBox="0 0 24 24" stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>

//         <img
//           src={logo}
//           alt="Logo de la Aplicación"
//           className="h-14 w-auto" // Ajusta la altura según prefieras
//         />
//         <div className="text-xl font-bold text-gray-800">{appName}</div>
//       </div>

//       {/* Grupo Derecho: Mensaje de Bienvenida y Botón de Salir */}
//       <div className="flex items-center gap-4">
//         <span className="text-sm text-gray-600">
//           Bienvenido, <strong>{username}</strong>
//         </span>
//         <button
//           onClick={onLogout}
//           className="text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
//         >
//           Salir
//         </button>
//       </div>
//     </header>
//   );
// }
