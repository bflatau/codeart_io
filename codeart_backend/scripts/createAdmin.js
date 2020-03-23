const bcryptController = require('../controllers/bcryptController');
const prompt = require('prompt');
const colors = require("colors/safe");
const createAdminController = require('../controllers/users/createAdminController');

prompt.start();
prompt.message = colors.green("");
prompt.delimiter = colors.green("");

prompt.get({
properties: {
    password: {
        description: colors.cyan("Enter Password")
    }
}
}, function (err, result) {
    console.log(colors.cyan("Password Entered Is: ") + colors.red(result.password));
    console.log('Generating Password Salt...')
    createAdminController.create_admin(bcryptController.getHashedPassword(result.password));
});