"""Spotify-related functions for requests and tokens."""

import json
import requests
import base64
import urllib

from flask import request

from settings import SPOTIFY_REDIRECT_URI, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET


SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_BASE_URL = "https://api.spotify.com"
SPOTIFY_API_VERSION = "v1"
SPOTIFY_API_URL = f"{SPOTIFY_API_BASE_URL}/{SPOTIFY_API_VERSION}"
SPOTIFY_SCOPE = "streaming user-read-birthdate user-read-email user-read-private user-modify-playback-state"

auth_query_param = {
    "response_type": "code",
    "redirect_uri": SPOTIFY_REDIRECT_URI,
    "scope": SPOTIFY_SCOPE,
    "client_id": SPOTIFY_CLIENT_ID
}


def auth_page():
    """Return Spotify's user authentication page."""

    url_args = "&".join(["{}={}".format(key,urllib.parse.quote(val)) for key,val in auth_query_param.items()])
    auth_url = f"{SPOTIFY_AUTH_URL}/?{url_args}"
    return auth_url


def get_access_tokens():
    """Return authorization tokens from Spotify."""

    auth_token = request.args['code']
    code_payload = {
        "grant_type": "authorization_code",
        "code": str(auth_token),
        "redirect_uri": SPOTIFY_REDIRECT_URI
    }
    client_str = base64.b64encode(f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}".encode('ascii'))
    headers = {"Authorization": f"Basic {client_str.decode('ascii')}"}
    
    response = requests.post(SPOTIFY_TOKEN_URL, data=code_payload, headers=headers)

    return response.json()


def auth_header(access_token):
    """Return Spotify's authorization header.
    
    Args:
        access_token (str): Access token returned from spotify_access_tokens().
    """

    return {"Authorization" : f"Bearer {access_token}"}


def search_data_map(response):
    """Mapping function to extract relevant information from API response data.
    
    Args:
        response (dict) - A single dictionary from the API response data.
    
    Returns a dictionary of relevant information from API response.
    """

    title = response['name']
    artist = response['album']['artists'][0]['name']
    search_data = {
        'songTitle': title + ' - ' + artist,
        'albumImgURLsm': response['album']['images'][2]['url'],
        'songURI': response['uri']
    }

    return search_data


def search(query, access_token):
    """Spotify search request and response.
    
    Args:
        query (string) - User inputted query.
    
    Returns a dictionary containing dictionaries with track information 
    from API response.
    """

    query_str = query.replace(" ", "%20").lower()
    query_str = "q=" + query_str + "&type=track&limit=10"

    headers = auth_header(access_token)
    url = f"{SPOTIFY_API_URL}/search?{query_str}"
    response = requests.get(url, headers=headers).json()
    response_lst = response['tracks']['items']

    search_list_data = list(map(search_data_map, response_lst))

    return search_list_data
