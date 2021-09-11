import json
import os
import shutil


def move_files(source_folder, destination_folder):
    # fetch all files
    print(os.listdir(source_folder))
    for file_or_dir in os.listdir(source_folder):
        # construct full file path
        source = source_folder + file_or_dir
        print("src:", source)
        destination = destination_folder + file_or_dir
        print("dest: ", destination)
        shutil.move(source, destination)
        print('Moved:', file_or_dir)

print(os.listdir(os.getcwd()))

with open("./apps/apps.json", "r") as apps_file:
    apps_list = json.load(apps_file)

with open("./bangle_apps/apps.json", "r") as site_apps_file:
    site_apps_list = json.load(site_apps_file)

print(site_apps_list)
print("-------------------------")
updated_apps_list = site_apps_list.extend(apps_list)
print(updated_apps_list)

os.remove("./apps/apps.json")


with open("./bangle_apps/apps.json", "w") as site_apps_file:
    site_apps_file.write(updated_apps_list)

move_files("./apps", "./bangle_apps/apps")

REMOVE_LIST = [".github", "apps", ".gitignore", "README.md", "scripts"]

for item in REMOVE_LIST:
    if os.path.exists(item):
        if os.path.isdir(item):
            shutil.rmtree(item)
        if os.path.isfile(item):
            os.remove(item)

move_files("./bangle_apps/", "./")
shutil.rmtree("./bangle_apps/")

print(os.listdir(os.getcwd()))
