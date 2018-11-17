"""Views for application."""

import os
import json
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

    user = db.session.query(User).filter(User.username==username).first()
    
    if user:
        if user.password == password:
            user_id = user.user_id
            session['logged_user'] = { 'user_id': user_id,
                                       'username': username}

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


# =========================================================================== #


@app.route("/searchlist-playlist")
def search_songs():
    """Search songs on app."""

    return render_template("/searchlist-playlist.html")


@app.route('/search-api-request.json')
def search_api_request():
    """Return result dictionary for search query."""

    access_token = session['spotify_token']

    query_input = request.args.get("userquery")
    query_input = query_input.replace(" ", "%20").lower()
    query = "q=" + query_input + "&type=track&limit=10"

    results = spotify.search(query, access_token).json()
    data_lst = results['tracks']['items']

    # Create result "keys" used in React
    data_dict = {}
    search_result_no = 0
    while search_result_no < len(data_lst):
        data_dict[search_result_no] = data_lst[search_result_no]
        search_result_no += 1

    print(data_dict.keys())
    print(data_dict[0])
    print(data_dict[1]['name'])

    return jsonify(data_dict)


@app.route("/user-playlists.json")
def get_user_playlists():

    user_id = session['logged_user']['user_id']
    playlist_check = db.session.query(Playlist).filter(User.user_id==user_id).first()

    user_playlists = {}

    if playlist_check:
        playlists = db.session.query(Playlist).filter(User.user_id==user_id).all()
        
        for playlist in playlists:
            user_playlists[playlist.playlist_id] = playlist.playlist_name
        
        return jsonify(user_playlists)
    else:
        return jsonify("User does not have any playlists.")


@app.route("/save-new-playlist")
def save_new_playlist():
    """Save new playlist created by user into database."""

    new_playlist = request.args.get("newPlaylistName")
    print(new_playlist)
    user_id = session['logged_user']['user_id']

    playlist = db.session.query(Playlist).filter(User.user_id==user_id,
                                                 Playlist.playlist_name==new_playlist
                                                ).first()

    if playlist:
        return jsonify("User already has a playlist with that name.")
    else:
        playlist = Playlist(user_id=user_id, playlist_name=new_playlist)
        
        db.session.add(playlist)
        db.session.commit()

        return jsonify("Sucessfully added the playlist.")


@app.route("/player")
def player():
    """Play songs on app."""
    
    access_token = session['spotify_token']
    return render_template("/player.html", access_token=access_token)