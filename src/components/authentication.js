const bcrypt = require("bcrypt");
async function hash(password) {
  console.log(password);
  let hash = await bcrypt.hash(password, 10);
  return hash;
}
async function compare(password, hash) {
  console.log(password);
  let comp = await bcrypt.compare(password, hash);
  return comp;
}

module.exports = { hash, compare };
