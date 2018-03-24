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
    result = session.execute("select genre,name,max(PriceMaximum),startdate,venue from Events where PriceMaximum<> 0  group by genre order by max(PriceMaximum) desc").fetchall()
    names = ["Genre","Name", "PriceMaximum","StartDate","Venue"]
    json_result=create_dict(result,names)
    return jsonify(json_result)


@app.route('/analysis/Minimum')
def ret_analysis_min():
    result = session.execute("select  genre,name,min(PriceMinimum),startdate,venue from Events where PriceMinimum<> 0 group by genre order by min(PriceMinimum)").fetchall()
    names = ["Genre","Name", "PriceMinimum","StartDate","Venue"]
    json_result=create_dict(result,names)
    return jsonify(json_result)

@app.route('/analysis/Gap')
def ret_analysis_gap():
    result = session.execute("SELECT distinct genre, name,Max(PriceMaximum - PriceMinimum) AS Gap FROM Events  group by name order by Gap desc").fetchall()
    names = ["Genre","Name", "Gap"]
    json_result=create_dict(result,names)
    return jsonify(json_result)

@app.route('/analysis/Popular')
def ret_popular():
    result = session.execute("SELECT statecode,genre,MAX(counts) as Popular  FROM(SELECT statecode,genre,COUNT(genre) AS counts FROM Events GROUP BY statecode,genre) group by statecode ").fetchall()
    names = ["State","Genre", "Count"]
    json_result=create_dict(result,names)
    return jsonify(json_result)


if __name__ == '__main__':
    app.run(debug=True)