import React, {useCallback, useReducer} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

const ingredientReducer = (currentIngredients, action) => {
    switch (action.type) {
        case 'SET':
            return action.ingredients;
        case 'ADD':
            return [...currentIngredients, action.ingredient];
        case 'DELETE':
            return currentIngredients.filter(ing => ing.id !== action.id);
        default:
            throw new Error('Should not get there!')
    }
}

const httpReducer = (curHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null}
        case 'RESPONSE':
            return { ...curHttpState, loading: false}
        case 'ERROR':
            return { loading: false, error: action.errorMessage}
        case 'CLEAR':
            return {...curHttpState, error: null}
        default:
             throw Error ('Should not be reached');
    }

}

const Ingredients = () => {
    const [ingredients, dispatch] = useReducer(ingredientReducer, []);
    const [httpState, dispatchHttp] = useReducer(httpReducer, {loading: false, error: null});
    // const [ingredients, setIngredients] = useState([])
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState()

    const filteredIngredientHandler = useCallback( filteredIngredients => {
        // setIngredients(filteredIngredients)
        dispatch({ type: 'SET', ingredients: filteredIngredients });
    }, [])

    const addIngredientHandler = useCallback(ingredient => {
        dispatchHttp({ type: 'SEND'});
        // setIsLoading(true);
        fetch('https://flamelinktest-b9226-default-rtdb.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify({title: ingredient.title, amount: ingredient.amount}),
            headers: { 'Content-Type': 'application/json'}
        }).then (response => {
            return response.json();
        }).then(responseData => {
            dispatchHttp({type: 'RESPONSE'});
            // setIsLoading(false);
            // setIngredients(prevState => [
            //     ...prevState,
            //     {id: responseData.name, ...ingredient} //the way that th id is assigned, that's just how firebase works
            // ]);
            dispatch({ type: 'ADD', ingredient: {id: responseData.name, ...ingredient}})
        });
    },[])

    const removeIngredientHandler = useCallback(id => {
        dispatchHttp({ type: 'SEND'})
        // setIsLoading(true);
        fetch(`https://flamelinktest-b9226-default-rtdb.firebaseio.com/ingredients/${id}.json`, {
            method: 'DELETE',
        }).then (response => {
            dispatchHttp({type: 'RESPONSE'})
            // setIsLoading(false);
            // setIngredients(prevState => prevState.filter(items => items.id !== id)
            // );
            dispatch({type: 'DELETE', id: id})
        }).catch(error => {
            dispatchHttp({type: 'ERROR', errorMessage: error.message})
            // setError(error.message)
        });
    },[])

    const clearError = useCallback(() => {
        // setError(null);
        // setIsLoading(false)
        dispatchHttp({type: 'CLEAR'});
    },[])


    return (
    <div className="App">
        {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading} />

      <section>
        <Search onLoadIngredients={filteredIngredientHandler}/>
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
    );
}

export default Ingredients;

