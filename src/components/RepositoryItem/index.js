// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachDataLanguage} = props
  const {
    avatarUrl,
    forksCount,
    issuesCount,
    name,
    starsCount,
  } = eachDataLanguage
  return (
    <li className="list-cards">
      <img src={avatarUrl} alt="avatar" className="image" />
      <h3 className="head">{name}</h3>
      <div className="two">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stars"
        />
        <p className="stars_count">{starsCount} stars</p>
      </div>
      <div className="two">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="star"
        />
        <p className="forks_count">{forksCount} forks</p>
      </div>
      <div className="two">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="star"
        />
        <p className="issues_count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
