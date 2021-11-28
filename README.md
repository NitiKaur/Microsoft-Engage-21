# Microsoft Engage 2021

## Classroom

The aim of this project is to provide students and teachers with a platform that gives them an array of digital academic and social tools to stay engaged with their studies, peers and broader university community during pandemic.

### Features

* #### Register and Login Authentication

* #### Creating a Classroom

Upon logging in, the user has a choice of creating a classroom using the token 
provided to the user 

* #### Joining a Classroom

The user can join a particular class once the teacher sends him class invite

* #### Upoading files

The user(Teacher/person who creates)the class has the option of uploading file in the form of images/documents/videos to the classroom stream abd update the members of the day-to-day events.

* #### Uploading rights

Only the person who has created a particular classroom can update the stream by uploading all the necessary files and no othe person

### Technology Stack

* Frontend
	
	1. ReachJS

	2. Bootstrap
	
	3. HTML
	
	4. CSS

* Backend
 
 	1. NodeJS

 	2. MongoDB

 	3. Express

### Instructions to Install and Setup

1. Download the repository or clone the repository on your terminal.

2. Open Terminal and enter the following commands

	1. cd server

	2. npm install
	
	3. create a .env file with the help of the following command
	
		nano .env
	
	Now, add the following in your file
	
		mongoURI=mongodb+srv://NitiKaur:Harmeet1niti@cluster0.j117.mongodb.net/testdb
	
		secretOrKey=secret

	4. Open the encoding.js file as node_modules->whatwg-url->lib->encoding.js. Add the              follwing on top-
        
	        "use strict";
                const {TextDecoder, TextEncoder} = require("util");
                
	5. npm start

3. Open second terminal	and enter the following commands

	cd client

	npm install

	npm start
	
	
### Sample user credentials-

#### Login

	Username : test@test.com
	Password : test@test.com
	
#### Register
 
       Name : Your Name
       email : Your email-id
       password : Your password

### Features 

![Screenshot from 2021-11-28 20-21-19](https://user-images.githubusercontent.com/46062965/143779868-3b60992a-5cc5-40d2-a3f4-079bd133e54b.png)

### Flow

![Screenshot from 2021-11-28 20-07-51](https://user-images.githubusercontent.com/46062965/143779863-fe8038ab-b680-4cf7-9c29-6ab201e2ce4e.png)
!
       


### Future Releases

1. Integrated chat facility and discussion forum

2. Scheduler to remind students of the deadlines or any upcoming events.

3. General News feed where college administration can post about any notice.


 	



