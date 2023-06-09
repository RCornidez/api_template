# How to run on Ubuntu Linux:

## install node (using apt-get)
```
sudo apt-get install nodejs
```

## Clone the project from github:

```
git clone https://github.com/RCornidez/api_template.git
```
OR

```
git clone git@github.com:RCornidez/api_template.git
```

### Navigate within the folder and run the following:
```
npm install
```
### Test that the application runs
```
node index.js
```


## Make your API into a service using systemd (linux) by creating a file called "api.service" in the system folder:

```	
sudo vi /etc/systemd/system/api.service
```

### Write the following (update your filepaths and user info, use "whereis" to find node filepath):

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
		
### Save and exit, then enable the service:

```
sudo systemctl daemon-reload
sudo systemctl enable api.service		
sudo systemctl start api.service
```



### If you make changes to the API files, you will need to restart the service for the new changes to take effect to take effect:
```
sudo systemctl restart api.service
```

### Be sure to check the status
```
sudo systemctl status api.service
```

## Setup Nginx to serve API:

Modify /etc/nginx/sites-available/default to include:
```
server {
        listen 443 ssl;
        ssl_certificate /etc/nginx/certificates/color.cornidez.com.pem;
        ssl_certificate_key /etc/nginx/certificates/color.cornidez.com.key;
        server_name api1.cornidez.com;

        location / {
                proxy_pass http://localhost:3000;
        }

        access_log /var/log/nginx/access.log;
        error_log  /var/log/nginx/error_log  crit;
}
```
