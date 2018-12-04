"""Mixcloud-related functions for requests and tokens."""

import requests
import urllib


MIXCLOUD_SEARCH_URL = "https://api.mixcloud.com/search"


def search_data_map(response):
    """Mapping function to extract relevant information from API response data.
    
    Args:
        response (dict) - A single dictionary from the API response data.
    
    Returns a dictionary of relevant information from API response.
    """

    search_data = {
        'songTitle': response['name'],
        'albumImgURLsm': response['pictures']['thumbnail'],
        'songURI': response['key']
    }

    return search_data


def search(query):
    """Mixcloud search request and response.
    
    Args:
        query (string) - User inputted query.
    
    Returns a dictionary containing dictionaries with track information 
    from API response.
    """

    if " " in query:
        query_str = "+".join(query.split(" "))
    else:
        query_str = query

    query_param = {
        "q": query_str,
        "type": "cloudcast",
        "limit": "10",
        "offset": "10"
    }

    url_args = "&".join(["{}={}".format(key,urllib.parse.quote(val.encode('utf-8'))) for key,val in query_param.items()])
    query_url = f"{MIXCLOUD_SEARCH_URL}/?{url_args}"

    response = requests.get(query_url).json()
    response_lst = response['data']

    search_list_data = list(map(search_data_map, response_lst))

    return search_list_data