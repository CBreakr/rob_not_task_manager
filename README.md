
## To Do App Goal and Usage Overview

This project is intended to demonstrate basic React+Redux usage, but will hopefully turn into something more generally useful (if only on a personal level). It's a pretty straightforward task-management app, organized into layers of projects, lists within projects, and then tasks within those lists.

To see the application in action, please [click here](https://rob-not-task-manager.herokuapp.com/). Please note that Heroku, where this is deployed, can sometimes take a bit of time to spin up.

You can register as a new user and play around, or sign in as the **guest** account using the password **12345**.

All accounts have the right to create new projects, over which they will have admin rights (read, edit, create child elements, delete, assign rights to other users).

The **guest** account has been given read-only access to the "task manager creation" project, which is where I'll be keeping track of my own tasks related to upkeep and improvement.

## Structure of the Application Code

The application has two parts: a backend database + api for accessing that data, and a component-based frontend client which interacts with the api.

There is a simple security model: users can have read, create/edit, or admin access at the project level, which then applies to all lists and tasks within that project.

The application is set up to launch both the api and the client together and uses a proxy to connect them.

#### Overall Concepts

The overall conceptual data structure of the application is as follows: **Users** sign in and have access to certain **projects**, these projects are broken down into distinct **lists**, and these lists contain individual **tasks**. All of the data elements have titles and descriptions, and the tasks additionally have metadata for their priority, expected size, current completion state, and due date. Users can perform CRUD operations on the data elements based on their access rights.

Any user has the right to create a new project, of which they are the administrator. The administrator of a project can delete any element within that project, as well as grant any level of access to another user. A user with admin access to a project cannot have their access level further altered.

### Back End

The application points to an online __Mongo__ database. The models for this database are in the **models** folder. __Mongoose__ is used to interact with the database, and the details of the code for that interaction can be found in the
**database** folder.

The **api** itself is very thin, receiving requests, picking out the relevant information from the path or body and then making a call to a method in the database folder.

User registration and login are handled via a __passport__ local strategy, simply encrypting passwords.

Use access is checked at each point of interaction with the database, based on the project involved and the action taken.

### Front End

The client code is within the **taskmanager-app** folder. For right now the only meaningful public asset is the barebones index.html page, with everything else being in the **src** directory.

There is the standard index.js starting point, loading in the App.js root element, which references the App.scss stylesheet. From there, everything points to the *MainScreen*.

The client uses __Redux__ to manage state, and so the code is broken up into React **Components**, **Containers** which wrap around those components with the react-redux connect method to create higher-order order components which connect to the redux store, and then **Reducers** and dispatch actions for altering shared state and interacting with the api, respectively.

#### User Interaction Components

###### User Account

We have forms for user registration and login which are just email plus password. There's also a Logout component which displays the current user's email and a button for logging out and ending their session.

###### Data Elements

The project, list, and task components all follow the same structure: there's a Screen which contains everything and which by default will show the relevant elements based on the current context within the plural version of that element: Projects, Lists, Tasks. So we'd see the projects the user has access to within the *Projects* inside of the *ProjectScreen*, any lists belonging a selected project within the *Lists* inside of the *ListScreen*, and any Tasks belonging to a selected list within the *Tasks* inside of the *TaskScreen*.

If the user has "use"-level access, they will also see the *AddNewXXX* component displayed which they can use to enter a new element to be saved to the database. Clicking this button will show the for associated with that type (*ProjectForm*, *ListForm*, *TaskForm*) - these components will also be used for editing existing elements.

If the user clicks on one of the existing elements show in the Screen, that element will be replaced with the *ActiveXXX* component. This will show a full view of all information and metadata for the element and, if they have the proper access level, allow the user to click a button to edit that element or delete it.

The project has one additional extra component that's within the Active project: the *ProjectAccessForm*. This allows an admin of the project to search for another user by email and then (if that user isn't themselves an admin), choose an access level to apply to that user. Note that this means a non-admin user can have their access to a project lowered or removed as well.

## using create react app is great!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
