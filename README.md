
## Instalation

### Backend
Download and unpack repository

Start cmd from ```backend``` folder.

Create virtual env
```python -m venv /path/to/folder/env_name```

Activate env
```source /path/to/folder/env_name/bin/activate```

Install requirements ```pip install -r requirements.txt```

Make migrations ```python manage.py makemigrations``` 

Migrate changes ```python manage.py migrate```

Run server ```python manage.py runserver```


### Frontend 
In frontend folder:

Install packages ```npm install```

Run server ```npm start```


Application should be available on ```htttp://localhost:3000```
