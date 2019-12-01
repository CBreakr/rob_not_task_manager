
import React from "react";

class ProjectList extends React.Component {

  componentDidMount(){
    if(this.props.user && !this.props.projects){
      this.props.getProjects();
    }
  }

  render(){

    let projects = [];
    if(this.props.projects){
      projects = this.props.projects;
    }

    return (
      <div>
        ProjectList:
        <ul>
        {
          projects.map(project => {
            return (
              <li key={project._id}>{project.projectname}</li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

export default ProjectList;
