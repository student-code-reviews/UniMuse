"""Models and database functions for UniMuse."""

from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class User(db.Model):
    """UniMuse user information."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)


class Playlist(db.Model):
    """Playlist information created by user."""

    __tablename__ = "playlists"

    playlist_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    playlist_name = db.Column(db.String(60), nullable=False)

    user = db.relationship("User", backref=db.backref("playlists",
                                                      order_by=user_id))


class Song(db.Model):
    """Song information from API queries."""

    __tablename__ = "songs"

    song_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    service_id = db.Column(db.String(300), nullable=False)
    song_name = db.Column(db.String(100), nullable=False)
    song_img = db.Column(db.String(300), nullable=True)
    service = db.Column(db.String(50), nullable=False)


class PlaylistSong(db.Model):
    """Songs contained in user playlists."""

    __tablename__ = "playlist_songs"

    playlist_song_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.playlist_id'))
    song_id = db.Column(db.Integer, db.ForeignKey('songs.song_id'))

    playlist = db.relationship("Playlist", backref=db.backref("playlist_songs",
                                                              order_by=playlist_id))

    song = db.relationship("Song", backref=db.backref("playlist_songs",
                                                      order_by=song_id))


def connect_to_db(app):
    """Connect UniMuse database to Flask app."""

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///unimuse'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)

if __name__ == '__main__':
    from server import app
    
    connect_to_db(app)
    db.create_all()
    print('Connected to database.')