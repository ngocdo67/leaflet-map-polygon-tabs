# leaflet-map-polygon-tabs
Leaflet thematic polygon map, with hover info, tabs to display time periods, and data drawn from GeoJSON file

## Demo
http://ngocdo67.github.io/leaflet-map-polygon-tabs

## Credits
- Map design by Connecticut Mirror http://ctmirror.org

## Limitations
- legend displays only numerical ranges, not text values

## Create your own
- see Leaflet templates section of *Data Visualization for All* book http://datavizforall.org

## Compare with
- http://github.com/jackdougherty/leaflet-map-polygon-tabs-js

## To Do
- should I load leaflet and JQuery from local library rather than CDN?
- should I load the GeoJson data file earlier in the process to maximize efficiency? if so, is the best solution to move script.js closer to the top in index.html? if yes, should the entire script.js file be loaded as a function, as Alvin did?
- is there a better way to make this more responsive for smaller devices? Hover does not work in iOS or Android tablets
- is there a way to use keyboard tabbing to flip through tabs, to move through time? I tried some "tabindex" html but couldn't make it select tabs automatically 
