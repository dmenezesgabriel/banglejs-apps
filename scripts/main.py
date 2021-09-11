import os
import shutil

print(os.listdir(os.getcwd()))

REMOVE_LIST = [".github", "apps", ".gitignore", "README.md", "scripts"]

for item in REMOVE_LIST:
    if os.path.exists(item):
        if os.path.isdir(item):
            shutil.rmtree(item)
        if os.path.isfile(item):
            os.remove(item)

source_folder = "./bangle_apps"
destination_folder = "./"

# fetch all files
print(os.listdir(source_folder))
for file_name in os.listdir(source_folder):
    # construct full file path
    source = source_folder + file_name
    print("src:", source)
    destination = destination_folder + file_name
    print("dest: ", destination)
    # move only files
    if os.path.isfile(source):
        shutil.move(source, destination)
        print('Moved:', file_name)

shutil.rmtree(source_folder)

print(os.listdir(os.getcwd()))
