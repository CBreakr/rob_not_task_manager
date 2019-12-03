
import React from "react";

import Projects from "../Containers/ProjectsContainer";
import ProjectForm from "../Containers/ProjectFormContainer";
import ActiveProject from "../Containers/ActiveProjectContainer";

class ProjectScreen extends React.Component {
  render() {
    return (
      <>
        <ProjectForm submitText="Add" />
        <Projects />
        <ActiveProject />
      </>
    );
  }
}

export default ProjectScreen;
