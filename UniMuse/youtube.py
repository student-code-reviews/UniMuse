"""YouTube-related functions for requests and tokens."""

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from oauth2client.tools import argparser

from settings import YOUTUBE_API_KEY


# YouTube info. needed
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"


def search(q, max_results=10,order="relevance", token=None):
    """YouTube search request and response."""

    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=YOUTUBE_API_KEY)

    search_response = youtube.search().list(
        q=q,
        type="video",
        pageToken=token,
        order = order,
        part="id,snippet",
        maxResults=max_results).execute()

    search_response_dict = {}
    search_result_no = 0
    for search_result in search_response.get("items", []):
        if search_result["id"]["kind"] == "youtube#video":
            
            videoTitle = search_result['snippet']['title']
            videoImg = search_result['snippet']['thumbnails']['default']['url']
            videoId = search_result['id']['videoId']

            search_response_dict[search_result_no] = {'videoTitle': videoTitle,
                                                      'videoImg': videoImg,
                                                      'videoId': videoId}

            search_result_no += 1

    return search_response_dict