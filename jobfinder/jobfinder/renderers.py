"""
Custom JSON encoder that handles MongoDB ObjectId and UUID serialization.
"""
import json
import uuid
from bson import ObjectId
from rest_framework.renderers import JSONRenderer


class MongoJSONEncoder(json.JSONEncoder):
    """JSON encoder that converts ObjectId and UUID to string."""
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        if isinstance(obj, uuid.UUID):
            return str(obj)
        return super().default(obj)


class MongoJSONRenderer(JSONRenderer):
    """DRF renderer that uses MongoJSONEncoder."""
    encoder_class = MongoJSONEncoder
