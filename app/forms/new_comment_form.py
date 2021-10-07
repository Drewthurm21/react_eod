from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class NewCommentForm(FlaskForm):
    user_name = StringField('user_name', validators=[DataRequired()])
    body = StringField('body', validators=[DataRequired()])