"""Models and database functions for UniMuse."""

from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class User(db.Model):
    """User of UniMuse."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)


class Playlist(db.Model):
    """Playlist by User."""

    __tablename__ = "playlists"

    playlist_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    playlist_name = db.Column(db.String(60), nullable=False)

    user = db.relationship("User", backref=db.backref("users",
                                                      order_by=user_id))


class PlaylistSong(db.Model):
    """Playlist song."""

    __tablename__ = "playlist_songs"

    playlist_song_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.playlist_id'))
    song_id = db.Column(db.Integer, db.ForeignKey('songs.song_id'))
    order_id = db.Column(db.Integer, nullable=False)

    playlist = db.relationship("Playlist", backref=db.backref("playlists",
                                                              order_by=playlist_id))

    song = db.relationship("Song", backref=db.backref("songs",
                                                      order_by=song_id))


class Song(db.Model):
    """Song."""

    __tablename__ = "songs"

    song_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    title = db.Column(db.String(60), nullable=False)


def connect_to_db(app):
    """Connect the database to Flask app."""

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///unimuse'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)