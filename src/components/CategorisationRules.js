import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Input from './form/Input'

class CategorisationRules extends Component {
  constructor(props) {
    super(props)
    this.addCategorisationRule = this.addCategorisationRule.bind(this)
    this.removeCategorisationRule = this.removeCategorisationRule.bind(this)
    this.handleKeyDownRemove = this.handleKeyDownRemove.bind(this)
  }

  addCategorisationRule(form) {
    const { description, category, subCategory } = form
    const categorisationRule = {
      description,
      category,
      subCategory
    }
    this.props.addCategorisationRule(this.props.currentUser, categorisationRule)
      .then(() => {
        this.props.destroy('categorisationRules')
      })
      .catch(error => {
        console.log(error)
      })
  }

  removeCategorisationRule(event, categorisationRule) {
    event.preventDefault()
    this.props.removeCategorisationRule(this.props.currentUser, categorisationRule)
      .then(() => {

      })
      .catch(error => {
        console.log(error)
      })
  }

  handleKeyDownRemove(event, categorisationRule) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.removeCategorisationRule(event, categorisationRule)
    }
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.addCategorisationRule)}>
        <h2>Manage categorisation rules</h2>
        <table>
          <tbody>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Action</th>
          </tr>
          {this.props.currentUser.categorisationRules.map((categorisationRule, index) => {
            const key = `categorisationRule_${index}`
            return (
              <tr key={key}>
                <td>{categorisationRule.description}</td>
                <td>{categorisationRule.category}</td>
                <td>{categorisationRule.subCategory}</td>
                <td>
                  <span
                    tabIndex="0"
                    id={`removeCategorisationRule_${index}`}
                    onKeyDown={event => { this.handleKeyDownRemove(event, categorisationRule) }}
                    onClick={event => { this.removeCategorisationRule(event, categorisationRule) }}
                  >
                    X Delete
                  </span>
                </td>
              </tr>
            )
          })}
          <tr>
            <td>
              <label htmlFor="description" className="sr-only" aria-hidden={true}>Description</label>
              <Field
                id="description"
                name="description"
                type="text"
                component={Input}
              />
            </td>
            <td>
              <label htmlFor="category" className="sr-only" aria-hidden={true}>Category</label>
              <Field
                id="category"
                name="category"
                type="text"
                component={Input}
              />
            </td>
            <td>
              <label htmlFor="subCategory" className="sr-only" aria-hidden={true}>Sub Category</label>
              <Field
                id="subCategory"
                name="subCategory"
                type="text"
                component={Input}
              />
            </td>
            <td>
              <button
                id="addRule"
                type="submit"
              >
                Add
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </form>
    )
  }
}

CategorisationRules.propTypes = {
  addCategorisationRule: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    firstName: PropTypes.string
  }).isRequired,
  destroy: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  removeCategorisationRule: PropTypes.func.isRequired
}

const validate = values => {
  const errors = {}

  if (!values.description) {
    errors.description = 'Please enter a description'
  }

  if (!values.category) {
    errors.category = 'Please enter a category'
  }

  if (!values.subCategory) {
    errors.subCategory = 'Please enter a sub category'
  }

  return errors
}

export default reduxForm({
  form: 'categorisationRules',
  validate
})(CategorisationRules)
