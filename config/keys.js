// dbPassword = 'mongodb+srv://YOUR_USERNAME_HERE:'+ encodeURIComponent('YOUR_PASSWORD_HERE') + '@CLUSTER_NAME_HERE.mongodb.net/test?retryWrites=true';

const databaseName = 'userScore';
const userName = 'loganle';
const psw = 'loganle123';
dbPassword = `mongodb+srv://${userName}:${psw}@cluster0-lv7h3.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
module.exports = {
    mongoURI: dbPassword
};
