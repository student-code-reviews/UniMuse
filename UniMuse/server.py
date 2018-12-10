"""Runs the application."""

from views import app
from models import connect_to_db


if __name__ == "__main__":
    app.secret_key = "SECRETSAUCE"
    
    connect_to_db(app)
    app.run(host="0.0.0.0")