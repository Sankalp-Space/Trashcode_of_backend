var fs = require('fs');
var os = require('os');

var user =os.userInfo();
console.log(user.username);

fs.appendFile('gretting.txt', 'Hi  '+user.username+' !\n',()=>{console.log('file is succesfully created');})

