import './index.css'

const ListCategory = props => {
  const {each, activeId, changeActiveCategory} = props
  const {menuCategoryId, menuCategory} = each
  const listClassName = activeId === menuCategoryId ? 'active' : 'nonActive'
  const changeCategory = () => {
    changeActiveCategory(menuCategoryId)
  }
  return (
    <li className={listClassName}>
      <button type="button" onClick={changeCategory} className="butt">
        {menuCategory}
      </button>
    </li>
  )
}
export default ListCategory
