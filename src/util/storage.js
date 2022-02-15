
export const storage = {
  setItem: (name, item) => {
    if (item) {
      localStorage.setItem(name, JSON.stringify(item))
    }
  },

  getItem: (name) => {
    const item = localStorage.getItem(name);
    if (item && item !== 'undefined') {
      return JSON.parse(item)
    }
  }
}