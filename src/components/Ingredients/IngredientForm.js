import React, {useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from "../UI/LoadingIndicator";

const IngredientForm = React.memo(props => {

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const titleChangeHandler = (event) => {
    setTitle(event.target.value)
  }
  const amountChangeHandler = (event) => {
    setAmount(event.target.value)
  }

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({title: title, amount:amount})
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input value={title} type="text" id="title" onChange={titleChangeHandler}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input value={amount} type="number" id="amount" onChange={amountChangeHandler}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator/>}

          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
