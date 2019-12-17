
import React from "react";

import Logout from "../Containers/LogoutContainer";
import LoginForm from "../Containers/LoginFormContainer";
import RegisterForm from "../Containers/RegisterFormContainer";
import ProjectScreen from "../Containers/Project/ProjectScreenContainer";
import ListScreen from "../Containers/List/ListScreenContainer";
import TaskScreen from "../Containers/Task/TaskScreenContainer";

/*
  parent element for everything within the application
*/

const title = "Rob Not Task Manager";

class MainScreen extends React.Component {

  //
  // check for an active user session
  //
  componentDidMount(){
    this.props.getUser();
  }

  //
  // RENDER
  //
  render() {
    const user = this.props.currentUser;

    // if we have a user, then show the main screen with projects
    // if not, then show the landing page with login/register
    return (
      <div className="appScreen">
        {
          user
          ? <>
              <div className="header">
                <span className="app_title">{title}</span>
                <Logout />
              </div>
              <div className="main">
                <ProjectScreen />
                <ListScreen />
                <TaskScreen />
              </div>
            </>
          : <div className="landing_page">
              <h1 className="app_title">{title}</h1>
              <LoginForm />
              <RegisterForm />
            </div>
        }
      </div>
    )
  }
}

//
// EXPORT
//
export default MainScreen;
