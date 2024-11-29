const validateInputs = (formData) => {
  const errors: any = {}

  // Validación de comercioNumero (Requerido)
  if (!formData.comercioNumero) {
    errors.comercioNumero = "El número de comercio es obligatorio."
  }

  // Validación de razónSocial (Requerido)
  if (!formData.razonSocial) {
    errors.razonSocial = "La razón social es obligatoria."
  }

  // Validación de CUIT (Formato válido)
  const cuitRegex = /^[0-9]{11}$/
  if (!formData.cuit) {
    errors.cuit = "El CUIT es obligatorio."
  } else if (!cuitRegex.test(formData.cuit)) {
    errors.cuit = "El CUIT debe ser de 11 dígitos."
  }

  // Validación de email (Formato válido)
  const emailRegex = /\S+@\S+\.\S+/
  if (!formData.email) {
    errors.email = "El email es obligatorio."
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Por favor ingresa un email válido."
  }

  // Validación de teléfono (Formato válido)
  const phoneRegex = /^[+]?[0-9]{1,4}?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}$/
  if (!formData.telefono) {
    errors.telefono = "El teléfono de contacto es obligatorio."
  } else if (!phoneRegex.test(formData.telefono)) {
    errors.telefono = "Por favor ingresa un teléfono válido."
  }

  // Validación de nombreFantasia (Requerido)
  if (!formData.nombreFantasia) {
    errors.nombreFantasia = "El nombre de fantasía es obligatorio."
  }

  // Validación de dirección (Requerido)
  if (!formData.direccion) {
    errors.direccion = "La dirección es obligatoria."
  }

  // Validación de googleMaps (Requerido)
  if (!formData.googleMaps) {
    errors.googleMaps = "El enlace de Google Maps es obligatorio."
  }

  // Validación de whatsapp (Requerido)
  if (!formData.whatsapp) {
    errors.whatsapp = "El enlace de WhatsApp es obligatorio."
  }

  // Validación de responsableNombre (Requerido)
  if (!formData.responsableNombre) {
    errors.responsableNombre = "El nombre y apellido del responsable es obligatorio."
  }

  // Validación de DNI (Requerido)
  if (!formData.dni) {
    errors.dni = "El DNI es obligatorio."
  }

  // Validación de DDescripción (Requerido)
  if (!formData.description) {
    errors.description = "La descripción es obligatoria."
  }

  return errors
}

export default validateInputs
