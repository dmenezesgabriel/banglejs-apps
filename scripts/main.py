import json
import logging
import os
import shutil

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

REMOVE_LIST = [".github", "apps", ".gitignore", "README.md", "scripts"]

def move_files(source_folder: str, destination_folder: str) -> None:
    """
    Move files and directories from source to destination.
    :source_folder: source directory
    :destination_folder: destination directory
    """
    # fetch all files
    directories_n_files = os.listdir(source_folder)
    logging.info(f"Directories and files form {source_folder}: \n{directories_n_files}")
    for file_or_dir in directories_n_files:
        # construct full file path
        source = source_folder + file_or_dir
        logging.info(f"file or dir to move: {source}")
        destination = destination_folder + file_or_dir
        logging.info(f"destination: {destination}")
        shutil.move(source, destination)
        logging.info(f"Moved: {file_or_dir}")

def main():
    current_dir_items = os.listdir(os.getcwd())
    logging.info(f"directories: {current_dir_items}")

    with open("./apps/apps.json", "r") as apps_file:
        apps_list = json.load(apps_file)

    with open("./bangle_apps/apps.json", "r") as site_apps_file:
        site_apps_list = json.load(site_apps_file)

    for custom_app in apps_list:
        if any(app['id'] == custom_app["id"] for app in site_apps_list):
            app_id = app['id']
            raise Exception(f"App {app_id} already exists")

    site_apps_list.extend(apps_list)

    os.remove("./apps/apps.json")

    with open("./bangle_apps/apps.json", "w") as site_apps_file:
        json.dump(site_apps_list, site_apps_file)

    move_files("./apps/", "./bangle_apps/apps/")

    # Remove build files
    for item in REMOVE_LIST:
        if os.path.exists(item):
            if os.path.isdir(item):
                shutil.rmtree(item)
            if os.path.isfile(item):
                os.remove(item)

    # Move site source to root directory
    move_files("./bangle_apps/", "./")
    shutil.rmtree("./bangle_apps/")

    logging.info(f"Current directory items: {current_dir_items}")

if __name__ == "__main__":
    main()
