import os
import json
import spotipy

import requests
from jinja2 import StrictUndefined

from flask import Flask, render_template, request, flash, redirect
from flask_debugtoolbar import DebugToolbarExtension

from model import connect_to_db, db


app = Flask(__name__)
app.secret_key = "SECRETSAUCE"
app.jinja_env.undefined = StrictUndefined

spotify_client_secret = os.environ["SPOTIFY_CLIENT_SECRET"]
spotify_client_id = os.environ["SPOTIFY_CLIENT_ID"]
spotify_redirect_uri = os.environ["SPOTIFY_REDIRECT_URI"]


@app.route('/')
def index():
    """Homepage."""
    return "<html><body>Placeholder for the homepage.</body></html>"


if __name__ == "__main__":
    connect_to_db(app)

    app.debug = True
    app.jinja_env.auto_reload = app.debug
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

    DebugToolbarExtension(app)

    app.run(host="0.0.0.0")