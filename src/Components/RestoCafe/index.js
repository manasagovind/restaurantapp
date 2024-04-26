import {Component} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'

import ListCategory from '../ListCategory'

import CategoryDish from '../CategoryDish'

class RestoCafe extends Component {
  state = {isLoading: true, dishDetails: [], activeId: '11', cartCount: 0}

  componentDidMount() {
    this.getDishes()
  }

  getDishes = async () => {
    const options = {
      method: 'GET',
    }
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const fetchedData = data[0].table_menu_list.map(each => ({
        menuCategory: each.menu_category,
        menuCategoryId: each.menu_category_id,
        categoryDishes: each.category_dishes.map(eachDish => ({
          dishId: eachDish.dish_id,
          dishName: eachDish.dish_name,
          dishPrice: eachDish.dish_price,
          dishImage: eachDish.dish_image,
          dishCurrency: eachDish.dish_currency,
          dishCalories: eachDish.dish_calories,
          dishDescription: eachDish.dish_description,
          dishAvailability: eachDish.dish_Availability,
          dishType: eachDish.dish_Type,
          nexturl: eachDish.nexturl,
          addonCat: eachDish.addonCat,
          quantity: 0,
        })),
      }))
      this.setState({
        isLoading: false,
        dishDetails: fetchedData,
        activeId: fetchedData[0].menuCategoryId,
      })
    }
  }

  changeActiveCategory = menuCategoryId => {
    this.setState({activeId: menuCategoryId})
  }

  updateIncrement = dishId => {
    const {dishDetails, activeId} = this.state
    const updatedData = dishDetails.map(each => {
      if (each.menuCategoryId === activeId) {
        const category = each.categoryDishes.map(eachDish => {
          if (eachDish.dishId === dishId) {
            return {...eachDish, quantity: eachDish.quantity + 1}
          }
          return {...eachDish}
        })
        return {...each, categoryDishes: category}
      }
      return {...each}
    })
    this.setState(prevState => ({
      dishDetails: updatedData,
      cartCount: prevState.cartCount + 1,
    }))
  }

  updateDecrement = dishId => {
    const {dishDetails, activeId} = this.state
    const updatedData = dishDetails.map(each => {
      if (each.menuCategoryId === activeId) {
        const category = each.categoryDishes.map(eachDish => {
          if (eachDish.dishId === dishId) {
            return {...eachDish, quantity: eachDish.quantity - 1}
          }
          return {...eachDish}
        })
        return {...each, categoryDishes: category}
      }
      return {...each}
    })
    this.setState(prevState => ({
      dishDetails: updatedData,
      cartCount: prevState.cartCount - 1,
    }))
  }

  renderDetails = () => {
    const {dishDetails, activeId, cartCount} = this.state
    const categorydishes = dishDetails.filter(
      each => each.menuCategoryId === activeId,
    )
    const paricularCategory = categorydishes[0].categoryDishes
    return (
      <div className="totalCont">
        <nav>
          <h1 className="navLogo">UNI Resto Cafe</h1>
          <div className="orderCont">
            <p className="myOrders">My Orders</p>
            <div>
              <p className="cartCount">{cartCount}</p>
              <AiOutlineShoppingCart />
            </div>
          </div>
        </nav>
        <ul>
          {dishDetails.map(each => (
            <ListCategory
              key={each.menuCategoryId}
              activeId={activeId}
              each={each}
              changeActiveCategory={this.changeActiveCategory}
            />
          ))}
        </ul>
        <ul>
          {paricularCategory.map(each => (
            <CategoryDish
              each={each}
              key={each.dishId}
              updateIncrement={this.updateIncrement}
              updateDecrement={this.updateDecrement}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return <div>{isLoading === false && this.renderDetails()}</div>
  }
}
export default RestoCafe
