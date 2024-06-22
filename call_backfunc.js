/* function callback(){
    console.log("The multiplicaation is Done ")
}

const multiply =function(a,b,callback){
    var result=a*b
    console.log('result :...'+result);//main function completed
    callback()
}

multiply(54,49,callback) */


const add = function(a,b,callbckfunc){
    var result=a+b;
    console.log("result :...."+result);
    callbckfunc();
}

/* add(102,105,function(){
    console.log("Callback function is called")
})
 */
add(4,5,()=>console.log("another way to create callback function"))