How to run:
	install node (using apt or node version manager)
	apt:
		sudo apt install nodejs


	clone the project from github:

	https version:
		git clone https://github.com/RCornidez/api_template.git

	ssh version:
		git clone git@github.com:RCornidez/api_template.git

	navigate within the folder and run the following:

		npm install

		//test that the application runs
		node index.js

	make your API into a service using systemd (linux):
	
		sudo vi /etc/systemd/system/api.service

		write the following (update your filepaths and user info, use "whereis" to find node filepath):

		[Unit]
		Description=Express API
		After=network.target

		[Service]
		ExecStart=/usr/bin/node /root/back/index.js
		Restart=always
		User=root

		[Install]
		WantedBy=multi-user.target

		
		Save and exit, then enable the service:

		sudo systemctl daemon-reload
		sudo systemctl enable api.service
		
		sudo systemctl start api.service

		if you make changes to the files, you will need to restart the service:
		sudo systemctl restart api.service

		be sure to check the status
		sudo systemctl status api.service


