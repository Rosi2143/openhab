def msgRcv (timestamp, source, groupID, message, attachments):
   print ("Message", message, "source:",source)
   #print ("Message", message, "received in group", signal.getGroupName (groupID))
   openhab.get_item('AlarmBuero').command('ON')
   return

from pydbus import SystemBus
from gi.repository import GLib
from openhab import OpenHAB
base_url = 'http://localhost:8080/rest'
openhab = OpenHAB(base_url)

bus = SystemBus()
loop = GLib.MainLoop()

signal = bus.get('org.asamk.Signal') 
# NOTE: when daemon was started without explicit `-u USERNAME`, replace the line above with
# signal = bus.get("org.asamk.Signal", "/org/asamk/Signal/_YOURPHONENUMBER")

signal.onMessageReceived = msgRcv
loop.run()
