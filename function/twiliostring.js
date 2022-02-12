const function_string_manipulation = (str)=>{
    console.log(str)
    let myArray = str.split("%");
    let obj={
        key: myArray[0],
        testid: myArray[1],
        rollnumber: myArray[2]
    }
 return obj;
}
module.exports = function_string_manipulation