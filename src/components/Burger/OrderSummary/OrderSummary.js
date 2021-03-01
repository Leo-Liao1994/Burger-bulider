import React from "react" 
import Aux from '../../../hoc/Aux'

const orderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients)
  return (
    <Aux>
      <h3>Your Order:</h3>
      <p>Added ingredients</p>
      <ul>

      </ul>
    </Aux>
  )
} 

export default orderSummary;