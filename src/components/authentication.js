import { hash as _hash, compare as _compare } from "bcrypt";
async function hash(password) {
  console.log(password);
  let hash = await _hash(password, 10);
  return hash;
}
async function compare(password, hash) {
  console.log(password);
  let comp = await _compare(password, hash);
  return comp;
}

function formJSON(formData) {
  var formObj = {};
  formData.forEach((value, key) => (formObj[key] = value));
  return JSON.stringify(formObj);
}

export { hash, compare, formJSON };
