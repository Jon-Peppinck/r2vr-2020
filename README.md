# r2vr
[![Travis-CI Build Status](https://travis-ci.org/MilesMcBain/r2vr.svg?branch=master)](https://travis-ci.org/MilesMcBain/r2vr)
  [![lifecycle](https://img.shields.io/badge/lifecycle-experimental-orange.svg)](https://www.tidyverse.org/lifecycle/#experimental)

This package helps you generate and serve A-Frame scenes. It provides a suite of objects representing A-Frame scenes, entities, and assets that can be composed using a functional R interface.

# Installlation

`devtools::install_github("milesmcbain/r2vr")`

# Example Usage
To serve a scene containing JSON model and a glTF model, you can write R code that looks like this:

```r
library(r2vr)

  my_scene <- a_scene(template = "empty",
                      title = "A kangaroo and a cube.",
                      children = list(
                        a_json_model(
                          src_asset = a_asset(id = "cube", src = "./cube.json"),
                          position = c(0,0,-2), scale = c(0.2, 0.2, 0)),
                          
                        a_entity(tag = "gltf-model", position = c(2, 2, -3), 
                                 height = 1, width = 1,
                                 src = a_asset(id = "kangaroo", 
                                               src = test_path("Kangaroo_01.gltf"),
                                               parts = test_path("Kangaroo_01.bin")))
                          ))
  my_scene$render()
```

that will allow you to serve HTML that looks like this:

```html
<!DOCTYPE html>
<html>
    <head>
    <meta charset="utf-8">
    <title>A kangaroo and a cube.</title>
    <meta name="description" content= "A kangaroo and a cube.">
    <script crossorigin src="https://aframe.io/releases/0.8.0/aframe.min.js"></script>
    <script crossorigin src="https://cdn.rawgit.com/donmccurdy/aframe-extras/v4.0.2/dist/aframe-extras.loaders.js"></script>
    </head>
    <body>
        <a-scene >
            <a-assets>
                <a-asset-item id="cube" src="./cube.json"></a-asset-item>
                <a-asset-item id="kangaroo" src="tests/testthat/Kangaroo_01.gltf"></a-asset-item>
            </a-assets>
            
            <!-- Entities added in R -->
            <a-entity json-model="src: #cube;" position="0 0 -2" scale="0.2 0.2 0"></a-entity>
            <a-gltf-model position="2 2 -3" height="1" width="1" src="#kangaroo"></a-gltf-model>
            

            <!-- Ground -->
            <a-grid geometry='height: 10; width: 10'></a-grid>
        </a-scene>
    </body>
</html>
```

To serve the scene, using the [Fiery webserver framework](https://github.com/thomasp85/fiery):

```
my_scene$serve()

# Fire started at 127.0.0.1:8000
```

To stop serving use `my_scene$stop()`.
