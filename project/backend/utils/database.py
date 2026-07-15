import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from sqlalchemy.engine.url import make_url


def create_database_if_not_exists(database_url: str):
    """
    Automatically create the PostgreSQL database if it does not exist.
    """

    try:
        url = make_url(database_url)

        db_name = url.database

        conn = psycopg2.connect(
            dbname="postgres",
            user=url.username,
            password=url.password,
            host=url.host,
            port=url.port,
        )

        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)

        cursor = conn.cursor()

        cursor.execute(
            "SELECT 1 FROM pg_database WHERE datname=%s",
            (db_name,)
        )

        exists = cursor.fetchone()

        if not exists:
            cursor.execute(f'CREATE DATABASE "{db_name}"')
            print(f"✅ Database '{db_name}' created.")
        else:
            print(f"✅ Database '{db_name}' already exists.")

        cursor.close()
        conn.close()

    except Exception as e:
        print(f"Database initialization skipped: {e}")