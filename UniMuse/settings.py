import os

##### Redirect URI #####
CLIENT_SIDE_URL = "http://localhost"
PORT = 5000


##### Spotify Client Info. and URLs #####
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_REDIRECT_URI = f"{CLIENT_SIDE_URL}:{PORT}/spotify-callback"


##### YouTube Client Info. and URLs #####
YT_CLIENT_SECRET = os.getenv("YOUTUBE_CLIENT_SECRET")
YT_CLIENT_ID = os.getenv("YOUTUBE_CLIENT_ID")


##### MixCloud Client Info. and URLs #####
MIXCLOUD_CLIENT_SECRET = os.getenv("MIXCLOUD_CLIENT_SECRET")
MIXCLOUD_CLIENT_ID = os.getenv("MIXCLOUD_CLIENT_ID")
