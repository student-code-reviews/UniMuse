"""YouTube-related functions for requests and tokens."""

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from oauth2client.tools import argparser

from settings import YOUTUBE_API_KEY


YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"


def search_data_map(response):
    """Mapping function to extract relevant information from API response data.
    
    Args:
        response (dict) - A single dictionary from the API response data.
    
    Returns a dictionary of relevant information from API response.
    """

    search_data = {
        'songTitle': response['snippet']['title'],
        'albumImgURLsm': response['snippet']['thumbnails']['default']['url'],
        'songURI': response['id']['videoId']
    }

    return search_data


def search(query):
    """YouTube search request and response.
    
    Args:
        query (string) - User inputted query.
    
    Returns a dictionary containing dictionaries with track information 
    from API response.
    """

    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=YOUTUBE_API_KEY)

    response = youtube.search().list(
        q=query,
        type="video",
        pageToken=None,
        order = "relevance",
        part="id,snippet",
        maxResults=10).execute()

    response_lst = [result for result in response["items"] if result["id"]["kind"] == "youtube#video"]
    search_list_data = list(map(search_data_map, response_lst))

    return search_list_data