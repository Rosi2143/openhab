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

