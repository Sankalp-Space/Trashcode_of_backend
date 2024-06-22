//console.log("server file is running ")

/* function add (a,b){
    return a+b;
}
 */
/* 
var add = function(a,b){
    return a+b
} */
//var add =(a,b)=>{return a+b} 

/* var add =(a,b)=>a+b;
var result =add(3,700)
console.log(result);

(function(){
    console.log("This line is added");
})()
 */
const notes= require('./imprt')
var _=require('lodash');
console.log('server file is available')

var ages =notes.age;
var result=notes.addNumber(ages+18,10)

console.log(ages);
console.log('result is now '+result)

var data=["person","person",1,2,1,2,"name","age","2"];
var filter =_.uniq(data);
console.log(filter);

console.log(_.isString('person'))