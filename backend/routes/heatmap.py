from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter(prefix="/api/v1", tags=["heatmap"])


class FishHeatmapPoint(BaseModel):
    id: str
    lat: float
    lng: float
    species: str
    count: int = Field(..., ge=0)
    location: str
    country: str
    waterType: str
    lastSeenAt: str


MOCK_POINTS = [
    FishHeatmapPoint(
        id="istanbul-levrek",
        lat=41.0082,
        lng=28.9784,
        species="Levrek",
        count=28,
        location="Istanbul",
        country="Türkiye",
        waterType="saltwater",
        lastSeenAt="2026-04-15",
    ),
    FishHeatmapPoint(
        id="new-york-bass",
        lat=40.7128,
        lng=-74.0060,
        species="Bass",
        count=41,
        location="New York",
        country="USA",
        waterType="freshwater",
        lastSeenAt="2026-04-14",
    ),
    FishHeatmapPoint(
        id="singapore-clownfish",
        lat=1.3521,
        lng=103.8198,
        species="Clownfish",
        count=24,
        location="Singapore",
        country="Singapore",
        waterType="saltwater",
        lastSeenAt="2026-04-13",
    ),
]


@router.get("/fish-heatmap", response_model=list[FishHeatmapPoint])
async def fish_heatmap_data() -> list[FishHeatmapPoint]:
    return MOCK_POINTS
