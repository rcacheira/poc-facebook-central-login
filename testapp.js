const app = require("./index.js");
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Local app listening on port ${port}!`));
