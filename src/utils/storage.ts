import { AsyncStorage } from 'react-native'

/**
 * Eliminar todos los datos almacenados
 */
export function clear() {
  return AsyncStorage.clear()
}

/**
 * Obtiene un registro del Storage
 * @param key Key del registro
 * @param defaultValue En caso de que no retorne valor, retorna este valor
 */
export function get(key: string, defaultValue = null) {
  return AsyncStorage.getItem(key).then(
    value => (value !== null ? JSON.parse(value) : defaultValue)
  )
}

/**
 * Guarda un registro en el Storage
 * @param key Key del nuevo registro
 * @param value Valor que se almacenara
 */
export function set(key: string, value: any) {
  return AsyncStorage.setItem(key, JSON.stringify(value))
}

/**
 * Elimina un registro en especifico
 * @param key Key del registro a eliminar
 */
export function remove(key: string) {
  return AsyncStorage.removeItem(key)
}

/**
 * Consulta multiples registros
 * @param keys Keys de los registros a consultar
 */
export function multiGet(...keys: string[]) {
  return AsyncStorage.multiGet([...keys]).then(stores => {
    const data: any = {}
    stores.forEach((result, i, store) => {
      data[store[i][0]] = JSON.parse(store[i][1])
    })
    return data
  })
}
/**
 * Elimina multiples registros ala vez
 * @param keys Keys de los registros a eliminar
 */
export function multiRemove(...keys: string[]) {
  return AsyncStorage.multiRemove([...keys])
}

export default {
  clear,
  get,
  set,
  remove,
  multiGet,
  multiRemove,
}
