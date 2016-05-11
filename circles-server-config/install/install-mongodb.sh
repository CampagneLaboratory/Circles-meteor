#!/bin/bash

# MongoDB on Ubuntu 14.04
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y nmap
sudo apt-get install -y mongodb-org

sudo mkdir /circles-db
sudo chown mongodb:mongodb /circles-db/

#see http://www.mkyong.com/mongodb/mongodb-allow-remote-access/

sudo echo '
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
storage:
  dbPath: /circles-db
  journal:
    enabled: true
#  engine:
#  mmapv1:
#  wiredTiger:

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongodb.log

# network interfaces
net:
  port: 27017  
  bindIp: 127.0.0.1,10.142.0.2 (REPLACE WITH INTERNAL IP)
  unixDomainSocket:
      enabled: true
      filePermissions: 0766
  http:
      enabled: false
      JSONPEnabled: false
      RESTInterfaceEnabled: false
#processManagement:

security:
 authorization: enabled

#operationProfiling:

#replication:

#sharding:

## Enterprise-Only Options:
' | sudo tee /etc/mongod.conf 

sudo iptables -A INPUT -p tcp --dport 27017 -j ACCEPT
sudo stop mongod
sudo start mongod

