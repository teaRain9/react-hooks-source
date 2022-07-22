import React, {useCallback, useState} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";

const Ingredients = () => {
    const [ingredients, setIngredients] = useState([])

    const filteredIngredientHandler = useCallback( filteredIngredients => {
        setIngredients(filteredIngredients)
    }, [])

    const addIngredientHandler = ingredient => {
        fetch('https://flamelinktest-b9226-default-rtdb.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify({title: ingredient.title, amount: ingredient.amount}),
            headers: { 'Content-Type': 'application/json'}
        }).then (response => {
            return response.json();
        }).then(responseData => {
            setIngredients(prevState => [
                ...prevState,
                {id: responseData.name, ...ingredient} //the way that th id is assigned, that's just how firebase works
            ]);
        });
    }

    const removeIngredientHandler = id => {
        setIngredients(prevState => prevState.filter(items => items.id !== id));
    }


    return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientHandler}/>
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
    );
}

export default Ingredients;

