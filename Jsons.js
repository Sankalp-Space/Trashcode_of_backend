
//converting string to jsonobject
/* const jsonString= '{"name":"Sankalp","age":21,"city":"Agra"}';
const jsonObject=JSON.parse(jsonString);
console.log(jsonObject); */
const objectToConvert={
    name:"Sankalp Shrivastav",
    age:25,
    city:"Agra"
};
const json =JSON.stringify(objectToConvert);//convert object to string  
console.log(json);
console.log(typeof json);