
import React from "react";

import { Scrollbars } from "react-custom-scrollbars";

// import ProjectForm from "../../Containers/Project/ProjectFormContainer";
// <ProjectForm submitText="Add" />
import AddNewProject from "./AddNewProject";
import Projects from "../../Containers/Project/ProjectsContainer";

class ProjectScreen extends React.Component {
  render() {
    return (
      <div className="project_screen">
        <div className="project_header">
          <h2>Projects</h2>
        </div>
        <Scrollbars autoWidth autoHide style={{height:"85vh"}}>
          <div className="project_container">
            <AddNewProject />
            <Projects />
          </div>
        </Scrollbars>
      </div>
    );
  }
}

export default ProjectScreen;
