
import React from "react";

import Logout from "../Containers/LogoutContainer";
import DBTest from "../Containers/DBTestContainer"
import LoginForm from "../Containers/LoginFormContainer";
import RegisterForm from "../Containers/RegisterFormContainer";
import ProjectList from "../Containers/ProjectListContainer";
import ProjectForm from "../Containers/ProjectFormContainer";

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
              <DBTest />
              <ProjectForm />
              <ProjectList />
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
