# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
# Python SQL toolkit and Object Relational Mapper
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import random


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

from flask_sqlalchemy import SQLAlchemy


#################################################
# Database Setup
#################################################
engine = create_engine(os.path.join("sqlite:///EventsDB.db"),echo=False)


conn = engine.connect()
Base = automap_base()
# Use the Base class to reflect the database tables
Base.prepare(engine, reflect=True)
# Print all of the classes mapped to the Base
Base.classes.keys()
events_db = Base.classes.Events
session = Session(engine)


@app.route("/")
def home():
    return render_template("index.html")


@app.route('/maps')
def ret_names():
    result_sample = session.query(events_db.Latitude,events_db.Longitude,events_db.Name,events_db.PriceMaximum,\
                       events_db.PriceMinimum,events_db.StartDate,events_db.Subgenre,events_db.Venue).all()

    result_list=[]
    result_dict={}
    names = ["Latitude", "Longitude", "Name","PriceMaximum","PriceMinimum","StartDate","Subgenre","Venue"]
    for each in result_sample:
        result_dict={}
        for i in range(len(names)):
            result_dict[names[i]]=each[i]
        result_list.append(result_dict)
    return jsonify(result_list)
    


if __name__ == '__main__':
    app.run(debug=True)
