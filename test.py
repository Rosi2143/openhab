
from openhab import OpenHAB
from pydbus import SystemBus
from gi.repository import GLib
import requests
r=requests.put('http://192.168.1.92:8080/rest/items/AlarmBuero', 'ON')


base_url = 'http://localhost:8080/rest'
openhab = OpenHAB(base_url)

# fetch all items
items = openhab.fetch_all_items()

AlarmBuero = items.get('AlarmBuero')
print(AlarmBuero.state)
item = openhab.get_item('AlarmBuero')
item.command('ON')


