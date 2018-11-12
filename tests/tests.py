from unittest import TestCase
from UniMuse.models import Users, Playlists, Songs, PlaylistSong, connect_to_db, db, test_data
from UniMuse.server import app
import UniMuse.server

class TestUniMuseForms(TestCase):
    """Test contents of UniMuse pages (non-functionality)."""

    def setUp(self):
        """Set up for tests."""

        self.client = app.test_client()
        app.config['TESTING'] = True
        connect_to_db(app, "postgresql:///testdb")

        db.create_all()
        test_data()

    def tearDown(self):
        """Clean-up after tests."""

        db.session.close()
        db.drop_all()

    def test_index(self):
        """Test homepage."""

        result = self.client.get("/")

        self.assertEqual(result.status_code, 200)
        self.assertIn(b"Welcome", result.data)
        self.assertIn(b"New User </button>", result.data)
    
    # def test_sign_up(self):
    #     """Test UniMuse sign-up page."""


    
    # def test_user_main_signup():

    # def test_user_main_login():

