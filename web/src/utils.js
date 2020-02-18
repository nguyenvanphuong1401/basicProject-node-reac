export const validateEmail = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

export const validateUrl = (str) => {
  const regex = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
  return !!regex.test(str)
}

export const isAdministrator = (user) => {

  if (!user) {
    return false
  }
  if (!user.roles) {
    return false
  }

  let isAdmin = false
  user.roles.forEach((r) => {
    if (r.name === 'administrator') {
      isAdmin = true
      return isAdmin
    }
  })
  return isAdmin
}