import os

##### Redirect URI #####
CLIENT_SIDE_URL = "http://localhost"
PORT = 5000


##### Spotify Client Info. and URLs #####
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_REDIRECT_URI = f"{CLIENT_SIDE_URL}:{PORT}/spotify-callback"


##### YouTube Client Info. and URLs #####
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

##### Webdriver for testing #####
WEBDRIVER_PATH = os.getenv("TEST_WEBDRIVER_PATH")