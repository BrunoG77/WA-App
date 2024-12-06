# Workout Advance App

## Here lies my Gym Web application to store user data, create mesocycles and follow a workout plan.

### Distinctiveness and Complexity
This project meets the criteria for distinctiveness and complexity by addressing a domain outside of typical social networks or e-commerce applications. Specifically, it is a workout gym routine application that enables users to design personalized workout plans, referred to as "mesocycles." Users can create, store, and follow these plans until their completion or decide to develop new ones. The complexity of the application is particularly evident in the creation of mesocycles, which involves dynamic manipulation of HTML elements using JavaScript. This includes seamlessly adding and removing exercises, implementing smooth animations, and providing interactive modals to enhance user experience. Additionally, the application offers detailed information for each exercise, such as targeted muscle groups and execution instructions, ensuring users are well-informed. The ability to easily delete mesocycles from the database further highlights the application's functionality and usability. All features are implemented with precision and efficiency, demonstrating the project's technical sophistication.

### What’s contained in each file?
* ***Python files***:
    + **views.py:** This file constitutes the Python backend and contains multiple functions to handle the application's core operations:
      + **login_view:** Attempts to authenticate the user for login. If authentication fails, it redirects the user to retry, displaying a message indicating that the email or password is incorrect;
      + **logout_view:** Logs the user out of the application;
      + **register:** Registers a new user in the database using the provided email and password;
      + **index:** Verifies whether the user has any existing mesocycles. If mesocycles exist, it retrieves the most recently created one, which represents the current workout plan. If no mesocycles are found, it displays a message prompting the user to create one;
      + **new_meso:** Renders the HTML page for creating a new mesocycle, which is primarily handled by JavaScript;
      + **create_meso:** Captures data sent via a POST request from the JavaScript frontend when the user creates a mesocycle. This data is then stored in the user database;
      + **mesocycles:** Retrieves all mesocycles associated with the user;
      + **mesocycles_delete:** Accepts the ID of a specific mesocycle and deletes it from the database.
    + **models.py:** Defines the database models:
      + **User Model:** Stores user-related data;
      + **Mesocycle Model:** Stores information about mesocycles and links them to users through a foreign key relationship;
      + **Day Model:** Represents individual days within a mesocycle;
      + **Muscle Exercise Model:** Stores data about specific muscles and corresponding exercises, linking them to the relevant day and mesocycle.
+ ***Html files:*** 
  + **layout.html:** Serves as the base layout used by all other HTML files;
  + **register.html:** Displays the registration page for creating a user account;
  + **login.html:** Provides the login page, similar in style to the registration page;
  + **index.html:** Acts as the homepage, displaying the most recent workout plan created by the user;
  + **new_meso.html:** Facilitates the creation of new mesocycles. While largely manipulated by JavaScript, it contains pre-defined HTML elements;
  + **mesocycles.html:** Displays all mesocycles created by the user and facilitates the respective deletion.
+ ***Javascript file:*** The file, named ***wa.js***, contains the entirety of the JavaScript and frontend functionality. It is responsible for dynamically managing the new mesocycle page. This includes enabling the addition of new day blocks, within which users can select a muscle group. To facilitate this selection, a modal is opened, allowing the user to choose a muscle, which is then added to the muscle block. Within the muscle block, another button allows the user to open an additional modal to select specific exercises, accompanied by detailed information about each one. Each day block operates independently, providing users with the flexibility to select their workout days, targeted muscles, and exercises, along with accompanying information about the exercises. Users can also define the name and duration (in weeks) of their workout plan. The system incorporates a "deload week," during which the number of sets, repetitions, and weights are halved to aid recovery from muscle and central nervous system fatigue. All the data generated during the creation of the mesocycle is submitted to the Python backend through a POST request, where it is stored in the database for future reference and use.
+ ***CSS File:*** The file ***style.css*** contains the style of each class and ID used.

### How to run the application
To start the server, execute the command `python3 manage.py runserver` in the terminal. Once the server is running, navigate to the registration page to create an account. After successfully registering, proceed to the "New Mesocycle" page. On this page, you can design a customized mesocycle according to your preferences. After creating your mesocycle, you can follow the plan for the duration of the selected weeks.
The libraries used are in the *views.py* file.

### Additional information
This project leveled up my skills in both frontend and backend management. Thank you very much for the opportunity. In the future I will upgrade the application.