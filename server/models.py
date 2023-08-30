from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)


class Bathroom(db.Model):
    __tablename__ = 'bathrooms'

    id = db.Column(db.Integer, primary_key=True)
    bathroom_name = db.Column(db.String)
    reviews = db.Column(db.String, db.ForeignKey('reviews.id')) 
    street_num = db.Column(db.Integer)
    street_name = db.Column(db.String)
    city = db.Column(db.String)
    zip_code = db.Column(db.Integer)


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey('users.id')) 
    bathroom_id = db.Column(db.String, db.ForeignKey('bathrooms.id')) 
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, update=db.func.now())



from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import ForeignKey
from config import db


user_bathrooms = db.Table(
    'user_bathrooms', 
    db.Column('user_id', db.Integer, db.ForeignKey('user_id'), primary_key=True),
    db.Column('bathroom_id', db.Integer, db.ForeignKey('bathroom_id'), primary_key=True)
    )


class User(db.Model, SerializerMixin):
    __tablename__= 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    # username = db.Column(db.String, unique=True)
    # _password_hash = db.Column(db.String)

    reviews = db.relationship('Review', backref='user')
    bathroom = db.realtionship('Bathroom', secondary=user_bathrooms, backref='users')

    serialize_rules = (
        '-users_reviews',
        '-bathrooms_reviews',
        '-reviews_user'
    )

    def __repr__(self):
        return f'<User {self.id} {self.username}>'

class Bathroom(db.Model, SerializerMixin ):
    __tablename__ = 'bathrooms'

    id = db.Column(db.Integer, primary_key=True)
    bathroom_name = db.Column(db.String)
    street_num = db.Column(db.Integer)
    street_name = db.Column(db.String)
    city = db.Column(db.String)
    zip_code = db.Column(db.Integer)

    reviews = db.relationship('Review', backref='bathroom')


class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id')) 
    bathroom_id = db.Column(db.Integer, db.ForeignKey('bathrooms.id')) 
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    # updated_at = db.Column(db.DateTime, onupdate=db.func.now())