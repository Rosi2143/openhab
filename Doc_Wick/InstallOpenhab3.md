# Installation Openhab 3

1. Start with openhabian
   https://www.openhab.org/docs/installation/openhabian.html#quick-start

https://www.openhab.org/docs/installation/openhabian.html#quick-start

1. Install of the phoscon app for conbee2
https://phoscon.de/de/conbee/install#raspbian
openhabian@openHABianDevice:~$ sudo apt install deconz
sudo systemctl enable deconz
sudo systemctl start deconz
http://192.168.1.132/pwa/c


Add Phoscon GW Hue in openhab

# Create a backup
## Deconz
Safed this directory kueche-raspi:/home/pi/.local/share/dresden-elektronik/deCONZ#
to /home/computer/openhab

root@kueche-raspi:/usr/share/openhab# ./runtime/bin/backup 
                                         
#########################################
          openHAB backup script          
#########################################
                                         
Using '/etc/openhab' as conf folder...
Using '/var/lib/openhab' as userdata folder...
Using '/usr/share/openhab/runtime' as runtime folder...
Using '/var/lib/openhab/backups' as backup folder...
Writing to '/var/lib/openhab/backups/openhab-backup-21_01_23-17_07_13.zip'...
Making Temporary Directory if it is not already there
Using /tmp/openhab/backup as TempDir
Copying configuration to temporary folder...
Removing unnecessary files...
Zipping folder...
Removing temporary files...
Success! Backup made in /var/lib/openhab/backups/openhab-backup-21_01_23-17_07_13.zip

Adding time picker
added JSONpath aand Map Transformation, dd on under Einstellungen, Transformations
http://192.168.1.92:8080/static/time-line-picker/index.html?ip=192.168.1.92:8080&transferItem=TransferItem1&states=0,1,2,3&yAxisLabel=1,2,3,4,5,67&lang=en&event=no&dark=no&zoom=force&colorset=555E7B,B7D968,B576AD,E04644,FDE47F,7CCCE5,D486E8&deactivation=true

http://192.168.2.100:8080/static/time-line-picker/index.html?ip=192.168.2.100:8080&transferItem=TransferItem1&states=0,1,2,3&yAxisLabel=1,2,3,4,5,67&lang=en&event=no&dark=no&zoom=force&colorset=555E7B,B7D968,B576AD,E04644,FDE47F,7CCCE5,D486E8&deactivation=true

https://gitlab.com/RNTs_3/openhab-timeline-picker/-/tree/develop-migrationToJSR223_javascript
http://192.168.1.92:8080/static/time-line-picker-jsr/index.html?ip=192.168.1.92:8080&transferItem=TransferItem1
http://192.168.1.92:8080/static/time-line-picker-jsr/index.html?ip=192.168.1.92:8080&transferItem=TransferItem1&lang=de