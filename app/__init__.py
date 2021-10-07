import os
import requests
from flask import Flask, request
from flask_migrate import Migrate
from .config import Configuration
from app.models import db, Comment
from flask_wtf.csrf import generate_csrf
from app.forms.new_comment_form import NewCommentForm

app = Flask(__name__)
app.config.from_object(Configuration)
db.init_app(app)
migrate = Migrate(app, db)

@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token', 
                        generate_csrf(),
                        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get('FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/seed')
def seed_route():
    text = requests.get("https://baconipsum.com/api/?type=meat-and-filler")
    text = text.json()[0]
    for i in range(10):
        new_comment = Comment(user_name='Baylend123', body=text)
        db.session.add(new_comment)
        db.session.commit()
    return {'':''}
    
@app.route('/comments')
def commants_route():
    comments = Comment.query.all()
    return{
        'comments': {comment.id:comment.to_dict() for comment in comments}
    }

@app.route('/delete/<int:id>')
def delete(id):
    deleted_comment = Comment.query.filter(Comment.id == id).first()
    Comment.query.filter(Comment.id == id).delete()
    db.session.commit()
    return {
        'deleted_comment': deleted_comment.to_dict()
    }

@app.route('/new', methods=['POST'])
def add_new_comment():
    form = NewCommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        comment = Comment(
            user_name=form.data['user_name'],
            body=form.data['body'],
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    else:
        
        return form.errors
        
