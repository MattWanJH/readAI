from setuptools import setup, find_packages

setup(
    name='readAI_setup',
    version='0.1.0',
    description='Downloads cohere, setuptools, pip', 

    packages=find_packages('readAI_setup'),

    install_requires=[ 
        'cohere', 
        'setuptools', 
        'pip',
    ], 
)
