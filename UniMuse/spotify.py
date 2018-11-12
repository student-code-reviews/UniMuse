"""Spotify-related functions for requests and tokens."""

import json
import requests
import base64
import urllib

from flask import request
# from views import app  # TODO: DEBUG THIS

from settings import SPOTIFY_REDIRECT_URI, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET


# Spotify info. needed for authorization
SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_BASE_URL = "https://api.spotify.com"
SPOTIFY_API_VERSION = "v1"
SPOTIFY_API_URL = f"{SPOTIFY_API_BASE_URL}/{SPOTIFY_API_VERSION}"
# SPOTIFY_SCOPE = "playlist-modify-public playlist-modify-private" # TODO: Scope subject to change when working on actual player
SPOTIFY_SCOPE = "streaming user-read-birthdate user-read-email user-read-private user-modify-playback-state"  # NOTE: Scopes required for player

auth_query_param = {
    "response_type": "code",
    "redirect_uri": SPOTIFY_REDIRECT_URI,
    "scope": SPOTIFY_SCOPE,
    # "state": STATE,
    # "show_dialog": SHOW_DIALOG_str,
    "client_id": SPOTIFY_CLIENT_ID
}


# Step 1: Spotify functions to get authorization tokens
def auth_page():
    """Return Spotify's user authentication page."""

    url_args = "&".join(["{}={}".format(key,urllib.parse.quote(val)) for key,val in auth_query_param.items()])
    auth_url = f"{SPOTIFY_AUTH_URL}/?{url_args}"
    return auth_url


def get_access_tokens():
    """Return authorization tokens from Spotify."""

    auth_token = request.args['code']  # NOTE: Value of the token. This is a get request from the callback URL after user authorizes.
    code_payload = {
        "grant_type": "authorization_code",
        "code": str(auth_token),
        "redirect_uri": SPOTIFY_REDIRECT_URI   # NOTE: The URI that the user is redirected to after the authorization from Spotify.
                                       # TODO: Need to update URI.
    }
    client_str = base64.b64encode(f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}".encode('ascii'))
    headers = {"Authorization": f"Basic {client_str.decode('ascii')}"}
    
    # TODO: Debug app.logger.error! The import isn't working.
    try:
        response = requests.post(SPOTIFY_TOKEN_URL, data=code_payload, headers=headers)
    except ConnectionError:
        current_app.logger.error("Spotify client connection failed.")
        raise
    except TimeoutError:
        current_app.logger.error("Spotify client timed out.")
        raise
    else:
        return response.json()


def auth_header(access_token):
    """Return Spotify's authorization header.
    
    Args:
        access_token (str): Access token returned from spotify_access_tokens().
    """

    return {"Authorization" : f"Bearer {access_token}"}


# Temp queries
def search(query, access_token):  # TODO: For now to test player API. Need to adjust later. 
    """TESTING SEARCH"""

    # results = spotify_get_access_tokens()
    headers = auth_header(access_token)

    url = f"{SPOTIFY_API_URL}/search?{query}"

    response = requests.get(url, headers=headers)
    #current_app.logger.info(response)

    return response


def user_profile(headers):
    user_profile_api_endpoint = f"{SPOTIFY_API_URL}/me"
    profile_response = requests.get(user_profile_api_endpoint, headers=headers)
    profile_data = json.loads(profile_response.text)

    return profile_data


def user_playlist(profile_data, headers):
    playlist_api_endpoint = f'{profile_data["href"]}/playlists'
    playlists_response = requests.get(playlist_api_endpoint, headers=headers)
    playlist_data = json.loads(playlists_response.text)

    return playlist_data
