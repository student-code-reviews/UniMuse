"""Views for UniMuse."""

import os
import json
import requests

from jinja2 import StrictUndefined
from flask import Flask, render_template, request, flash, redirect, session, jsonify

from models import db, User, Playlist, PlaylistSong, Song
import spotify
import youtube
import mixcloud

app = Flask(__name__)

app.jinja_env.undefined = StrictUndefined


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

    username = request.form.get("new-username")
    password = request.form.get("new-password")

    user = db.session.query(User).filter(User.username==username).first()

    if user:
        flash("That username is already taken!")
        return redirect("/sign-up-form")
    else:
        new_user = User(username=username, password=password)
        
        db.session.add(new_user)
        db.session.commit()

        user_id = new_user.user_id
        session['logged_user'] = { 'user_id': user_id,
                                    'username': username}

        flash("Sign-up successful!")
        return redirect("/services-login")


@app.route('/login-form')
def login_form():
    """UniMuse login page."""

    return render_template("/login-form.html")


@app.route('/login-verification', methods=["POST"])
def login():
    """UniMuse log-in verification."""

    username = request.form.get("username")
    password = request.form.get("password")

    user = db.session.query(User).filter(User.username==username).first()
    
    if user:
        if user.password == password:
            user_id = user.user_id
            session['logged_user'] = { 'user_id': user_id,
                                       'username': username}

            flash("You've successfully logged in!")
            return redirect("/services-login")
        else:
            flash("The password is incorrect.")
            return redirect("/login-form")
    else:
        flash("That username doesn't exist!")
        return redirect("/login-form")


@app.route('/services-login')
def services_login():
    """Music services login splash page."""

    spotify_auth_url = spotify.auth_page()

    return render_template("/services-login.html", 
                            spotify_auth_url=spotify_auth_url)


@app.route("/spotify-callback")
def spotify_callback():
    """Spotify user authentication callback."""

    response_data = spotify.get_access_tokens()

    if 'spotify_token' in session:
        flash("You're already logged into Spotify!")
    else:
        session['spotify_token'] = response_data["access_token"]
    
    return redirect("/services-login")


@app.route("/searchlist-playlist")
def search_songs():
    """Search songs on app."""

    return render_template("/searchlist-playlist.html")


@app.route('/search-api-request.json')
def spotify_search_api_request():
    """Return API responses for search query."""

    access_token = session['spotify_token']

    query = request.args.get("userquery")

    spotify_data = spotify.search(query, access_token)
    youtube_data = youtube.search(query)
    mixcloud_data = mixcloud.search(query)

    return jsonify({'spotify': spotify_data,
                    'youtube': youtube_data,
                    'mixcloud': mixcloud_data})


@app.route("/user-playlists.json")
def get_user_playlists():
    """Retrieve user's previously-created playlists."""

    user_id = session['logged_user']['user_id']
    playlist_check = db.session.query(Playlist).filter(User.user_id==user_id).first()

    if playlist_check:
        playlists = db.session.query(Playlist).filter(User.user_id==user_id).all()
        
        user_playlists = list(map(lambda x: {'playlist_no': x.playlist_id, 'playlist_name': x.playlist_name}, playlists))

        return jsonify({'playlists': user_playlists})

    else:
        return jsonify("User does not have any playlists.")


@app.route("/save-new-playlist")
def save_new_playlist():
    """Save new playlist created by user into database."""

    new_playlist = request.args.get("newPlaylistName")
    user_id = session['logged_user']['user_id']

    playlist = db.session.query(Playlist).filter(User.user_id==user_id,
                                                 Playlist.playlist_name==new_playlist).first()

    if playlist:
        return jsonify("User already has a playlist with that name.")
        
    else:
        playlist = Playlist(user_id=user_id, playlist_name=new_playlist)
        
        db.session.add(playlist)
        db.session.commit()

        playlistData = {
            'playlist_no': playlist.playlist_id,
            'playlist_name': playlist.playlist_name
        }
        
        return jsonify(playlistData)


@app.route("/save-song")
def save_song():
    """Save song to database."""

    song_uri = request.args.get("songData")
    song_name = request.args.get("songTitle")
    song_img = request.args.get("songImg")
    playlist_no = int(request.args.get("playlist"))

    service = ''
    if 'spotify' in song_uri:
        service = 'spotify'
    elif '/' in song_uri:
        service = 'mixcloud'
    else:
        service = 'youtube'
    
    song = Song(service_id=song_uri, song_name=song_name, song_img=song_img, service=service)

    db.session.add(song)
    db.session.commit()
    
    playlist_song = PlaylistSong(playlist_id=playlist_no,
                                 song_id=song.song_id)

    db.session.add(playlist_song)
    db.session.commit()

    return jsonify('Success.')


@app.route('/delete-playlist')
def delete_playlist():
    """Delete playlist from the database."""

    playlist_id = int(request.args.get('playlist'))

    songs = db.session.query(PlaylistSong.song_id).filter(PlaylistSong.playlist_id == playlist_id).all()

    db.session.query(PlaylistSong).filter(PlaylistSong.playlist_id == playlist_id).delete()
    db.session.query(Playlist).filter(Playlist.playlist_id == playlist_id).delete()
    
    for song in songs:
        db.session.query(Song).filter(Song.song_id == song[0]).delete()

    db.session.commit()

    return jsonify('Successfully deleted playlist.')


@app.route("/playlist-player")
def player():
    """Player to play songs from playlist."""

    return render_template("/playlist-player.html")


@app.route("/playlist-songs.json")
def playlist_songs():
    """Retrieve saved songs from user's playlist."""
    
    selected_playlist = int(request.args.get('playlist'))
    
    song_ids = db.session.query(PlaylistSong.song_id).filter(PlaylistSong.playlist_id==selected_playlist).all()
    song_uris = []
    for song_id in song_ids:
        service_id = db.session.query(Song.service_id).filter(Song.song_id==song_id[0]).one()[0]
        service_id = service_id.split(":")[-1]
        
        service = db.session.query(Song.service).filter(Song.song_id==song_id[0]).one()[0]
        song_name = db.session.query(Song.song_name).filter(Song.song_id==song_id[0]).one()[0]
        song_img = db.session.query(Song.song_img).filter(Song.song_id==song_id[0]).one()[0]

        song_data = {'service_id': service_id,
                     'song_name': song_name,
                     'song_img': song_img,
                     'service': service}

        song_uris.append(song_data)

    return jsonify({'songs': song_uris})