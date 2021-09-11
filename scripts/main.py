import os
import shutil

print(os.listdir(os.getcwd()))

REMOVE_LIST = ["apps", "README.md"]

for item in REMOVE_LIST:
    if os.path.exists(item):
        if os.path.isdir(item):
            shutil.rmtree(item)
        if os.path.isfile(item):
            os.remove(item)

print(os.listdir(os.getcwd()))

