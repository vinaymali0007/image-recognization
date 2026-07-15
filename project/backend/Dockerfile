FROM python:3.11-slim

WORKDIR /app

# Install system dependencies for Pillow/Torch AND psycopg2 compilation tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    libjpeg62-turbo-dev \
    zlib1g-dev \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p uploads

ENV PORT=5000
EXPOSE 5000

# Increased timeout to 120 seconds gives the retry loop room to wait for the DB to start
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "--timeout", "120", "app:app"]