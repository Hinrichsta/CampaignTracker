FROM python:3.11.9-slim

# set a directory for the app
WORKDIR /usr/src/app

# Copy the reuirements for installation
COPY requirements.txt .

# install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# copy all the files to the container
COPY . .

# Expose port 8000
EXPOSE 8000

# Command to run the Django app with Gunicorn in production
CMD ["gunicorn", "Campaign-Django.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]