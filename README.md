# Story of Pets

**Story of Pets** is a web application where users can register up to 5 pets, track their daily activities, and add journals on Tuesdays and Fridays. Users can also add a comprehensive journal on the last Friday of each month. The application features Firebase authentication (via Google and Facebook), and uses Firebase for storing pet details and journal entries.


## Tech Stack

**Front-End:** Html, CSS, JavaScript, React, Redux, TailwindCSS

**Back-End:** Node.js, Express.js

**Database:** Firebase

**Cloud:** aws


### Installation

1. Clone the repository:

- **Front - End**
```bash
   git clone https://github.com/Story-Of-Pets/MVP-PWA-Frontend
   ```

- **Backend - End**
```bash
   git clone https://github.com/Story-Of-Pets/MVP-PWA-Backend
   ```
    
2. Install frontend dependencies:
```bash
  cd story-of-pets
  npm install  
   ```
3. Install backend dependencies:
```bash
  cd story-of-pet-backend
  npm install  
   ```
4. Set up Firebase and configure the authentication keys in your project:

- Create a Firebase project on Firebase Console.
- Add Firebase config details to both frontend and backend.

5. Run the application:
### Frontend
```bash
  npm start  
   ```
### Backend
```bash
  npm run dev  
   ```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_PORT`

`VITE_REST_API_URL`

Backend

`PORT`

## Features

- **User Authentication**: Google and Facebook authentication.
- **Add up to 5 pets**: Users can register their pets and track their activities.
- **Journal Entries**: Users can add journals on Tuesday and Friday and a comprehensive journal on the last Friday of the month.
- **Responsive Design**: The application is designed to work seamlessly across devices using Tailwind CSS.
- **Chat Assist**: A chat feature powered by OpenAI to assist users with any queries related to the app.
- **Hosted on AWS**: The app is deployed on AWS for cloud hosting.

## Deployment

[Story of Pets - Live App](https://www.storyofpet.com)