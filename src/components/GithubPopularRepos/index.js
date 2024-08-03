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

class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    dataLanguage: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getLanguageData()
  }

  getLanguageData = async () => {
    const {activeTabId} = this.state
    console.log(activeTabId)

    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    console.log(url)
    const option = {
      method: 'GET',
    }

    const response = await fetch(url, option)
    const data = await response.json()
    console.log(response.ok)

    const formattedData = data.popular_repos.map(eachData => ({
      avatarUrl: eachData.avatar_url,
      forksCount: eachData.forks_count,
      id: eachData.id,
      issuesCount: eachData.issues_count,
      name: eachData.name,
      starsCount: eachData.stars_count,
    }))

    console.log(formattedData)
    this.setState({dataLanguage: formattedData, isLoading: false})
  }

  updatedId = id => {
    this.setState({activeTabId: id}, this.getLanguageData)
  }

  render() {
    const {activeTabId, isLoading, dataLanguage} = this.state
    return (
      <div className="main-container">
        <div className="inner-container">
          <h1>Popular</h1>
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
          <div className="language">
            {isLoading ? (
              <div data-testid="Loader">
                <Loader type="ThreeDots" height={30} width={30} />
              </div>
            ) : (
              <ul className="languages">
                {dataLanguage.map(eachLanguage => (
                  <RepositoryItem
                    eachDataLanguage={eachLanguage}
                    key={eachLanguage.id}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
