# Recipes-Sharing-Social-Media

The React Native - Firebase Project Mobile App

- **Group**: 3
- **Members**:
  - 🧙🏻‍♀️ Cuiting Huang <huang.cui@northeastern.edu>
  - 🧙‍♂️ Xilan Wu <wu.xiaol@northeastern.edu>
  - 🧙🏻‍♀️ Yichao Wu <wu.yicha@northeastern.edu>

## Iterations

### Iteration 1
In the first week, we plan to do these work below:
- Create React Native components to represent the functionality we will be building,
- Get the overall structure of our app. 
- Establish Navigation and the basis of CRUD operations to Firestore


## Update & Progress
### CuitingHuang
#### 11/15/2022 Login and Register
1. implement these two components login and register
2. design the logo of our app <Fooriend> displaying in these two page
3. implement the navigation between login and register page, when user is not **Authenticated**
4. create color and style constants files
#### 11/19/2022 Style of add recipe screen
1. modify layout and styles of add recipes screen
2. modify main button mode style, offer more styles
#### 11/21/2022 Profile page -Camera
1. modify details of profile page
2. delete save screen, add uri in Add screen
3. Add image manager component

### Xiaolan Wu
#### 11/17/2022 Saving data Using Firebase and Redux
1. implement creating new user to database function
2. implement the Redux to allow freely access the states of users in component

#### 11/18/2022 Implemented Camera and Image Picker
1. implement Camera function, allowing user take picture fliping camere
2. implement Image picker function, allowing user select photo from gallery
3. implement camera//gallery request function

### Yichao Wu
#### 11/17/2022 All screens without features
1. Implement all screens of this app, including LocationsRecripes, AllRecipes, AddRecipes, CollectedRecipes and Profile.
2. Implement the navigation based on bottom tab.
3. create more UI components

#### 11/21/2022 Implemented uploading Image to firebase
1. implemente a new screen to preview and upload Image to firebase
2. implement a picker to select location of recipe



## Structure of the App
### 1. Login and Register page
- allow users to register and login
- if the user is not login, they can only see these two page, and can do nothing.
<img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/homepage/myapp/assets/img/login.png" height="300" alt="loginpage"/>

## Install dependencies
In order to install, clone this repository and run:

> npm install  
//OR  
>yarn install

This was made with Expo, so you need it to run. To do it, run:
> npm start  
 //OR  
> npm expo start --tunnel

This starts the Metro Bundler. You can simulate the app in an Android emulator (such as in Android Studio) or in your own device, Android or iOS powered, by downloading the Expo App.
