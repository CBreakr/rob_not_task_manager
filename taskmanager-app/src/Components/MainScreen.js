
import React from "react";

import Logout from "../Containers/LogoutContainer";
import LoginForm from "../Containers/LoginFormContainer";
import RegisterForm from "../Containers/RegisterFormContainer";
import ProjectScreen from "../Containers/Project/ProjectScreenContainer";
import ListScreen from "../Containers/List/ListScreenContainer";
import TaskScreen from "../Containers/Task/TaskScreenContainer";

const title = "Rob Not Task Manager";

class MainScreen extends React.Component {
  componentDidMount(){
    // check for user
    this.props.getUser();
  }

  render() {
    const user = this.props.currentUser;

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
              <h1>{title}</h1>
              <LoginForm />
              <RegisterForm />
            </div>
        }
      </div>
    )
  }
}

export default MainScreen;
