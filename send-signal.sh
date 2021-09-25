#!/bin/bash
# Usage: send-signal.sh <recipient number> 'message to send'
date >>/tmp/var1
echo "Number Arg1: $1" >> /tmp/var1
echo "Message Arg2: $2" >> /tmp/var1

#echo "/opt/signal/bin/signal-cli --config /var/lib/signal-cli -u +41719518471 send -m \"$2\" $1" >> /tmp/var1
#/opt/signal/bin/signal-cli --config /var/lib/signal-cli -u +41719518471 send -m "$2" $1

#dbus-send --system --type=method_call --print-reply --dest="org.asamk.Signal" /org/asamk/Signal org.asamk.Signal.sendMessage string:"Bitte tischen1, draussen" array:string: string:"+41792279112"
dbus-send --system --type=method_call --print-reply --dest="org.asamk.Signal" /org/asamk/Signal org.asamk.Signal.sendMessage string:"$2" array:string: string:"$1"
echo "end2" >> /tmp/var1
