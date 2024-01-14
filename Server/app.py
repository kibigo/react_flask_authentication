from flask import Flask, request, jsonify, session, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api, Resource
from model import db, Customer
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///app.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.json.compact = False

migrate = Migrate(app, db)
CORS(app, supports_credentials=True)

db.init_app(app)

api = Api(app)

class Index(Resource):

    @staticmethod
    def get():
        welcome_message = {
            "index":"Welcome"
        }

        response = make_response(
            jsonify(welcome_message),
            200
        )

        return response
    
api.add_resource(Index, '/')


class Login(Resource):

    @staticmethod
    def post():
        user = request.get_json()
        user_details = Customer.query.filter_by(lastname = user['username']).first()
        session['user_id'] = user_details.id

        response = make_response(
            jsonify({
                "id":user_details.id,
                "email":user_details.email,
                "username":user_details.lastname
            }), 200
        )
        return response

api.add_resource(Login, '/login')


class CheckUser(Resource):

    @staticmethod
    def get():
        user = session.get('user_id')

        user_details = Customer.query.filter_by(id = user).first()

        if user_details:
            return make_response(
                jsonify({
                    "id":user_details.id,
                    "email":user_details.email,
                    "username":user_details.lastname
                }),200
            )
        else:
            return make_response(
                jsonify({
                    "message":"please login to continue"
                }), 401
            )
        
api.add_resource(CheckUser, '/user')

class Logout(Resource):

    @staticmethod
    def delete():
        session['user_id'] = None

        response = make_response(
            jsonify({
                "message":"You have been logged out"
            }), 200
        )
        return response
    
api.add_resource(Logout, '/logout')  



class Customers(Resource):

    @staticmethod
    def get():
        response_dict_list = [n.to_dict() for n in Customer.query.all()]

        response = make_response(
            jsonify(response_dict_list),
            200,
        )
        return response

    @staticmethod
    def post():
        
        user_data = request.get_json()
        new_record = Customer(
            firstname=user_data['firstname'],
            lastname=user_data['lastname'],
            email=user_data['email'],
            password=user_data['password'],
        )

        db.session.add(new_record)
        db.session.commit()

        new_dict = {
            "id":new_record.id,
            "firstname":new_record.firstname,
            "lastname":new_record.lastname,
            "email":new_record.email,
            "password":new_record.password
        }

        response = make_response(
            jsonify(new_dict
),
            201,
        )
        return response


api.add_resource(Customers, '/customers')