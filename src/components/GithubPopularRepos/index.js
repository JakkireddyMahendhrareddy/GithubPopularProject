import {Component} from 'react'

import Loader from 'react-loader-spinner'

import RepositoryItem from '../RepositoryItem'

import LanguageFilterItem from '../LanguageFilterItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    dataLanguage: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeTabId} = this.state

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`

    const option = {
      method: 'GET',
    }

    const response = await fetch(url, option)

    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.popular_repos.map(eachData => ({
        avatarUrl: eachData.avatar_url,
        forksCount: eachData.forks_count,
        id: eachData.id,
        issuesCount: eachData.issues_count,
        name: eachData.name,
        starsCount: eachData.stars_count,
      }))

      this.setState({
        dataLanguage: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.success})
    }
  }

  renderLoadingView = () => (
    <div data-testid="Loader">
      <Loader type="ThreeDots" height={30} width={30} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-image">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure-view"
        className="failure-view-image"
      />
      <h1>Sorry something went wrong</h1>
    </div>
  )

  renderRepositoriesListView = () => {
    const {dataLanguage} = this.state

    return (
      <ul className="languages">
        {dataLanguage.map(eachLanguage => (
          <RepositoryItem
            eachDataLanguage={eachLanguage}
            key={eachLanguage.id}
          />
        ))}
      </ul>
    )
  }

  renderRepositoriesView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesListView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  updatedId = id => {
    this.setState({activeTabId: id}, this.getRepositories)
  }

  renderLanguagesFirstList = () => {
    const {activeTabId} = this.state
    return (
      <ul className="list-container">
        {languageFiltersData.map(eachList => (
          <LanguageFilterItem
            key={eachList.id}
            languageDetails={eachList}
            updatedId={this.updatedId}
            isActive={eachList.id === activeTabId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="main-container">
        <div className="inner-container">
          <h1>Popular</h1>
          {this.renderLanguagesFirstList()}
          {this.renderRepositoriesView()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
