import { useEffect, useState } from "react"
import { getStoredCart } from "../utilities/fakedb";

const useCart = (products) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = getStoredCart();
        const keys = Object.keys(storedCart)
        console.log(keys)
        const savedCart = [];

        fetch('http://localhost:5000/productByKeys', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(keys)
        })
            .then(res => res.json())
            .then(product => {
                console.log(product)
             for(const id in storedCart){
                  const addedProduct = products.find(product => product._id === id);
            if(addedProduct){
                     const quantity = storedCart[id];
                    addedProduct.quantity = quantity;
                    savedCart.push(addedProduct);
                }
             }
              setCart(savedCart);
            })


    }, [products]);

    return [cart, setCart];
}


export default useCart;