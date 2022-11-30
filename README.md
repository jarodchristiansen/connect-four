# Connect Four React-JS

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### Using the application
Once it is running locally via the method listed above, you should be presented with the following screen (If running for the first time):

![sign-up](https://user-images.githubusercontent.com/50091942/204851714-74e94635-563e-4b3c-b345-2c76f77310d1.PNG)

This should allow the first user to select their nickname and age, as well as the color of the pieces they will use. After completing this for the first user,  a similar screen will be presented for the second user. Once the second user has submit their details, the first game should be started. (Note: if this is not the first time running the game, your users should be saved locally, so once running the game should start automatically).

You should now be presented with the game screen, that looks as follows (after clicking columns to add a few pieces):

![board](https://user-images.githubusercontent.com/50091942/204852257-4954740c-a461-4e0b-afc4-9b712d6a04f2.png)

This screen shows which users are currently playing, the game duration, score and current user's turn. By clicking on a column, you can add a color piece corresponding to your selection from before. 

Once a user has been able to connect 4 of their same colored pieces together, you should be presented with the winner screen. 

![winner](https://user-images.githubusercontent.com/50091942/204852620-77ce45f9-67d7-42d6-b78b-54386a894aed.png)

This should indicate which user has won the game (Or a stalemate if applicable) and allow you to start a new game, or check the scoreboard to visit the previous games you have played. 

If you choose to view the scoreboard you should be presented with the following:
![scoreboard](https://user-images.githubusercontent.com/50091942/204853055-fb1542cf-6ed4-4c8d-994e-e65a650098f7.png)
