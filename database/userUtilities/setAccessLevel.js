
const ProjectModel = require("../../models/ProjectModel");

/*
FOR REFERENCE ONLY
const accessLevelList = [
  "none",
  "read",
  "create/edit",
  "admin"
];
*/

/*
When user access to a project is added, here's where the dirty work is done


*/

//
//
//
function setAccessLevel(user, currentAccessLevel, projectId, level){
  switch(level){
    case "none":
      setNoneAccess(user, currentAccessLevel, projectId);
      break;
    case "read":
      setReadAccess(user, currentAccessLevel, projectId);
      break;
    case "create/edit":
      setUseAccess(user, currentAccessLevel, projectId);
      break;
    case "admin":
      setAdminAccess(user, currentAccessLevel, projectId);
      break;
    default:
      console.log("wrong access level sent", {level});
  }

  // the project needs a reference as well
  if(!currentAccessLevel && level !== "none"){
    addUserAccessToProject(user, projectId);
  }

  // finally, time to save...
  user.save();
}

//
//
//
function setNoneAccess(user, currentAccessLevel, projectId) {
  if(!listContainsProject(user.adminProjectAccess, projectId)){
    user.readProjectAccess = removeProjectFromList(user.readProjectAccess, projectId);
    user.useProjectAccess = removeProjectFromList(user.useProjectAccess, projectId);
    if(currentAccessLevel !== "none"){
      // remove from the project's list
      removeUserAccess(user, projectId);
    }
  }
  else{
    console.log("cannot change admin rights");
  }
}

//
//
//
function setReadAccess(user, currentAccessLevel, projectId) {
  if(!listContainsProject(user.adminProjectAccess, projectId)){
    user.useProjectAccess = removeProjectFromList(user.useProjectAccess, projectId);
    user.readProjectAccess.push(projectId);
  }
  else{
    console.log("cannot change admin rights");
  }
}

//
//
//
function setUseAccess(user, currentAccessLevel, projectId) {
  if(!listContainsProject(user.adminProjectAccess, projectId)){
    user.readProjectAccess = removeProjectFromList(user.readProjectAccess, projectId);
    user.useProjectAccess.push(projectId);
  }
  else{
    console.log("cannot change admin rights");
  }
}

//
//
//
function setAdminAccess(user, currentAccessLevel, projectId) {
  user.readProjectAccess = removeProjectFromList(user.readProjectAccess, projectId);
  user.useProjectAccess = removeProjectFromList(user.useProjectAccess, projectId);
  user.adminProjectAccess.push(projectId);
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
  const filtered = list.filter(element => {
    return element._id+"" !== projectId+"";
  });
  return filtered;
}

//
//
//
function removeUserAccess(user, projectId) {
  ProjectModel.findById(projectId, (err, project) => {
    if(err){
      console.log("error getting the project");
    }

    project.userAccess = project.userAccess.filter(u => {
      return u._id+"" !== user._id+"";
    });

    project.save();
  });
}

//
//
//
function addUserAccessToProject(user, projectId){
  ProjectModel.findById(projectId, (err, project) => {
    if(err){
      console.log("error getting the project");
    }
    project.userAccess.push(user._id);
    project.save();
  });
}

//
// EXPORT
//
module.exports = setAccessLevel;
