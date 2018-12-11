"""Models and database functions for UniMuse."""

from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class User(db.Model):
    """UniMuse user information."""
    # Add security with this neat tool:
    # https://github.com/code-workshops/blogwise/blob/sprint3/models.py#L5

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)


class Playlist(db.Model):
    """Playlist information created by user."""

    __tablename__ = "playlists"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    name = db.Column(db.String(60), nullable=False)

    user = db.relationship("User", backref=db.backref("playlists",
                                                      order_by=user_id))

    # >>> playlist.songs.append(song)
    songs = db.relationship('Song', secondary='playlist_songs', lazy=True)


class Song(db.Model):
    """Song information from API queries."""

    __tablename__ = "songs"

    id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.String(300), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(300), nullable=True)
    service = db.Column(db.String(50), nullable=False)


playlist_songs = db.Table('playlist_songs',
                          db.Column('playlist_id', db.Integer, db.ForeignKey('playlists.id')),
                          db.Column('song_id', db.Integer, db.ForeignKey('users.id'))
                          )

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