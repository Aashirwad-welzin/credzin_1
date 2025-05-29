import pandas as pd
import pymongo  
from pymongo import MongoClient 
import logging
# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger()


def fetch_data_from_mongodb():

    logger.info("Connecting to MongoDB to fetch data...")

    MONGO_URI = "mongodb+srv://Welzin:yYsuyoXrWcxPKmPV@welzin.1ln7rs4.mongodb.net/credzin?retryWrites=true&w=majority&appName=Welzin"
    db_name = "credzin"
    collection_user = "users"
    collection_credit_card = "credit_cards"
    collection_recommendation = "recommendations1"

    try:
        myclient = MongoClient(MONGO_URI)
        mydb = myclient[db_name]

        mycol_user = mydb[collection_user]
        mycol_credit_card = mydb[collection_credit_card]
        mycol_recommendation = mydb[collection_recommendation]

        df_users = pd.DataFrame(list(mycol_user.find()))
        df_credit_cards = pd.DataFrame(list(mycol_credit_card.find()))
        df_recommendations = pd.DataFrame(list(mycol_recommendation.find()))

        logger.info("Successfully fetched data from MongoDB.")
        return df_users, df_credit_cards, df_recommendations

    except Exception as e:
        logger.error("Error connecting to MongoDB: %s", e)
        print("Error connecting to MongoDB:", e)
        return pd.DataFrame(), pd.DataFrame(), pd.DataFrame()  # Return empty DataFrames on error
