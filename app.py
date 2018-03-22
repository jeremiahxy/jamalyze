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
    result_sample = session.query(events_db.genre,events_db.Latitude,events_db.Longitude,events_db.Name,events_db.PriceMaximum,\
                       events_db.PriceMinimum,events_db.StartDate,events_db.Subgenre,events_db.Venue).all()
    json_result=create_dict(result_sample)
    #result_list=[]
    #result_dict={}
    #names = ["Latitude", "Longitude", "Name","PriceMaximum","PriceMinimum","StartDate","Subgenre","Venue"]
    #for each in result_sample:
    #    result_dict={}
    #    for i in range(len(names)):
     #       result_dict[names[i]]=each[i]
      #  result_list.append(result_dict)
    return jsonify(json_result)

def create_dict(result_data):
    result_list=[]
    result_dict={}
    names = ["Genre","Latitude", "Longitude", "Name","PriceMaximum","PriceMinimum","StartDate","Subgenre","Venue"]
    for each in result_data:
        result_dict={}
        for i in range(len(names)):
            result_dict[names[i]]=each[i]
        result_list.append(result_dict)
    return result_list

def create_dict_analysis(result_data,flag):
    result_list=[]
    result_dict={}
    if flag:
        names = ["Genre","Name", "Gap"]
    else:
        names = ["Genre","Name", "PriceMaximum","StartDate","Venue"]
    for each in result_data:
        result_dict={}
        for i in range(len(names)):
            result_dict[names[i]]=each[i]
            #print(each[1])
        result_list.append(result_dict)
    return result_list

@app.route('/maps/<criteria>/<path:value>')
def filtered_data(criteria,value):
    result_query= session.query(events_db.genre,events_db.Latitude,events_db.Longitude,events_db.Name,events_db.PriceMaximum,\
                        events_db.PriceMinimum,events_db.StartDate,events_db.Subgenre,events_db.Venue).filter(getattr(events_db,criteria)==value).all()
    json_result=create_dict(result_query)
    return jsonify(json_result)

@app.route('/analysis/Maximum')
def ret_analysis_max():
    result = session.execute("select genre,name,max(PriceMaximum),startdate,venue from Events where PriceMaximum<> 0  group by genre order by max(PriceMaximum) desc").fetchall()
    json_result=create_dict_analysis(result,flag=False)
    return jsonify(json_result)


@app.route('/analysis/Minimum')
def ret_analysis_min():
    result = session.execute("select  genre,name,min(PriceMinimum),startdate,venue from Events where PriceMinimum<> 0 group by genre order by min(PriceMinimum)").fetchall()
    json_result=create_dict_analysis(result,flag=False)
    return jsonify(json_result)

@app.route('/analysis/Gap')
def ret_analysis_gap():
    result = session.execute("SELECT distinct genre, name,Max(PriceMaximum - PriceMinimum) AS Gap FROM Events  group by name order by Gap desc").fetchall()
    json_result=create_dict_analysis(result,flag=True)
    return jsonify(json_result)


if __name__ == '__main__':
    app.run(debug=True)