# Quiz Application with C# .NET API and React frontend.  

A project where I learnt to create a API using C# .NET, connected to a database which I then used to make fetch calls to from the frontend using the API. The player can play the quiz, with data being pulled from the database. The admin can add questions to the categories, saving them in the database for the player to answer.  

* React Hooks API was used to create the UI.  
* Material-UI was used to style the UI.  
* Used context hook to create a custom hook for state management.  
* Axios was used to make the API calls.   
* The API was build using C# .NET Core Web API.
* Created the database tables programmatically, creating model classes and annotating each field with the correct SQL tags.  
* Create API routes for each diferent data the user might need with GET requests for retrieving, used PUT for editing fields and POST for saving a new record.  

## Requirements  
- Microsoft SQL Server Management Studio 19 for database  
- Microsoft Visual Studio for API  
- Code Editor for React (I used Visual Studio Code) 
- Compatible browser like Chrome, Firefox and Opera etc.   

## Setup  
Before running the application, connect the database to the API.  
- Create the database in SSMS 19. 
- In the appsettings.json file change the DefaultConnection to your server name and database name.  
- When trying to run the application the first time, it may not work, in that case, remove all migration using Remove-Migration, untill there is none. Then run the command Add-Migration, if no errors, run Update-Database. (Should create the table.)  
- To add the default data for the admin, uncomment the code in the Program.cs file, and then run the application.  
- To some data to the database to test the API endpoints, use the sql file called QueryInsertingQuestions.sql, change the database to your db name.  

## How it works and looks:


## How to run it?
1. Clone the project or download the all the folders.  
2. Ensure everything in setup is completed.  
3. Open the Quiz-UI in your prefered code editor.  
5. **Delete** the file *package-lock.json* and *node_modules* folder if there.  
6. Type and enter **npm install**. This should download all the dependencies.  
7. Open the QuizAPI in Microsoft Visual Studio.  
8. Run the API, should launch the API in Swagger Docs, which you can use to test the endpoints.  
9. Check the address of the Swagger doc and ensure that in the Quiz-UI in the api folder the BASE_URL is matching.  
10. Run the code using the following command:  
    - For React: **npm start** - This should open automatically in your default browswer at http://localhost:3000/  




