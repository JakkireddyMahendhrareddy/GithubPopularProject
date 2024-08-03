// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, updatedId, isActive} = props
  const {id, language} = languageDetails

  const classNameContainer = isActive ? 'btn style' : 'btn'

  const getId = () => {
    updatedId(id)
  }

  return (
    <li className="list-button">
      <button type="button" className={classNameContainer} onClick={getId}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
