from __future__ import annotations

from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.routes.analyze import router as analyze_router
from backend.routes.heatmap import router as heatmap_router
from backend.services.inference_service import load_class_names, load_fish_info
from tensorflow.keras.models import load_model


BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "fish_model.h5"
CLASS_NAMES_PATH = BASE_DIR / "data" / "class_names.json"
FISH_INFO_PATH = BASE_DIR / "data" / "fish_species.json"



class HealthResponse(BaseModel):
    status: str = "ok"
    service: str = "aquascope-ai-backend"


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("AquaScope AI backend starting...")

    if not MODEL_PATH.exists():
        raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")

    if not CLASS_NAMES_PATH.exists():
        raise FileNotFoundError(f"Class names file not found: {CLASS_NAMES_PATH}")

    app.state.model = load_model(MODEL_PATH)
    app.state.class_names = load_class_names(CLASS_NAMES_PATH)
    app.state.fish_info = load_fish_info(FISH_INFO_PATH)

    print("Model output shape:", app.state.model.output_shape)
    print("Class names count:", len(app.state.class_names))
    print("Class names:", app.state.class_names)
    yield

    print("AquaScope AI backend shutting down...")


app = FastAPI(
    title="AquaScope AI Backend",
    version="1.0.0",
    description="Fish image analysis backend for AquaScope",
    lifespan=lifespan,
)



app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router)
app.include_router(heatmap_router)


@app.get("/", response_model=HealthResponse)
async def root() -> HealthResponse:
    return HealthResponse()


@app.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    return HealthResponse()
