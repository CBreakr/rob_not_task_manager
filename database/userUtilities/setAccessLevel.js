
const accessLevelList = [
  "none",
  "read",
  "create/edit",
  "admin"
];

//
//
//
function setAccessLevel(user, projectId, level){
  switch(level){
    case "none":
      if(!listContainsProject(user.adminProjectAccess, projectId)){
        console.log("remove read and use access");
        user.readProjectAccess = removeProjectFromList(user.readProjectAccess, projectId);
        user.useProjectAccess = removeProjectFromList(user.useProjectAccess, projectId);
      }
      else{
        console.log("cannot change admin rights");
      }
      break;
    case "read":
      if(!listContainsProject(user.adminProjectAccess, projectId)){
        console.log("remove use access");
        user.useProjectAccess = removeProjectFromList(user.useProjectAccess, projectId);
        user.readProjectAccess.push(projectId);
      }
      else{
        console.log("cannot change admin rights");
      }
      break;
    case "create/edit":
      if(!listContainsProject(user.adminProjectAccess, projectId)){
        console.log("remove read access");
        user.readProjectAccess = removeProjectFromList(user.readProjectAccess, projectId);
        user.useProjectAccess.push(projectId);
      }
      else{
        console.log("cannot change admin rights");
      }
      break;
    case "admin":
      console.log("remove read and use access");
      user.readProjectAccess = removeProjectFromList(user.readProjectAccess, projectId);
      user.useProjectAccess = removeProjectFromList(user.useProjectAccess, projectId);
      user.adminProjectAccess.push(projectId);
      break;
    default:
      console.log("wrong access level sent");
  }

  user.save();
}

//
//
//
function listContainsProject(list, projectId){
  return list.find(element => {
    return element._id+"" === projectId+"";
  });
}

//
//
//
function removeProjectFromList(list, projectId){
  console.log({listBefore:list});
  const filtered = list.filter(element => {
    return element._id+"" !== projectId+"";
  });
  console.log({listAfter:filtered});
  return filtered;
}

//
// EXPORT
//
module.exports = setAccessLevel;
