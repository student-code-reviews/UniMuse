"""Views for application."""

import os
import json
import spotipy

import requests
from jinja2 import StrictUndefined

from flask import Flask, render_template, request, flash, redirect

from model import db, User, Playlist, PlaylistSong, Song


app = Flask(__name__)

app.jinja_env.undefined = StrictUndefined


@app.route('/')
def index():
    """Homepage."""

    option = request.args.get("um-signup-login")

    if option == "um-sign-up":
        return render_template("/sign-up-form.html")
    elif option == "um-login":
        return render_template("/login-form.html")

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
    
    #TODO: Need to add session to save current logged-in user
    
    if user:
        if user.password == password:
            flash("You've successfully logged in!")
            return redirect("/")
        else:
            flash("The password is incorrect.")
            return redirect("/login-form")
    else:
        flash("That username doesn't exist!")
        return redirect("/login-form")
