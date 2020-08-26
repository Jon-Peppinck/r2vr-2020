library(r2vr)

# Find the user's IP address as it is required for WebSocket connection
IPv4_ADDRESS <- find_IP() 

## 3D image paths (2400x1200px)
img_paths <- list(
  list(img = "./inst/ext/images/reef/100030039.jpg"),
  list(img = "./inst/ext/images/reef/120261897.jpg"),
  list(img = "./inst/ext/images/reef/130030287.jpg"),
  list(img = "./inst/ext/images/reef/130050093.jpg")
)

# Randomly select 3 out of the (4) images (any order) to avoid order bias
img_paths <- sample(img_paths, 3, replace=FALSE)

# Create image assets for selected images
for (i in 1:length(img_paths)) {
  currentImgPath <- img_paths[[i]]$img
  image_number <- paste0("image", i) # image1, ... , image<n>
  image_path <- paste0("image", i, "Path") # image1Path, ... , image<n>Path

  current_image <- a_asset(
    .tag = "image",
    id = paste0("img", i), # id = "img<i>" used to select DOM element
    src = currentImgPath
  )
  
  # Assign image<n> variable to its corresponding image asset
  assign(image_number, current_image) # i.e. image1, image2, image3
  # Assign image<n>Path variable to its corresponding image asset
  assign(image_path, currentImgPath) # i.e. image1Path, image2Path, image3Path
}

# Create 3D sky with images
canvas_3d <- a_entity(
  .tag = "sky",
  .js_sources = list(
    "./inst/js/button_controls.js",
    "./inst/js/bundle3d.js",
    "https://unpkg.com/aframe-look-at-component@0.5.1/dist/aframe-look-at-component.min.js"
  ),
  id = "canvas3d",
  class = img_paths[[1]]$img,
  src = image1,
  rotation = c(0, 0, 0),
  .assets = list(
    image2,
    image3
  )
)

# Create a cursor
cursor <- a_entity(
  .tag = "cursor",
  camera = "",
  look_controls = "",
  color = "#ff0000"
)

# Position cursor in center of camera
camera <- a_entity(
  .tag = "camera",
  .children = list(cursor),
  position = c(0, 0, 0),
  cursor = ""
)

## Markers
list_of_children_entities <- list(canvas_3d, camera)

initial_list_length <- length(list_of_children_entities)

outer_radius <- 0.04
inner_radius <- 0.03

for (i in 1:50) {
  sphere_radius = 500
  # TODO: exclude 0?
  u <- runif(1, -1, 1)
  theta <- runif(1, -pi, 0) # Full sphere: runif(1, 0, pi)
  # https://mathworld.wolfram.com/SpherePointPicking.html 
  x <- sqrt(1 - u^2) * cos(theta)
  y <- sqrt(1 - u^2) * sin(theta)
  z <- u
  
  marker_boundary <- a_entity(
    .tag = "ring",
    look_at = "[cursor]",
    raycaster_listen = "",
    id = paste0("markerBoundary", i),
    class = "marker-boundary",
    position = c(x, y, z),
    radius_outer = outer_radius,
    radius_inner = inner_radius,
    color = "#FF0000",
    side = "double"
  )
  
  marker_inner <- a_entity(
    .tag = "circle",
    look_at = "[cursor]",
    raycaster_listen = "",
    id= paste0("markerInner", i),
    class = "markerInner",
    position = c(x, y, z),
    radius = inner_radius,
    # color = "#ffffff" # TODO: Remove 
    opacity = 0
  )
  
  menu_coral <- a_entity(
    .tag = "ring",
    look_at = "[cursor]",
    raycaster_listen = "",
    id= paste0("menuCoral", i),
    class = "menu-item",
    position = c(x, y, z),
    radius_outer = outer_radius + 0.06,
    radius_inner = outer_radius,
    theta_length = 180,
    theta_start = 90,
    color = "#FF95BC",
    side = "double",
    visible = FALSE
  )
  
  menu_not_coral <- a_entity(
    .tag = "ring",
    look_at = "[cursor]",
    raycaster_listen = "",
    id = paste0("menuNotCoral", i),
    class = "menu-item",
    position = c(x, y, z),
    radius_outer = outer_radius + 0.06,
    radius_inner = outer_radius,
    theta_length = 180,
    theta_start = 270,
    color = "#969696",
    side = "double",
    visible = FALSE
  )
  
  # Marker container: Encapsulate a marker and its menu options inside a parent container
  marker_container <- a_entity(
    .tag = "ring",
    .children = list(marker_boundary, marker_inner, menu_coral, menu_not_coral),
    id = paste0("markerContainer", i),
    class = "marker-container",
    position = c(0, 0, 0),
    radius_inner = 0.00001,
    radius_outer = 0.00001,
    color = "#000000",
    opacity = 0,
    debug = "" # needed for x and y position after an update via web sockets
  )
  
  marker_container_number <- paste0("markerContainer", i)
  list_of_children_entities[[initial_list_length + i]] <- assign(marker_container_number, marker_container)
}


### GENERATE POINTS ###


### RENDER SCENE

animals <- a_scene(
  .children = list_of_children_entities,
  .websocket = TRUE,
  .websocket_host = IPv4_ADDRESS,
  .template = "empty",
  button_controls = "debug: true;",
  toggle_menu_listen = ""
)

### FUNCTIONS ###

## Start the Fiery server, establishing a WebSocket connection with the client
start <- function(){
  animals$serve(host = IPv4_ADDRESS)
}

## End the server
end <- function(){
  a_kill_all_scenes()
}

## Restart the server with file changes
restart <- function(){
  a_kill_all_scenes()
  source('C:/r2vr2020/r2vr/3D_training.R', echo=TRUE)
  animals$serve(host = IPv4_ADDRESS)
}