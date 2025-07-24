import uvicorn
from fastapi import FastAPI, Request, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
import os
from sqlalchemy.orm import Session

from .database import SessionLocal, engine
from . import models
from . import schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"] # Update with your allowed origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/health")
def health_check():
    return {"status": "ok"}

# Include your routers here
# from .routers import users, courses, etc.
# app.include_router(users.router)
# app.include_router(courses.router)
# etc.

# Mount static files for frontend
if os.path.exists("static"):
    app.mount("/static", StaticFiles(directory="static"), name="static")

    @app.get("/{{"file_path:path}}")
    async def serve_frontend(file_path: str):
        if file_path.startswith("api/") or file_path == "":
            return None  # Let API routes handle it or serve index.html for root
        static_file = os.path.join("static", file_path)
        if os.path.isfile(static_file):
            return FileResponse(static_file)
        return FileResponse("static/index.html")  # SPA routing

@app.exception_handler(Exception)
def unicorn_exception_handler(request: Request, exc: Exception):
    return JSONResponse(status_code=500, content={"detail": f"An unexpected error occurred: {exc}"})

#Run with: uvicorn backend.main:app --reload
