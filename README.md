# PetAdopt
*Because our pets bring love*

## What's it about?
This is an application for an animal shelter and its pets. <br>
It is designed to facilitate the process of adopting a desired pet. <br><br>
*Personal project for non-commercial use*
 
## Structure
The application is split in three main parts

* **Public area**

    * `Home`, `About`, `Privacy`, `Contacts` & `The Pets` pages - guests are allowed to see all available pets that are open for adoption<br>
    * `Pets Details` page - guests are also allowed to see pets details: `category`, `weight` and `description` <br>
    * `Register` & `Login` pages <br>

* **Private  User area**

    * `My Pets` page - registered users can see all the pets they have or are trying to adopt <br>
    * Registered users can `adopt` a desired pet which makes the pet disappear from the public `The Pets` page <br>
    
* **Private  Admin area**
  
    * Admin can `add` new pets to the app<br>
    * Admin can `edit` & `delete` pets<br>
    * Admin can approve or disapprove adoption requests at `Pets For Adoption` page<br>
    * Admin can see all the adopted pets at `Adopted Pets` page <br>
    
* Additional
    * Error Pages
        * 404 Not Found Page
        * ErrorBoundary
  
<br />

## Technologies used for "PetAdopt":

- React 
- Firebase Realtime Database
- Firebase Authentication
- Reactstrap
- React-icons
- SaSS Stylesheets
- Google Maps Integration

<br />

## React is the core technology for "PetAdopt" and it is developed by using:
`Props`<br />
`State` <br />
`Context` <br />
`Hooks` <br />
`Client-side rendering & routing via React Router` <br />
`Protected routes` <br />
`Synthetic events` <br />
`Reactstrap components integration` <br />
`Data Validation` <br/>
`Error handling` <br />

<br>

### Available Scripts for local build
This project was created with [Create React App](https://github.com/facebook/create-react-app). <br>
Run the following commands in the project directory:

`npm install` <br>
`npm start`  <br>

The app will run in the development mode<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
