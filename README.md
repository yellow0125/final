# Recipes-Sharing-Social-Media

The React Native - Firebase Project Mobile App

- **Group**: 3
- **Members**:
  - 🧙🏻‍♀️ Cuiting Huang <huang.cui@northeastern.edu>
  - 🧙‍♂️ Xilan Wu <wu.xiaol@northeastern.edu>
  - 🧙🏻‍♀️ Yichao Wu <wu.yicha@northeastern.edu>

## Install dependencies
In order to install, clone this repository and run:
> npm install  

Set up .env file
>REACT_APP_api_key= "AIzaSyAccitAphJm637huwnPR9eDE_V_UIsj4xY"
>authDomain = "project-1100779858743235788.firebaseapp.com"
>projectId = "project-1100779858743235788"
>storageBucket = "project-1100779858743235788.appspot.com"
>messagingSenderId = "926625345465"
>appId = "1:926625345465:web:a9a2b9d42e3e7882779068"
>measurementId = "G-8W81QC9GCW"
>MAPS_API_KEY ="AIzaSyDKkvQrpqR0iWNrXSOjsHjllFgwpnAB7aY"

This was made with Expo, so you need it to run. To do it, run:
> npm start  
 //OR  
> npm expo start --tunnel

Test Account and Password
>test@gmail.com
>123123

This starts the Metro Bundler. You can simulate the app in an Android emulator (such as in Android Studio) or in your own device, Android or iOS powered, by downloading the Expo App.

## Structure of the App
### 1. Welcome page
- show users the basic feature and beautiful pictures.
- guide new users to register.

<pre> 
<img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/main/myapp/assets/img/welcome1.jpg" height="300" alt="loginpage"/>     <img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/main/myapp/assets/img/welcome2.jpg" height="300" alt="loginpage"/>     <img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/main/myapp/assets/img/welcome3.jpg" height="300" alt="loginpage"/>     <img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/main/myapp/assets/img/welcome4.jpg" height="300" alt="loginpage"/>
</pre>

### 2. Login and Register page
- allow users to register and login
- if the user is not login, they can only see these two page, and can do nothing.
<img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/homepage/myapp/assets/img/login.png" height="300" alt="loginpage"/>
  
### 3. All Recipes page
- first interaction between user, give user most important information.
- show users top recipes in different kinds and hot activities invitation.
- can place ads in the future to earn money.
 
<pre> 
<img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/main/myapp/assets/img/Home1.jpg" height="300" alt="loginpage"/>     <img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/main/myapp/assets/img/Home2.jpg" height="300" alt="loginpage"/>     <img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/main/myapp/assets/img/Home3.jpg" height="300" alt="loginpage"/>
</pre>
  
### 4. Location Recipes Page
- allow users to search recipes from different locations.
- multiple selection, free combination.

<pre><img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/main/myapp/assets/img/Disover1.jpg"  height="300" alt="loginpage"/>     <img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/main/myapp/assets/img/Discover2.png"  height="300" alt="loginpage"/></pre>

### 5. Add Recipes page and Image Upload Page
- allow users add a new recipe to db, and all user can see.
- allow users upload a picture from album or take a photo.

<pre><img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/main/myapp/assets/img/Add1.png"  height="300" alt="loginpage"/>     <img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/main/myapp/assets/img/Add2.png"  height="300" alt="loginpage"/>     <img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/main/myapp/assets/img/Add3.png"  height="300" alt="loginpage"/></pre>
 

### 6. Collected Recipes page
- allow users see recipes they liked.
- 
<img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/main/myapp/assets/img/collected.jpg" height="300" alt="loginpage"/>

### 7. Detail Recipe page
- allow users see recipes content.
- allow users like or unlike current recipe.
- allow users to delete their recipes.

<img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/main/myapp/assets/img/collected.jpg" height="300" alt="loginpage"/>

### 7. Profile page, Edit Profile page and My Recipe Page
- allow users check their information and edit them update to database
- allow users to locate himself by **google map API**
- allow users see all of their recipes they have upload.

<pre><img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/main/myapp/assets/img/Profile1.png"  height="300" alt="loginpage"/>     <img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/main/myapp/assets/img/map_notification.jpg"  height="300" alt="loginpage"/>     <img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/main/myapp/assets/img/Edit.png"  height="300" alt="loginpage"/>     <img src="https://github.com/yellow0125/recipes-sharing-social-media/blob/main/myapp/assets/img/MyRecipe.jpg"  height="300" alt="loginpage"/>     </pre>
  
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
#### 12/2/2022 Location and Welcome page
1. add map interaction in profile page
2. modify profile ui
3. when user install app and open at the first time, it will show the about me page
4. use ansycstorage to implement point 3

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

#### 11/29/2022 Implement show recipes in different locations
1. implement filter recipes function in RecipeList.js
2. implement picker function in LocaitonRecipes.js
3. others: modify styles

#### 12/2/2022 Upgrade picker to multiple selector
1. implement multiple selector to allow user select different recipes in LocationRecipes.js
2. Modify filter function in RecipeList.js to allow user customize recipesList.
3. Implement NearBy function in Header of LocationRecipes.js
4. Create new Screen NearBy which show all recipes in user's current country
5. Adjust the UI of multiple selector.
  
#### 12/3/2022 Modify RecipeList & Notification function
1. implment guidingPage if no recipe in selected locations
2. set up notification configuration and permission in all platform.
  
#### 12/5/2022 Modify syle of Recipe
1. Componentize the customized hook to reduce redundant codes.
2. Modify the style of like in Location & myRecipe. Like will be red if user liked.
3. Show the authors name in location & myRecipe.
  
####12/7/2022 Upgrade picker in Location Page
1. Allow user select the recipes with different difficulty.
2. change the logic of showing recipes: when user deleted all requirements, the page will show all recipes.


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

#### 11/30/2022 Implemented collectedRecipes
1. implemente collectedRecipes by adding new fields in firebase(likedUser)
2. add like and unlike buttons in RecipeDetails screen
3. finished add features about collected/like, such as update the number of likes, give different response to user in different liked status.

#### 12/2/2022 optimize collected/like feature and recipe detials page
1. optimize recipes details, add delete feature
2. adjust the step1 and step2 to multiplelines in AddRecipes and RecipeDetail
3. optimze features about collected/like, show solid icon when liked and hollow icon when unliked.

#### 12/6/2022 optimize like and delete buttons recipe detials page and finalize App
1. adjust like and delete buttons to floating action button so they have fixed position and user can access them anytime.
2. change the thumb to animation.
3. finalize the App, did some other little adjustment.
