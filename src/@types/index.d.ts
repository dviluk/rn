
export interface UserLogin {
  username: string,
  password: string,
  remember: boolean
}

export interface Dispatch {
  /**
   * Dva dispatch
   * @param action
   */
  dispatch: (action: {
    /**
     * Acción a ejecutar
     */
    type: string,
    /**
     * Datos a enviar
     */
    payload?: any,
    /**
     * Al terminar de ejecutar la acción
     */
    callback?: any
  }) => void
}
