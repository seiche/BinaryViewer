import os
import zipfile

if os.path.isfile("app.nw"):
    os.remove("app.nw")

zipf = zipfile.ZipFile('app.nw', 'w')

for root, dirs, files in os.walk("."):
    if ".git" in root:
        continue

    for file in files:
        if file.endswith(".py"):
            continue
        if file.endswith(".zip"):
            continue

        zipf.write(os.path.join(root, file))

zipf.close()
os.system("nw app.nw")
