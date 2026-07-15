from pymongo import MongoClient
from pymongo.collection import Collection
from typing import Dict, Any, Optional
from bson.objectid import ObjectId

class MongoRepository:
    def __init__(self):
        self.client = None
        self.db = None
        self.predictions_collection: Optional[Collection] = None

    def init_app(self, app):
        self.client = MongoClient(app.config['MONGO_URI'])
        # Extract db name from URI or default to 'neuroscan'
        db_name = app.config['MONGO_URI'].split('/')[-1].split('?')[0]
        if not db_name:
            db_name = 'neuroscan'
        self.db = self.client[db_name]
        self.predictions_collection = self.db['prediction_metadata']

    def save_prediction_metadata(self, metadata: Dict[str, Any]) -> str:
        """Saves metadata and returns the inserted document ID as a string."""
        if self.predictions_collection is None:
            raise Exception("MongoDB not initialized")
        result = self.predictions_collection.insert_one(metadata)
        return str(result.inserted_id)

    def get_prediction_metadata(self, doc_id: str) -> Optional[Dict[str, Any]]:
        """Retrieves metadata by ID."""
        if self.predictions_collection is None:
            raise Exception("MongoDB not initialized")
        try:
            return self.predictions_collection.find_one({"_id": ObjectId(doc_id)})
        except:
            return None

    def delete_prediction_metadata(self, doc_id: str) -> bool:
        """Deletes metadata by ID."""
        if self.predictions_collection is None:
            raise Exception("MongoDB not initialized")
        try:
            result = self.predictions_collection.delete_one({"_id": ObjectId(doc_id)})
            return result.deleted_count > 0
        except:
            return False

mongo_repo = MongoRepository()
