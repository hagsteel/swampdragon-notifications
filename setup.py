import os
from setuptools import setup, find_packages


def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

setup(
    name="swampdragon-notifications",
    version="0.1.0",
    author="Jonas Hagstedt",
    author_email="hagstedt@gmail.com",
    description=("SwampDragon notifications "),
    license="BSD",
    keywords="Notifications, realtime notifications",
    url="https://github.com/jonashagstedt/swampdragon-notifications",
    packages=find_packages(),
    long_description=read('README.md'),
    include_package_data=True,
    install_requires=[
        "Django >= 1.6, < 1.8",
        "django-model-utils",
        "swampdragon",
    ],
    classifiers=[
        "Development Status :: 4 - Beta",
        "License :: OSI Approved :: BSD License",
        "Programming Language :: Python :: 2.7",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.3",
        "Programming Language :: Python :: 3.4",
    ],
)
