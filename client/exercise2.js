import React, { useState, useEffect } from "react"
import { Heading, Button, List } from "talentedunicorn-ui-kit"
import { Formik, Form, Field, ErrorMessage } from "formik"
import sortBy from "lodash/sortBy"
import reverse from "lodash/reverse"

import "./page.css"

const GITHUB_API = `https://api.github.com`
const Page2 = _ => {
  const [repository, setRepository] = useState()
  const [contributors, setContributors] = useState()
  const [descending, setDescending] = useState(false)
  const [userRepositories, setUserRepositories] = useState()

  const handleSubmit = ({repository}, form) => {
    console.log(`Fetching... ${repository}`)
    form.resetForm()
    getData(repository)
  }

  const fetchRepository = name => {
    return fetch(`${GITHUB_API}/repos/${name}`)
  }

  const fetchContributors = name => {
    return fetch(`${GITHUB_API}/repos/${name}/contributors`)
  }

  const getData = repository => {
    if (window.localStorage.getItem(repository)) {
      setRepository(JSON.parse(window.localStorage.getItem(repository)))
      setContributors(JSON.parse(window.localStorage.getItem(`${repository}_contributors`)))
      return true
    }

    Promise.all([fetchRepository, fetchContributors])
      .then(([resRepository, resContributors]) => {
        resRepository(repository)
          .then(res => res.json())
          .then(data => {
            setRepository(data)
            // Store data to localstorage
            window.localStorage.setItem(repository, JSON.stringify(data))
          })
        resContributors(repository)
          .then(res => res.json())
          .then(data => {
            let sorted = sortBy(data, 'login')
            setContributors(sorted)
            window.localStorage.setItem(`${repository}_contributors`, JSON.stringify(sorted))
          })
      })
      .catch(err => console.error(err))
  }

  const sortContributors = e => {
    console.log('Sorting contributors by: ' + e.target.value)
    const sortType = e.target.value
    const cachedContributors = JSON.parse(window.localStorage.getItem(`${repository.full_name}_contributors`))
    let sorted = cachedContributors
    switch(sortType) {
      case "full_name":
        // Sort by name
        sorted = sortBy(cachedContributors, 'login')
        break
      case "contributions":
        // Sort by contributions
        sorted = sortBy(cachedContributors, 'contributions')
        break
      default:
        break
    }

    setContributors(sorted)
    setDescending(false)
  }

  const reverseContributors = _ => {
    let reversed = reverse([].concat(contributors))
    setContributors(reversed)
  }

  const loadPublicRepos = name => {
    fetch(`${GITHUB_API}/users/${name}/repos`)
      .then(res => res.json())
      .then(data => {
        setUserRepositories(data)
      })
  }

  useEffect(() => {
    let defaultQuery = 'gridsome/gridsome'
    getData(defaultQuery)
  }, [])

  return (
    <main>
      <Heading level={2} text="Github API crawler"/>
      <Formik 
        initialValues={{ 'repository': ''}}
        validateOnBlur={false}
        validate={values => {
          let errors = {}
          if (!values.repository) {
            errors.repository = "repository is required"
          }

          if (
            !values.repository.match(/([\w\d\.\-]+)(\/[\d\w]+)/g)
          ) {
            errors.repository = "Invalid repository"
          }

          return errors
        }}
        onSubmit={(values, form) => handleSubmit(values, form)}>
        {({ values, handleSubmit, isSubmitting }) => (
          <Form className="Search">
            <ErrorMessage name="repository" component="span" className="error"/>
            <label>
              <span>Type a Github repository <pre>e.g. gridsome/gridsome</pre></span>
              <Field type="text" name="repository"/>
            </label>
            <Button handleClick={handleSubmit} disabled={isSubmitting}>Search</Button>
          </Form>
        )}
      </Formik>

      <div className="Results">
        {repository && 
        <section className="Profile">
          <header>
            <a href={repository.html_url} target="blank"><Heading level={3} text={repository.full_name}/></a>
          </header>
        </section>}
        {contributors &&
          <section className="Contributions">
            <Heading underlined={true} level={3} text="Contributors"/>
            { contributors.length > 0 &&
            <>
              <div className="Controls">
                <label>
                    Sort repositories
                  <select onChange={sortContributors}>
                    <option value="full_name">Sort by name</option>
                    <option value="contributions">Sort by contributions</option>
                  </select>
                </label>
                <label>
                  <span>Reverse order</span>
                  <input type="checkbox" value={descending} onChange={reverseContributors}/>
                </label>
              </div>
              <List ordered={true}>
                { contributors.map((contributor, index) => {
                  return <li key={index} onClick={_ => loadPublicRepos(contributor.login)}>
                    <Heading level={4} text={contributor.login}/>
                    <p>{`Contributed ${contributor.contributions} times`}</p>
                  </li>
                })}
              </List>
            </>}
          </section>
        }
        { userRepositories &&
        <section className="Modal">
          <div className="Modal-content">
            <Button hollow={true} children="Close" handleClick={() => setUserRepositories()}/>
            <Heading level={3} text={`${userRepositories[0].owner.login} public repositories`}/>
            <List>
                {userRepositories.map(repo => <li key={repo.id}>
                    <a href={repo.html_url} target="blank">{repo.full_name}</a>
                </li>)
              }
            </List>
          </div>
        </section>}
      </div>
    </main>)
}


export default Page2
