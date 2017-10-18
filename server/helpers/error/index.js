
const errorHelper = {
  throwError: (error, res) => {
    console.log(error)
    switch (error) {
      case 'login not found':
        return res.status(404).send({ code: 404, message: 'This email address is not associated with an account.' })
      case 'login wrong password':
        return res.status(401).send({ code: 401, message: 'Your password is incorrect, please try again.' })
      case 'not found':
        return res.status(404).send({ code: 404, message: 'There was an error, please try again.' })
      default:
        return res.status(500).send({ code: 500, message: 'There was an error, please try again.' })
    }
  }
}

module.exports = errorHelper
