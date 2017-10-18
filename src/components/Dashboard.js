import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { destroy } from 'redux-form'
import { uploadBankTransactions } from '../actions/bankTransactions'
import { addCategorisationRule, removeCategorisationRule } from '../actions/users'
import Container from './Container'
import CategorisationRules from './CategorisationRules'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.uploadStatement = this.uploadStatement.bind(this)
  }

  uploadStatement(event) {
    const bankStatement = event.target.files[0]
    this.props.actions.uploadBankTransactions(bankStatement)
      .then(() => {
        const bankStatementSelect = document.querySelector('#bankStatementSelect')
        if (bankStatementSelect) {
          bankStatementSelect.value = ''
        }
      })
  }

  render() {
    return (
      <Container>
        <h1>Hi, {this.props.currentUser.firstName}</h1>
        <h2>Feed me bank statements</h2>
        <label htmlFor="bankTransactionsSelect" className="sr-only" aria-hidden={true}>Upload your bank transactions CSV</label>
        <input
          id="bankTransactionsSelect"
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={this.uploadStatement}
        />
        <CategorisationRules
          addCategorisationRule={this.props.actions.addCategorisationRule}
          destroy={this.props.actions.destroy}
          removeCategorisationRule={this.props.actions.removeCategorisationRule}
          history={this.props.history}
          currentUser={this.props.currentUser}
        />
        {this.props.bankTransactions.map((bankTransaction, index) => {
          const key = `transaction_${index}`
          return (
            <div key={key}>
              {bankTransaction.field1} {bankTransaction.field2} {bankTransaction.field3} {bankTransaction.field4}
            </div>
          )
        })}
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    bankTransactions: state.bankTransactions,
    currentUser: state.users.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addCategorisationRule,
      destroy,
      removeCategorisationRule,
      uploadBankTransactions
    }, dispatch) }
}

Dashboard.propTypes = {
  actions: PropTypes.shape({
    addCategorisationRule: PropTypes.func,
    destroy: PropTypes.func,
    removeCategorisationRule: PropTypes.func,
    uploadBankTransactions: PropTypes.func
  }).isRequired,
  bankTransactions: PropTypes.arrayOf(
    PropTypes.shape({
      field1: PropTypes.string,
      field2: PropTypes.string,
      field3: PropTypes.string,
      field4: PropTypes.string
    })
  ).isRequired,
  currentUser: PropTypes.shape({
    firstName: PropTypes.string
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
