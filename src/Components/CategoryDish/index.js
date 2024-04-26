import {Component} from 'react'

import './index.css'

class CategoryDish extends Component {
  decrementing = () => {
    const {each, updateDecrement} = this.props
    const {dishId, quantity} = each
    if (quantity >= 1) {
      updateDecrement(dishId)
    }
  }

  incrementing = () => {
    const {each, updateIncrement} = this.props
    const {dishId} = each
    updateIncrement(dishId)
  }

  render() {
    const {each} = this.props
    const {
      dishId,
      dishName,
      dishPrice,
      dishImage,
      dishCurrency,
      dishCalories,
      dishDescription,
      dishAvailability,
      dishType,
      addonCat,
      quantity,
    } = each

    return (
      <li className="categoryDishCont">
        {dishType === 2 ? (
          <div className="greenCont">
            <p className="GreenPara"></p>
          </div>
        ) : (
          <div className="redCont">
            <p className="redPara"></p>
          </div>
        )}
        <div className="dishDet">
          <h1 className="dishHead">{dishName}</h1>

          <p className="price">
            {dishCurrency} {dishPrice}
          </p>

          <p className="dishDesc">{dishDescription}</p>
          {dishAvailability ? (
            <div className="incDecCont">
              <button className="butt1" onClick={this.decrementing}>
                -
              </button>
              <p className="count">{quantity}</p>
              <button className="butt1" onClick={this.incrementing}>
                +
              </button>
            </div>
          ) : (
            <p className="notAvailable">Not Available</p>
          )}
          {addonCat.length > 0 && (
            <p className="customize">Customizations available</p>
          )}
        </div>
        <div className="caloriCont">
          <p className="calori">{dishCalories}</p>
          <p className="calori">calories</p>
        </div>
        <img src={dishImage} alt={dishName} className="imagee" />
      </li>
    )
  }
}
export default CategoryDish
