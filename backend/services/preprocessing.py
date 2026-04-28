from __future__ import annotations

from io import BytesIO

import numpy as np
from PIL import Image


def load_image_from_bytes(image_bytes: bytes) -> Image.Image:
    """
    Convert raw bytes into a RGB PIL image.
    """
    try:
        image = Image.open(BytesIO(image_bytes)).convert("RGB")
        return image
    except Exception as exc:
        raise ValueError("Invalid image data") from exc


def preprocess_image(
    image_bytes: bytes,
    target_size: tuple[int, int] = (224, 224),
) -> np.ndarray:
    """
    Prepare an image for TensorFlow inference.

    Output shape:
        (1, height, width, 3)

    Output dtype:
        float32
    """
    image = load_image_from_bytes(image_bytes)
    image = image.resize(target_size)

    image_array = np.asarray(image, dtype=np.float32)

    if image_array.ndim != 3 or image_array.shape[2] != 3:
        raise ValueError("Image must have 3 color channels")

    # EfficientNetB0 includes its own input rescaling in tf.keras.applications.
    # Keep pixel values in the 0-255 range to match the training pipeline.
    image_array = np.expand_dims(image_array, axis=0)

    return image_array
