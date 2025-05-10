import { product } from "../scripts/orders.js";

export const orders = JSON.parse(localStorage.getItem('Order11'))||[];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
  
}
export function getOrder(orderId){
  let matchingOrder;
  orders.forEach((order) => {
    
   if(order.id===orderId){
     matchingOrder=order;
   }
  });
  
  return matchingOrder;
 }

function saveToStorage() {
  localStorage.setItem('Order11', JSON.stringify(orders));
}
