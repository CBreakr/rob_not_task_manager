
import React from "react";

// import ProjectForm from "../../Containers/Project/ProjectFormContainer";
// <ProjectForm submitText="Add" />
import AddNewProject from "./AddNewProject";
import Projects from "../../Containers/Project/ProjectsContainer";
import ActiveProject from "../../Containers/Project/ActiveProjectContainer";

class ProjectScreen extends React.Component {
  render() {
    return (
      <>
        <AddNewProject />
        <Projects />
        <ActiveProject />
      </>
    );
  }
}

export default ProjectScreen;
