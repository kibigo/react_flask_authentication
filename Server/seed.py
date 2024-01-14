from random import choice, randint, random
import json
from faker import Faker
from app import app
from model import db, Customer

fake = Faker()

with app.app_context():

    Customer.query.delete()
    db.session.commit()

    customers = []
    passwords = ['michael', 'gooseman', 'trident', 'kenyanboys', 'nomatch', 'CIA-123', 'Benjo']
    for n in range(15):
        customer = Customer(firstname=fake.first_name(), lastname=fake.last_name(), email=fake.email(), password=f"{choice(passwords)}{randint(3,30)}")
        customers.append(customer)


    db.session.add_all(customers)
    db.session.commit()