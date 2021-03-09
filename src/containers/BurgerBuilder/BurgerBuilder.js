import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControl/BuildControls.js'
import Modal from  '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES ={
  salad: 0.5,
  cheese: 0.4,
  meat:1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0, 
      bacon: 0, 
      cheese: 0, 
      meat: 0
    },
    totalPrice: 4,
    purchasable: false, 
    purchasing: false
  }

  updatedPurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      }).reduce((sum,el) => {
        return sum + el;
      },0);
      this.setState({purchasable: sum > 0})
  }


  addIngredientHandler = (type) => {
    const updatedCount =  this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount; 
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients:updatedIngredients})
    this.updatedPurchaseState(updatedIngredients);
  }
  
  removeIngredientHandler = (type) => {
    if(this.state.ingredients[type] > 0) {
    const updatedCount =  this.state.ingredients[type] - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount; 
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients:updatedIngredients})
    this.updatedPurchaseState(updatedIngredients);
   }
  }

  purchaseHandler = () => {
    this.setState({purchasing:true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing:false});
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    }; 
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <Aux>
        <Modal show ={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients}/>
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
        ingredientAdded = {this.addIngredientHandler}
        ingredientRemoved = {this.removeIngredientHandler}
        disabled = {disabledInfo}
        price = {this.state.totalPrice}
        purchasable = {this.state.purchasable}
        ordered = {this.purchaseHandler}
        ></BuildControls>
      </Aux>
    );
  }
}


export default BurgerBuilder