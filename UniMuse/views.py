import os
import json
import spotipy

import requests
from jinja2 import StrictUndefined

from flask import Flask, render_template, request, flash, redirect

from model import connect_to_db, db


app = Flask(__name__)

app.jinja_env.undefined = StrictUndefined

# Client IDs for services
spotify_client_secret = os.environ["SPOTIFY_CLIENT_SECRET"]
spotify_client_id = os.environ["SPOTIFY_CLIENT_ID"]

youtube_client_secret = os.environ["YOUTUBE_CLIENT_SECRET"]
youtube_client_id = os.environ["YOUTUBE_CLIENT_ID"]

mixcloud_client_secret = os.environ["MIXCLOUD_CLIENT_SECRET"]
mixcloud_client_id = os.environ["MIXCLOUD_CLIENT_ID"]

redirect_uri = os.environ["REDIRECT_URI"]


@app.route('/')
def index():
    """Homepage."""
    return "<html><body>Placeholder for the homepage.</body></html>"

