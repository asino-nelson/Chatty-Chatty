# Build the project
echo "Building the project..."
pip install -r requirements.txt

echo "Make migrations..."
py manage.py makemigrations --noinput
py manage.py migrate --noinput

echo "Collect Static..."
py manage.py collectstatic --noinput


# Run the project