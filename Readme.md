# Unit 17 | Assignment - Visualizing Data with Leaflet

## Background

![1-Logo](Images/1-Logo.png)

Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.

## Tasks

### Basic Visualization

![2-BasicMap](Images/2-BasicMap.png)

The first task is to visualize an earthquake data set.

1. **Getting Data**

   ![3-Data](Images/3-Data.png)

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes.
   For this project the dataset "All Earthquakes from the Past 7 Days" from the following USGS page  [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) is  used. The URL for the data set picked returns a JSONified data that is used for visualization

   ![4-JSON](Images/4-JSON.png)

2. **Import & Visualize the Data**

   * Leaflet is used to plot all earthquakes in the last 7 days accross the world, based on the data from the USGS GeoJSON Feed.

   * The data markers reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes appear larger and darker in color.

   * When a marker clicked, popups that provide additional information about the earthquake ("the place the earthquake occured and the magnitude of the earthquake") will be displayed.

   * A legend showing the color vs quake magnitude is displayed at the bottom right corner.


- - -
