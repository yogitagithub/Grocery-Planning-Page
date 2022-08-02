import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import './grocery.css';

function Paper() {

    const [groceryItem, setGroceryItem] = useState('');
    const [grocery, setGrocery] = useState([]);
    // const [line, setLine] = useState(false);

    useEffect(() => {
        getProducts();
    }, [])
    
    var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d = new Date()
    var monthName = months[d.getMonth()]; 
    console.log(monthName);

    const handleAddItem = () => {

        fetch('http://localhost:3003/grocery/add', {
            method: 'POST',
            body: JSON.stringify({groceryItem, isPurchased: false}),
            headers: {
                'Content-type': "application/json; charset=UTF-8"
            }
        })
          .then(resp =>
            resp.json()
        )
           .then(dt => {
               alert('Item inserted successfully')
        })
    }

    async function getProducts()
    {
        let insert = await fetch('http://localhost:3003/grocery/getAll');
        insert = await insert.json();        
        setGrocery(insert); 
    }

    const handlePurchaseItem = (id) => {

        // setLine(true);
        console.log(id);

         fetch('http://localhost:3003/grocery/updatePurchaseStatus/'+id, 
            {
                method: 'PUT',
                body: JSON.stringify({id}),
                headers: {
                    'Content-type': "application/json; charset=UTF-8"
            }
        })
            .then(resp =>
                resp.json()
            )
            .then(dt => {
                alert('Item updated successfully')
            })
    }

    const removeProduct = async (id) => {
        console.log(id);

        fetch('http://localhost:3003/grocery/deleteGroceryItem/'+id, 
        {
            method: 'DELETE',
            body: JSON.stringify({id}),
                headers: {
                    'Content-type': "application/json; charset=UTF-8"
                }
        })
        .then(resp =>
            resp.json()
        )
        .then(dt => {
            alert('Item deleted successfully')
            getProducts();
        })
    }
 
    return(
        
        <div>
            <p className="product-plan"><ins>Monthly Grocery Planning</ins></p>
            <h1 className="product-month">Plan for the month of {monthName}</h1>
            
            <form>
                <div>
                    <input type="text" placeholder="Add your items here..." className="product-input" value={groceryItem} onChange={(ev) => {setGroceryItem(ev.target.value)}}></input>
                </div>

                <div>
                    <input type="button" value="ADD" className="product-add" onClick={() => handleAddItem()}></input>
                </div>
            </form>

            <div>
                <div className="table">
                    <table>

                        {grocery.map(items => <tr>
                            <td style={{ textDecoration: line ? "line-through" : "none" }}>{items.groceryItem}</td>
                            
                            <td><span className="purchase-header"><input type="button" value="Purchase" className="purchase-button" onClick={() => handlePurchaseItem(items._id)}></input></span></td>
                            
                            <td><span className="remove-header"><input type="button" value="Remove" className="remove-button" onClick={() => removeProduct(items._id)}></input></span></td>
                
                            </tr>)}
                    </table>
                </div>                       
            </div>
        </div> 
    );
}
export default Paper;