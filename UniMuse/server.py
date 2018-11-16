"""Runs the application."""

from flask_debugtoolbar import DebugToolbarExtension

from views import app
from models import connect_to_db


if __name__ == "__main__":
    app.secret_key = "SECRETSAUCE"
    
    connect_to_db(app)

    app.debug = True
    app.jinja_env.auto_reload = app.debug
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

    DebugToolbarExtension(app)

    app.run(host="0.0.0.0")