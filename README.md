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
#### 11/24/2022 My Recipes Screen and ProfileScreen
1. create my recipes screen, show 2 columns
2. add icons and other navigate

#### 11/25/2022 Location
1. add location in profile page
2. use Geocoder to reverse location data

### Xiaolan Wu
#### 11/17/2022 Saving data Using Firebase and Redux
1. implement creating new user to database function
2. implement the Redux to allow freely access the states of users in component

#### 11/18/2022 Implemented Camera and Image Picker
1. implement Camera function, allowing user take picture fliping camere
2. implement Image picker function, allowing user select photo from gallery
3. implement camera//gallery request function
  
#### 11/22/2022 Implement post in AllRecipeScreen
1. implement uploadImageToDB function in AddRecipe Screen
2. implement flatList to show each recipe in AllRecipeScreen.
2. others: Add componenet RecipeButton, RecipeList and offer more styles.

### Yichao Wu
#### 11/17/2022 All screens without features
1. Implement all screens of this app, including LocationsRecripes, AllRecipes, AddRecipes, CollectedRecipes and Profile.
2. Implement the navigation based on bottom tab.
3. create more UI components

#### 11/21/2022 Implemented uploading Image to firebase
1. implemente a new screen to preview and upload Image to firebase
2. implement a picker to select location of recipe

#### 11/22/2022 Implemented editProfile
1. implemente a new screen to edit profile information and update datebase
2. modify firestore and add functions to support CRUD operations.

#### 11/29/2022 Implemented RecipeDetails and adjust the UI of AllRecipes & MyRecipes
1. implemente a new screen to view the details of specific recipe.
2. adjust the UI of AllRecipes and MyRecipes
3. implemente the navigation from ALlRecipes/MyRecipes to RecipeDetails

## Structure of the App
### 1. Login and Register page
- allow users to register and login
- if the user is not login, they can only see these two page, and can do nothing.
<img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/homepage/myapp/assets/img/login.png" height="300" alt="loginpage"/>

### 2. Profile page and Edit Profile page
- allow users check their information and edit them update to database
- allow users to locate himself by **google map API**
<img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/UI-recipe/myapp/assets/img/profile2.png" height="300" alt="profile"/>

### 3. My Recipes page and Add a Recipes page
- allow users add a new recipe to db, and all user can see.
- allow users see all of their recipes they have upload
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
