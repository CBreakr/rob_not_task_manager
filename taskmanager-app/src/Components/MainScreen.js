
import React from "react";

import Logout from "../Containers/LogoutContainer";
import LoginForm from "../Containers/LoginFormContainer";
import RegisterForm from "../Containers/RegisterFormContainer";
import ProjectList from "../Containers/ProjectListContainer";
import ProjectForm from "../Containers/ProjectFormContainer";
import ProjectScreen from "../Containers/ProjectScreenContainer";

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
              <Logout />
              <ProjectForm />
              <ProjectList />
              <ProjectScreen />
            </>
          : <>
              <LoginForm />
              <RegisterForm />
            </>
        }
      </div>
    )
  }
}

export default MainScreen;
