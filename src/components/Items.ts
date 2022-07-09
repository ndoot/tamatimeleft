import fish from './assets/fish.png'; 
import yarn from './assets/yarn.png'
import bonsai from './assets/bonsai.png'

interface Items {
  [propName: string]: any;
}
export const items: Items = {
  fish: {
    src: fish, 
    width: 100, 
    height: 100,
    price: 50,
  },
  yarn: {
    src: yarn, 
    width: 130, 
    height: 130,
    price: 100,
  },
  bonsai: {
    src: bonsai, 
    width: 300, 
    height: 300,
    price: 1000,
  },
}