
const UserModel = require("../models/UserModel");
const ProjectModel = require("../models/ProjectModel");
const ListModel = require("../models/ListModel");

const cleanValue = require("../formatUtilities/cleanUserInput");
const removeLists = require("./removalUtilities/removeLists");
const removeProjectAccess = require("./removalUtilities/removeProjectAccess");

//
// expose these to the outside
//
const projectInteraction = {
  get: getProject,
  post: postProject,
  put: putProject,
  delete: deleteProject
};

//
// - get the projects which the user has access to
// - attach "use" or "admin" access specification
// to any projects for which the user has that
// level of access
//
function getProject(res, next, user) {
  // get the user from the DB as a source
  UserModel.findById(user._id)
  .populate("adminProjectAccess")
  .populate("useProjectAccess")
  .populate("readProjectAccess")
  .exec()
  .then(user => {
    // apply the specific level of access
    // for the project if it's greater than simple read
    //
    // note: need to convert to a proper JS object first
    //
    const adminProjects = user.adminProjectAccess.map(project => {
      const jsProject = project.toObject();
      jsProject.isAdminAccess = true;
      return jsProject;
    });
    const useProjects = user.useProjectAccess.map(project => {
      const jsProject = project.toObject();
      jsProject.isUseAccess = true;
      return jsProject;
    });

    // merge all of the project access lists and return
    const allProjects = [...adminProjects, ...useProjects, ...user.readProjectAccess];
    return res.json({projects: allProjects});
  })
  .catch(err => console.log("error: project GET, find user", {err}));
}

//
// create a new project, add the current user as admin
//
function postProject(res, next, project, userId) {
  UserModel.findById(userId)
  .then(user => {

    project.projectname = cleanValue(project.projectname);
    project.description = cleanValue(project.description);
    project.createdBy = userId;
    project.userAccess = [userId];

    ProjectModel.create(project, (err, entry) => {
      if(err) {
        return next(err);
      }
      user.adminProjectAccess.push(entry._id);
      user.save()
      .then(result => {
        // and I also need to create a default list for the project
        const defaultList = {
          listname: `${entry.projectname} base list`,
          description: `default list for the ${entry.projectname} project`,
          parentProject: entry._id,
          createdBy: user._id,
        }

        ListModel.create(defaultList, (err, list) => {
          if(err) {
            // don't worry about this, since it doesn't really harm anything
          }
          else{
            console.log("list created", {list});
          }
        });

        return res.json({newProject: entry});
      })
      .catch(err => next(err));
    });
  })
  .catch(err => next(err));
}

//
// check if the user has "use" or "admin" access
// to the specified project and, if so, update it
//
function putProject(res, next, project, userId) {
  UserModel.findById(userId)
  .then(user => {
    // make sure the user has access: use or admin
    const projectAccess = [...user.adminProjectAccess, ...user.useProjectAccess];

    if(projectAccess.find(access => access._id == project._id)){
      ProjectModel.findById(project._id, (err, entry) => {
        if(err){
          return next(err);
        }

        // update the values and save
        entry.projectname = cleanValue(project.projectname);
        entry.description = cleanValue(project.description);
        entry.save();

        return res.json({message:"project updated"});
      });
    }
  })
  .catch(err => next(err));
}

//
// check if the user has "admin" access
// to the specified project and, if so, delete it
//
function deleteProject(res, next, projectId, userId) {
  UserModel.findById(userId)
  .then(user => {
    // make sure the user has admin access
    if(user.adminProjectAccess.find(access => access._id == projectId)){
      ProjectModel.findById(projectId, (err, project) => {
        if(err){
          console.log("error finding project for deletion", {err});
          return next(err);
        }
        project.deleteOne();
        // also be sure to remove the child lists of this project
        removeLists(projectId, user, next);
        // ...and to remove the project access from all users
        removeProjectAccess(project, next);
        return res.json({message:"deletion successful"});
      });
    }
    else{
      console.log("could not find the project to delete");
    }
  })
  .catch(err => next(err));
}

//
// EXPORT
//
module.exports = projectInteraction;
