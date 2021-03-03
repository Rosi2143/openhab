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
Openhab login: ad14min, keypass

# Install Openhab3, Kueche2
Install Graphical GUI:
raspi-configs
Openhab username: thomas

Add Phoscon GW Hue in openhab

## Enable/disable phoscon gui
sudo systemctl disable deconz-gui
sudo systemctl stop deconz-gui
sduo systemctl enable deconz


### Remote usage
ssh -X pi@192.168.1.92 "/usr/bin/deCONZ"


# Create a backup
## Deconz
Safed this directory kueche-raspi:/home/pi/.local/share/dresden-elektronik/deCONZ#
to /home/computer/openhab

## Backup openhab
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

# Deconz logs
 deCONZ --dbg-info=2 --dbg-zdp=1 --dbg-zcl=1 --db-aps=1 --dbg-http=1
d
