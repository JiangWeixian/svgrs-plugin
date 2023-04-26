declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_INSPECT: boolean
    }
  }
}

export {}
