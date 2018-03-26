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
    result=session.query(events_db.genre,events_db.Name,func.max(events_db.PriceMaximum).label("PriceMaximum"),\
                       events_db.StartDate,events_db.Venue).distinct().filter(events_db.PriceMaximum!=0).group_by(events_db.genre).order_by(func.max(events_db.PriceMaximum).desc()).all()
    names = ["Genre","Name", "PriceMaximum","StartDate","Venue"]
    json_result=create_dict(result,names)
    return jsonify(json_result)


@app.route('/analysis/Minimum')
def ret_analysis_min():
    result=session.query(events_db.genre,events_db.Name,func.max(events_db.PriceMinimum).label("PriceMinimum"),\
                       events_db.StartDate,events_db.Venue).distinct().filter(events_db.PriceMinimum!=0).group_by(events_db.genre).order_by(func.max(events_db.PriceMinimum).desc()).all()
    
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
    result = session.query(events_db.StateCode,events_db.genre,func.count(events_db.genre).label('counts')).group_by(events_db.StateCode,events_db.genre).subquery('result')

    query=session.query(result.c.StateCode,result.c.genre,func.max(result.c.counts)).group_by(result.c.StateCode).all()

    #result = session.execute("SELECT statecode,genre,MAX(counts) as Popular  FROM(SELECT statecode,genre,COUNT(genre) AS counts FROM Events GROUP BY statecode,genre) group by statecode ").fetchall()
    names = ["State","Genre", "Count"]
    json_result=create_dict(query,names)
    return jsonify(json_result)


if __name__ == '__main__':
    app.run(debug=True)