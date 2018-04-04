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
from sqlalchemy import create_engine, inspect, func, desc, extract

import pymongo
from pymongo import MongoClient

client = MongoClient(os.environ.get('MONGO_URL'),
                     connectTimeoutMS=30000,
                     socketTimeoutMS=None,
                     socketKeepAlive=True)

db = client.get_database()


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


def create_dict(result_data,names):
    result_list=[]
    result_dict={}
    
    for each in result_data:
        result_dict={}
        for i in range(len(names)):
            result_dict[names[i]]=each[i]
        result_list.append(result_dict)
    return result_list


@app.route("/")
def home():
    return render_template("index.html")


@app.route('/maps')
def ret_names():
    result_sample = session.query(events_db.genre,events_db.Latitude,events_db.Longitude,events_db.Name,events_db.PriceMaximum,\
                       events_db.PriceMinimum,events_db.StartDate,events_db.Subgenre,events_db.Venue).all()
    names = ["Genre","Latitude", "Longitude", "Name","PriceMaximum","PriceMinimum","StartDate","Subgenre","Venue"]
    json_result=create_dict(result_sample,names)
    return jsonify(json_result)



@app.route('/maps/<criteria>/<path:value>')
def filtered_data(criteria,value):
    result_query= session.query(events_db.genre,events_db.Latitude,events_db.Longitude,events_db.Name,events_db.PriceMaximum,\
                        events_db.PriceMinimum,events_db.StartDate,events_db.Subgenre,events_db.Venue).filter(getattr(events_db,criteria)==value).all()
    names = ["Genre","Latitude", "Longitude", "Name","PriceMaximum","PriceMinimum","StartDate","Subgenre","Venue"]
    json_result=create_dict(result_query,names)
    return jsonify(json_result)

@app.route('/analysis/Maximum')
def ret_analysis_max():
    result = session.execute("select genre,name,max(PriceMaximum) , startdate,venue from Events where PriceMaximum<> 0  group by genre order by max(PriceMaximum) desc").fetchall()
    names = ["Genre","Name", "PriceMaximum","StartDate","Venue"]
    json_result=create_dict(result,names)
    return jsonify(json_result)


@app.route('/analysis/Minimum')
def ret_analysis_min():
    result = session.execute("select genre,name,min(PriceMinimum) , startdate,venue from Events where PriceMinimum<> 0  group by genre order by min(PriceMinimum) desc").fetchall()
    names = ["Genre","Name", "PriceMinimum","StartDate","Venue"]
    json_result=create_dict(result,names)
    return jsonify(json_result)

@app.route('/analysis/Gap')
def ret_analysis_gap():
    result=session.query(events_db.genre,events_db.Name,func.max(events_db.PriceMaximum - events_db.PriceMinimum).label("Gap"),\
                       ).distinct().group_by(events_db.Name).order_by(func.max(events_db.PriceMaximum - events_db.PriceMinimum).desc()).all()
    names = ["Genre","Name", "Gap"]
    json_result=create_dict(result,names)
    return jsonify(json_result)

@app.route('/analysis/Popular')
def ret_popular():
    #result = session.query(events_db.StateCode,events_db.genre,func.count(events_db.genre).label('counts')).filter(events_db.StateCode.isnot(None)).group_by(events_db.StateCode,events_db.genre).subquery('result')

   # query=session.query(result.c.StateCode,result.c.genre,func.max(result.c.counts)).group_by(result.c.StateCode).all()
    result = session.execute("Select distinct t1.statecode,t1.genre,t1.cnt AS POPULAR from(SELECT statecode,genre,count(id) as cnt FROM Events GROUP BY statecode,genre) AS T1 left outer join (SELECT statecode,genre,count(id) as cnt FROM Events GROUP BY statecode,genre) AS T2 on t2.cnt>t1.cnt and t1.statecode=t2.statecode and t2.cnt is not null where t2.cnt is null").fetchall()
    #result = session.execute("SELECT ASI.statecode, ASI.genre, ASI.COUNTS AS POPULAR  FROM(SELECT statecode,genre,COUNT(genre) AS counts FROM Events GROUP BY statecode,genre) ASI group by statecode having max(counts)").fetchall()
    names = ["State","Genre", "Count"]
    json_result=create_dict(result,names)
    return jsonify(json_result)

# @app.route('/scrape')
# def scrape():
#     surfing = db.surfing
#     data = scrape_surfing.scrape()
#     surfing.update(
#         {},
#         data,
#         upsert=True
#     )
#     return redirect("https://jamalyze-son.herokuapp.com/static/stats.html", code=302)

if __name__ == '__main__':
    app.run(debug=True)