import { useDispatch } from 'react-redux'
import { totalItems } from '../redux/actions/cart'
export const CART = 'cart'

const dispatch = useDispatch

// if you can, to better work on the application,
// put the product objects here. that way, on the page’s loading, they always start with that
const initial = []

!localStorage.getItem(CART) &&
  localStorage.setItem(CART, JSON.stringify(initial))

export function getItemsLocalStorage(name) {
  const result = JSON.parse(localStorage.getItem(name))
  return result // returns complete item stored with this name
}

export function addItemLocalStorage(name, product) {
  const temp = getItemsLocalStorage(name)
  localStorage.setItem(name, JSON.stringify([...temp, product]))
  dispatch(totalItems())
}

export function removeItemLocalStorage(name, product) {
  const temp = getItemsLocalStorage(name)
  const result = temp.filter((p) => p.id !== product.id)
  localStorage.setItem(name, JSON.stringify(result))
  dispatch(totalItems())
}

export function updateLocalStorage(name, product) {
  removeItemLocalStorage(name, product)
  addItemLocalStorage(name, product)
  dispatch(totalItems())
}

export function updateQuantity(name, product, quantity) {
  const temp = getItemsLocalStorage.find((prod) => prod.id === product.id)
  const newProduct = { ...temp, quantity }
  removeItemLocalStorage(name, product)
  addItemLocalStorage(name, newProduct)
  dispatch(totalItems())
}
