
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ClassifyRequest(BaseModel):
    text: str
    lang: str = 'en'

class SentimentRequest(BaseModel):
    text: str

@app.get("/")
def read_root():
    return {"message": "Tarang ML Service is running."}

@app.post("/ml/classify")
def classify_text(request: ClassifyRequest):
    # In a real implementation, this would load a model and perform inference.
    # For now, we return a mock response.
    return {
        "isHazard": True,
        "category": "storm_surge",
        "confidence": 0.92,
        "keywords": ["water", "surge", "wind"]
    }

@app.post("/ml/sentiment")
def analyze_sentiment(request: SentimentRequest):
    # Mock response
    return {
        "sentiment_score": 0.75,
        "label": "positive"
    }

class HotspotRequest(BaseModel):
    bbox: list[float]
    timeWindow: str
    epsMeters: int

@app.post("/ml/hotspot")
def get_hotspots(request: HotspotRequest):
    # Mock response
    return {
        "hotspotId": "h1",
        "clusters": [
            {
                "centroid": {"lat": 16.96, "lng": 73.46},
                "count": 12
            },
            {
                "centroid": {"lat": 16.98, "lng": 73.48},
                "count": 8
            }
        ]
    }
