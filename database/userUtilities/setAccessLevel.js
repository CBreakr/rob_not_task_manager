
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

//
// call the appropriate access function based on
// which level is being set
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

  // finally, time to save the user
  user.save();
}

/*
  general notes:

  - to apply an access level,
    first remove the other access levels
    then add to the specified level

  - if a user has admin rights to a project,
    they can't have their rights level changed
*/

function setNoneAccess(user, currentAccessLevel, projectId) {
  if(!listContainsId(user.adminProjectAccess, projectId)){
    user.readProjectAccess = removeIdFromList(user.readProjectAccess, projectId);
    user.useProjectAccess = removeIdFromList(user.useProjectAccess, projectId);
    if(currentAccessLevel !== "none"){
      // additional step:
      // remove from the project's list
      removeUserAccess(user, projectId);
    }
  }
  else{
    console.log("cannot change admin rights");
  }
}

function setReadAccess(user, currentAccessLevel, projectId) {
  if(!listContainsId(user.adminProjectAccess, projectId)){
    user.useProjectAccess = removeIdFromList(user.useProjectAccess, projectId);
    user.readProjectAccess.push(projectId);
  }
  else{
    console.log("cannot change admin rights");
  }
}

function setUseAccess(user, currentAccessLevel, projectId) {
  if(!listContainsId(user.adminProjectAccess, projectId)){
    user.readProjectAccess = removeIdFromList(user.readProjectAccess, projectId);
    user.useProjectAccess.push(projectId);
  }
  else{
    console.log("cannot change admin rights");
  }
}

function setAdminAccess(user, currentAccessLevel, projectId) {
  user.readProjectAccess = removeIdFromList(user.readProjectAccess, projectId);
  user.useProjectAccess = removeIdFromList(user.useProjectAccess, projectId);
  user.adminProjectAccess.push(projectId);
}

//
// UTILITIES
//

//
// remove the user from the specified project's
// userAccess reference list
//
function removeUserAccess(user, projectId) {
  ProjectModel.findById(projectId, (err, project) => {
    if(err){
      console.log("error getting the project");
    }

    project.userAccess = removeIdFromList(project.userAccess, user._id);
    project.save();
  });
}

//
// add the user to the specified project's
// userAccess reference list
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
// shorthand for finding id within reference list
//
function listContainsId(list, id){
  return list.find(element => {
    return element._id+"" === id+"";
  });
}

//
// shorthand for removing id from reference list
//
function removeIdFromList(list, id){
  const filtered = list.filter(element => {
    return element._id+"" !== id+"";
  });
  return filtered;
}

//
// EXPORT
//
module.exports = setAccessLevel;
