class Cache {
  constructor () {
    this.items = {}
  }

  addItem (key, value) {
    this.items[key] = value
  }

  removeItem (key) {
    delete this.items[key]
  }

  findItem (key) {
    return this.items[key]
  }

  clear () {
    this.items = {}
  }
}

module.exports = Cache
