const globalState = {
  sessions: [],
  characters: []
}

const sessionStoreMiddleWare = (req, _res, next) => {
  req.sessions = globalState.sessions
  next()
}

module.exports = { sessionStoreMiddleWare }
