import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";

const Ingredients = () => {
    const [ingredients, setIngredients] = useState([])

    const addIngredientHandler = ingredient => {
        setIngredients(prevState => [
            ...prevState,
            {id: Math.random().toString(), ...ingredient}
        ])
    }

    const removeIngredientHandler = id => {
        setIngredients(prevState => prevState.filter(items => items.id !== id));
    }


    return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
    );
}

export default Ingredients;
