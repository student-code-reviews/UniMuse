"""Views for application."""

import os
import json
# import spotipy  # TODO: If enough time, try using Spotipy
import requests

from jinja2 import StrictUndefined
from flask import Flask, render_template, request, flash, redirect, session, jsonify

# Import modules
from models import db, User, Playlist, PlaylistSong, Song
import spotify

from pprint import pprint

app = Flask(__name__)

app.jinja_env.undefined = StrictUndefined


# =========================================================================== #
@app.route('/')
def index():
    """Homepage."""

    return render_template("/index.html")


@app.route('/sign-up-form')
def sign_up_form():
    """UniMuse sign-up page."""

    return render_template("/sign-up-form.html")


@app.route('/sign-up-verification', methods=["POST"])
def sign_up_success():
    """UniMuse sign-up verification."""

    username = request.form.get("um-new-username")
    password = request.form.get("um-new-password")

    # Query database for the username. Will return None if username doesn't exist
    user = db.session.query(User).filter(User.username==username).first()

    if user:
        flash("That username is already taken!")
        return redirect("/sign-up-form")
    else:
        new_user = User(username=username, password=password)
        
        db.session.add(new_user)
        db.session.commit()

        flash("Sign-up successful!")
        return redirect("/")


@app.route('/login-form')
def login_form():
    """UniMuse login page."""

    return render_template("/login-form.html")


@app.route('/login-verification', methods=["POST"])
def login():
    """UniMuse log-in verification."""

    username = request.form.get("um-username")
    password = request.form.get("um-password")

    # Query database for the username. Will return None if username doesn't exist
    user = db.session.query(User).filter(User.username==username).first()
    
    if user:
        if user.password == password:
            session['logged_user'] = username   # TODO: Need to check if a user is already logged in.

            flash("You've successfully logged in!")
            return redirect("/subscriptions-login")
        else:
            flash("The password is incorrect.")
            return redirect("/login-form")
    else:
        flash("That username doesn't exist!")
        return redirect("/login-form")


@app.route('/subscriptions-login')
def subscriptions_login():
    """Subscriptions login splash page."""

    spotify_auth_url = spotify.auth_page()

    return render_template("/subscriptions-login.html", 
                            spotify_auth_url=spotify_auth_url)


# =========================================================================== #
@app.route("/spotify-callback")
def spotify_callback():
    """Spotify user authentication callback."""

    response_data = spotify.get_access_tokens()

    if 'spotify_token' in session:
        flash("You're already logged into Spotify!")
    else:
        session['spotify_token'] = response_data["access_token"]
    
    return redirect("/subscriptions-login")


@app.route("/search-page", methods=["GET", "POST"])
def search_songs():
    """Search songs on app."""
    
    access_token = session['spotify_token']

    if request.method == "GET":
        return render_template("/search-page.html", access_token=access_token)

    elif request.method == "POST":
        query_input = request.form.get("user-song-query")
        query_input = query_input.replace(" ", "%20").lower()

        query = "q=" + query_input + "&type=track&limit=10"

        results = spotify.search(query, access_token).json()
        data = results["tracks"]["items"][0]["uri"]

        return render_template("/player.html", access_token=access_token,
                                               uri=data)


@app.route("/player")
def player():
    """Play songs on app."""
    
    access_token = session['spotify_token']

    return render_template("/player.html", access_token=access_token)