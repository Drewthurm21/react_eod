from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Comment(db.Model):
    __tablename__='comments'

    id=db.Column(db.Integer, primary_key=True)
    user_name=db.Column(db.String(20), nullable=False)
    body = db.Column(db.Text(), nullable=False )

    def to_dict(self):
        return {
            'id': self.id,
            'user_name': self.user_name,
            'body': self.body
        }