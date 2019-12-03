
import React from "react";

import ProjectForm from "../../Containers/Project/ProjectFormContainer";
import Projects from "../../Containers/Project/ProjectsContainer";
import ActiveProject from "../../Containers/Project/ActiveProjectContainer";

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
