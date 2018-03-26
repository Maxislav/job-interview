const socketUrl = {
  dev:'http://localhost:8888',
  prod: 'http://178.62.44.54:8888'
}
export default socketUrl[NODE_ENV]


