const bcrypt = require('bcrypt');

let hash = bcrypt.hashSync("1234", 10);
console.log(bcrypt.compareSync("1234", hash));
