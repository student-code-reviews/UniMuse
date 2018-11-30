"""YouTube-related functions for requests and tokens."""

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from oauth2client.tools import argparser

from settings import YOUTUBE_API_KEY


# YouTube info. needed
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"


def search_data_map(response):
    search_data = {
        'songTitle': response['snippet']['title'],
        'albumImgURLsm': response['snippet']['thumbnails']['default']['url'],
        'songURI': response['id']['videoId']
    }

    return search_data


def search(query_str, max_results=10,order="relevance", token=None):
    """YouTube search request and response."""

    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=YOUTUBE_API_KEY)

    response = youtube.search().list(
        q=query_str,
        type="video",
        pageToken=token,
        order = order,
        part="id,snippet",
        maxResults=max_results).execute()

    response_lst = [result for result in response["items"] if result["id"]["kind"] == "youtube#video"]
    
    search_list_data = list(map(search_data_map, response_lst))

    return search_list_data