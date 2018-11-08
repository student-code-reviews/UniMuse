"""Views for application."""

import os
import json
# import spotipy
import requests

from jinja2 import StrictUndefined
from flask import Flask, render_template, request, flash, redirect, session

# Import modules
from models import db, User, Playlist, PlaylistSong, Song
import spotify


app = Flask(__name__)

app.jinja_env.undefined = StrictUndefined


@app.route('/')
def index():
    """Homepage."""

    # OLD VERSION
    # option = request.args.get("um-signup-login")

    # if option == "um-sign-up":
    #     return render_template("/sign-up-form.html")
    # elif option == "um-login":
    #     return render_template("/login-form.html")

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


# TODO: Route for list of subscription available to log into
@app.route('/subscriptions-login')
def subscriptions_login():
    """Subscriptions login splash page."""

    return render_template("/subscriptions-login.html")


@app.route('/spotify-auth')
def spotify_auth():
    """Spotify user authentication page."""

    auth_url = spotify.spotify_auth_page()
    return redirect(auth_url)


@app.route("/spotify-callback")
def spotify_callback():
    """Spotify user authentication callback."""

    response_data = spotify.spotify_get_access_tokens()

    access_token = response_data["access_token"]
    # refresh_token = response_data["refresh_token"]  # TODO: Need later for refreshing access tokens
    # token_type = response_data["token_type"]
    # expires_in = response_data["expires_in"]

    authorization_header = spotify.spotify_auth_header(access_token)

    # Get profile data
    profile_data = spotify.spotify_user_profile(authorization_header)

    # Get user playlist data
    playlist_data = spotify.spotify_user_playlist(profile_data, authorization_header)
    
    # Combine profile and playlist data to display
    display_arr = [profile_data] + playlist_data["items"]

    return render_template("index.html",sorted_array=display_arr)