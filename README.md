# PlaySync

A Web Application that allow users to sync their YouTube video playback using websocket. The users can join an already existing channel with the other users or create a new channel and add the video they wish to watch.

# Instructions

## Running Locally
- Install Node.js
- Create an account in Heroku and make sure that Heroku CLI is installed
- Clone the repository and browse into it using PowerShell(for windows) or Terminal(for Mac or Linux)
- Then,
```
npm install
npm start
```

The App should live on localhost:5000/

## Usage 

Head over to [Heroku](http://youtube-play-sync.herokuapp.com) where I have deployed this application

## Usage 

Create a channel with the YouTube video URL and ask a friend to join the same channel with the channel name.

Whenever changes in the playback is detected, the playback time is sent over to the server through a websocket connection and the server broadcasts the time to all other users in the same channel.

You can take a look at the websocket data by using the Chrome DevTools

# License

    Copyright 2018 DIVAKAR RAJESH S

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
