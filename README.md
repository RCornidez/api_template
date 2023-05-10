#How to run on Ubuntu Linux:

##install node (using apt or node version manager)
###Using apt:
```
sudo apt install nodejs
```
###Using NVM
refer to the [NVM installation guide](https://github.com/nvm-sh/nvm#installing-and-updating)

##clone the project from github:

###https version:
```
git clone https://github.com/RCornidez/api_template.git
```
###ssh version:
```
git clone git@github.com:RCornidez/api_template.git
```

###navigate within the folder and run the following:
```
npm install
```
###test that the application runs
```
node index.js
```


##Make your API into a service using systemd (linux):
```	
sudo vi /etc/systemd/system/api.service
```

###write the following (update your filepaths and user info, use "whereis" to find node filepath):

```
[Unit]
Description=Express API
After=network.target

[Service]
ExecStart=/usr/bin/node /root/back/index.js
Restart=always
User=root

[Install]
WantedBy=multi-user.target
```
		
###Save and exit, then enable the service:

```
sudo systemctl daemon-reload
sudo systemctl enable api.service		
sudo systemctl start api.service
```

###If you make changes to the API files, you will need to restart the service:
```
sudo systemctl restart api.service
```

###Be sure to check the status
```
sudo systemctl status api.service
```

