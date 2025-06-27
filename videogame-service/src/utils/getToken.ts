const getUuidFromToken = () => {
  const token = localStorage.getItem('idToken')
  if (token) {
    const tokenParts = token.split('.')
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]))
      return payload.uuid
    }
  }
  return null
}

export default getUuidFromToken
