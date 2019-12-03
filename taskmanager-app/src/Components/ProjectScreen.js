
import React from "react";

import ProjectList from "../Containers/ProjectListContainer";
import ProjectForm from "../Containers/ProjectFormContainer";
import ActiveProject from "../Containers/ActiveProjectContainer";

class ProjectScreen extends React.Component {
  render() {
    return (
      <>
        <ProjectForm submitText="Add" />
        <ProjectList />
        <ActiveProject />
      </>
    );
  }
}

export default ProjectScreen;
