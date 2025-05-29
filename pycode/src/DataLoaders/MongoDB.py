import pandas as pd
import pymongo  
from pymongo import MongoClient 
from src.Utils.utils import logger


def mongodb_client():

    logger.info("Connecting to MongoDB to fetch data...")
    try:
        MONGO_URI = "mongodb+srv://Welzin:yYsuyoXrWcxPKmPV@welzin.1ln7rs4.mongodb.net/credzin?retryWrites=true&w=majority&appName=Welzin"
        db_name = "credzin"
        myclient = MongoClient(MONGO_URI)
        mydb = myclient[db_name]
    
        logger.info("Connected to MongoDB successfully.")

        # Define collection names
        # collection_user = "users"       
        # collection_credit_card = "credit_cards"
        # collection_recommendation = "recommendations

        # mycol_user = mydb[collection_user]
        # mycol_credit_card = mydb[collection_credit_card]
        # mycol_recommendation = mydb[collection_recommendation]
        # df_users = pd.DataFrame(list(mycol_user.find()))
        # df_credit_cards = pd.DataFrame(list(mycol_credit_card.find()))
        # df_recommendations = pd.DataFrame(list(mycol_recommendation.find()))
       
    except Exception as e:
        logger.error("Error connecting to MongoDB: %s", e)
        print("Error connecting to MongoDB:", e)
        return pd.DataFrame(), pd.DataFrame(), pd.DataFrame() 
       

    # Return empty DataFrames on error
