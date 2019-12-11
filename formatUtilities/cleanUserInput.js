
//
// remove HTML tags from the input value
//
module.exports = (value) => {
  if(!value){
    // null, undefined, blank, false
    return value;
  }
  else if(typeof value === "string"){
    // remove all found instances
    return value.replace(/(<[^>]*>)/g, "");
  }
  // if it's not a string, just return
  return value;
}
