"""
Django settings for demo project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
from os.path import join
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '!9b(fvlyfn*gf)#9p9i#+t)!+_oz4xm=_b4%^*jvqhxmle$&_6'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'swampdragon',
    'swampdragon_auth',
    'swampdragon_notifications',
    'app'
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'demo.urls'

WSGI_APPLICATION = 'demo.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-gb'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = join(BASE_DIR, 'static_root')

MEDIA_URL = '/media/'
MEDIA_ROOT = join(BASE_DIR, 'media')

# Additional locations of static files
STATICFILES_DIRS = [
    join(BASE_DIR, 'static'),
    join(BASE_DIR, 'bower_components'),
    join(BASE_DIR, 'templates-ng'),
]

TEMPLATE_DIRS = [
    join(BASE_DIR, 'templates')
]

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# SwampDragon settings
SWAMP_DRAGON_CONNECTION = ('swampdragon_notifications.notification_connection.Connection', '/data')
DRAGON_URL = 'http://localhost:9999/'
SWAMP_DRAGON = {
    'foo': 'bar'
}


SWAMP_DRAGON_NOTIFICATION_BACKENDS = [
    ('realtime', 'swampdragon_notifications.backends.realtime_notifications.RealtimeNotification'),
    # ('email', 'swampdragon_notifications.backends.email_notifications.EmailNotification'),
]


SWAMP_DRAGON_NOTIFICATIONS = {
    'foo': {
        'processor': 'app.subject_renderer.foo_to_dict',
        'icon': 'http://placekitten.com/g/64/64'
    }
}

SWAMP_DRAGON_HEARTBEAT_ENABLED = True
SWAMP_DRAGON_HEARTBEAT_FREQUENCY = 1000 * 60 * 5  # Five minutes
