import os

print(os.listdir(os.getcwd()))

REMOVE_LIST = ["apps", "README.md"]

for item in REMOVE_LIST:
    if os.path.exists(item):
        os.remove(item)
    else:
        print("The folder does not exist")

print(os.listdir(os.getcwd()))

