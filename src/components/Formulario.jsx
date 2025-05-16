import { useState, useEffect } from "react";
import Error from "./Error";
import React from "react";
import Paciente from "./Paciente";

export const Formulario = ({
  pacientes,
  setPacientes,
  paciente,
  setPaciente,
}) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [error, setError] = useState(false);

  // Rellenar los campos con los datos del paciente si es edición
  useEffect(() => {
    if (Object.keys(paciente || {}).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setObservaciones(paciente.observaciones);
    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacionessss
    if (nombre.trim() === "") {
      alert("El campo nombre está vacío");
      setError(true);
      return;
    }
    if (propietario.trim() === "") {
      alert("El campo propietario está vacío");
      setError(true);
      return;
    }
    if (email.trim() === "") {
      alert("El campo email está vacío");
      setError(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("El email ingresado no es válido");
      setError(true);
      return;
    }

    if (fecha.trim() === "") {
      alert("El campo fecha está vacío");
      setError(true);
      return;
    }

    const fechaIngresada = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaIngresada < hoy) {
      alert("La fecha no puede ser menor a la fecha actual");
      setError(true);
      return;
    }

    if (observaciones.trim() === "") {
      alert("El campo observaciones está vacío");
      setError(true);
      return;
    }

    setError(false);

    // Crear objeto de paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      observaciones,
    };

    // Si estamos editando un paciente, mantenemos el ID, si no, generamos uno nuevo
    if (paciente.id) {
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
      );

      setPacientes(pacientesActualizados);
      setPaciente({});  // Limpiamos el estado de paciente después de editar
    } else {
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);  // Añadimos un nuevo paciente
    }

    // Limpiar formulario
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setObservaciones("");
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mb-10 mx-5">
      <h2 className="font-black text-3xl text-center">Asignar Cita</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5">
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
            Nombre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="Email Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="cita" className="block text-gray-700 uppercase font-bold">
            Fecha de Cita
          </label>
          <input
            id="cita"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="observaciones" className="block text-gray-700 uppercase font-bold">
            Observaciones
          </label>
          <textarea
            id="observaciones"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe las Observaciones"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </div>

        <input
          id="agregar"
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={paciente && paciente.id ? "Editar paciente" : "Agregar paciente"}
        />
      </form>
    </div>
  );
};

export default Formulario;

