#save the state of the app (db)
cp -r ../Circles/.meteor .
rm -rf ../Circles
meteor-kitchen ~/Downloads/Circles.json ../Circles
#restore the previous state
rm -rf ../Circles/.meteor
mv -f .meteor ../Circles
rm -rf .meteor
mv -f  ~/Downloads/Circles.json .
cd ../Circles
meteor add jeremy:snapsvg
meteor --port 2000

