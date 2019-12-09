
import React from "react";

import Logout from "../Containers/LogoutContainer";
import LoginForm from "../Containers/LoginFormContainer";
import RegisterForm from "../Containers/RegisterFormContainer";
import ProjectScreen from "../Containers/Project/ProjectScreenContainer";
import ListScreen from "../Containers/List/ListScreenContainer";
import TaskScreen from "../Containers/Task/TaskScreenContainer";

class MainScreen extends React.Component {
  componentDidMount(){
    // check for user
    this.props.getUser();
  }

  render() {
    const user = this.props.currentUser;

    return (
      <div>
        {
          user
          ? <>
              <div className="header">
                <span className="app_title">Rob Not To Do</span>
                <Logout />
              </div>
              <div className="main">
                <ProjectScreen />
                <ListScreen />
                <TaskScreen />
              </div>
            </>
          : <>
            <h1>Rob Not To Do</h1>
              <LoginForm />
              <RegisterForm />
            </>
        }
      </div>
    )
  }
}

export default MainScreen;
