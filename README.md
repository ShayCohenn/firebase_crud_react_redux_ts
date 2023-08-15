# CRUD example using firebase's database "Firestrorm" using React, Redux and Typescript


## Installation
```
git clone https://github.com/ShayCohenn/firebase_crud_react_redux_ts.git
```
```
cd firebase_crud_react_redux_ts
```
```
npm i firebase
```
### Create a .env file with all the database info
```
REACT_APP_API_KEY= ""
REACT_APP_AUTH_DOMAIN= ""
REACT_APP_PROJECT_ID= ""
REACT_APP_STORAGE_BUCKET= ""
REACT_APP_MESSAGING_SENDER_ID= ""
REACT_APP_APP_ID= ""
REACT_APP_MEASUREMENT_ID= ""
```
```
npm start
```

### To deploy:
```
npm run build
```
```
firebase login
```
```
firebase init
```
firebase init settings:
```
(*) Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
 ? What do you want to use as your public directory? build
? Configure as a single-page app (rewrite all urls to /index.html)? No
? Set up automatic builds and deploys with GitHub? No
? File build/404.html already exists. Overwrite? No
i  Skipping write of build/404.html
? File build/index.html already exists. Overwrite? No
i  Skipping write of build/index.html
```
```
firebase deploy
```
