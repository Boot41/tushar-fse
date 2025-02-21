# Use an official Python runtime as the base image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy manage.py directly into the /app directory
COPY core/manage.py /app/

# Copy the entire core directory into the container
COPY core /app/core/

# Expose the port your Django app runs on (default is 8000)
EXPOSE 8000

# Run the Django development server (or use gunicorn for production)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]