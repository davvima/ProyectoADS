import React, { createContext, useContext, useReducer } from "react"

const initialState = {
  activeStep: 0,
  formData: {
    comercioNumero: "",
    razonSocial: "",
    cuit: "",
    categoria: "",
    nombreFantasia: "",
    direccion: "",
    googleMaps: "",
    whatsapp: "",
    responsableNombre: "",
    dni: "",
    mail: "",
    telefono: "",
    descripcion: "",
    imagenes: [] as File[],
  },
  errors: {
    comercioNumero: "",
    razonSocial: "",
    cuit: "",
    categoria: "",
    nombreFantasia: "",
    direccion: "",
    googleMaps: "",
    whatsapp: "",
    responsableNombre: "",
    dni: "",
    mail: "",
    telefono: "",
    descripcion: "",
    imagenes: [] as File[],
  },
  visitedFields: [] as string[],
  alertMessage: null as null | string,
  action: "create" as "create" | "update",
}

type Action =
  | { type: "SET_ACTIVE_STEP"; payload: number }
  | { type: "SET_FORM_DATA"; payload: Partial<typeof initialState.formData> }
  | { type: "SET_ERRORS"; payload: any }
  | { type: "SET_VISITED_FIELDS"; payload: string[] }
  | { type: "SET_ALERT_MESSAGE"; payload: string | null }
  | { type: "SET_ACTION"; payload: "create" | "update" }

type State = typeof initialState

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_ACTIVE_STEP":
      return { ...state, activeStep: action.payload }
    case "SET_FORM_DATA":
      return { ...state, formData: { ...state.formData, ...action.payload } }
    case "SET_ERRORS":
      return { ...state, errors: action.payload }
    case "SET_VISITED_FIELDS":
      return { ...state, visitedFields: action.payload }
    case "SET_ALERT_MESSAGE":
      return { ...state, alertMessage: action.payload }
    case "SET_ACTION":
      return { ...state, action: action.payload }
    default:
      return state
  }
}

const FormContext = createContext<{
  state: typeof initialState
  dispatch: React.Dispatch<Action>
}>({ state: initialState, dispatch: () => null })

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(formReducer, initialState)

  const contextValue = React.useMemo(() => ({ state, dispatch }), [state, dispatch])

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
}

export const useFormContext = () => useContext(FormContext)
