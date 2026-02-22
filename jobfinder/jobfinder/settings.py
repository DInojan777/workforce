"""
Django settings for jobfinder project.
"""

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-eswd)(^(5atj3*qaana@nvhj-fh#qt77z59==5mtmtu7-q2w$5')

DEBUG = os.environ.get('DEBUG', 'True') == 'True'

ALLOWED_HOSTS = [
    "cristie-comfiest-supersagaciously.ngrok-free.dev",
    "localhost",
    "127.0.0.1",
    "*",
]

INSTALLED_APPS = [
    'django_mongodb_backend',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'authentication',
    'rest_framework',
    'users',
    'company',
    'jobs',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'jobfinder.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'jobfinder.wsgi.application'

# Database — MongoDB via django-mongodb-backend (official)
# For MongoDB Atlas, set MONGODB_URI env var:
#   mongodb+srv://user:pass@cluster.mongodb.net/workforce
DATABASES = {
    'default': {
        'ENGINE': 'django_mongodb_backend',
        'NAME': 'workforce',
        'HOST': os.environ.get('MONGODB_URI', 'mongodb+srv://admin:Thilak_dr1@cluster0.pq8bsxe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

DEFAULT_AUTO_FIELD = 'django_mongodb_backend.fields.ObjectIdAutoField'
AUTH_USER_MODEL = 'authentication.User'

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'jobfinder.renderers.MongoJSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
}

# CORS — allow frontend origins
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
]
CORS_ALLOW_ALL_ORIGINS = DEBUG  # Allow all in dev

CSRF_TRUSTED_ORIGINS = [
    "https://cristie-comfiest-supersagaciously.ngrok-free.dev",
    "http://localhost:5173",
]

CORS_ALLOW_HEADERS = ['content-type', 'authorization']
CORS_ALLOW_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
