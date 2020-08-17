library(r2vr)

# Find the user's IP address as it is required for WebSocket connection
IPv4_ADDRESS <- find_IP() 

## 3D image paths (2400x1200)
img_paths <- list(
  # list(img = "./inst/ext/images/reef/1000030039.jpg"),
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
    # "https://unpkg.com/aframe-look-at-component@0.5.1/dist/aframe-look-at-component.min.js",
    "./inst/js/bundle3d.js"
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
  cursor = "rayOrigin: mouse" # note: entity works
)

## Markers
list_of_children_entities <- list(canvas_3d, camera)

initial_list_length <- length(list_of_children_entities)

for (i in 1:50) {
  sphere_radius = 500
  # TODO: exclude 0?
  # x <- runif(1, -1, 1) 
  # y <- runif(1, -1, 1) 
  # z <- runif(1, -1, 1)
  
  u <- runif(1, -1, 1)
  theta <- runif(1, 0, 2*pi)
  
  x <- sqrt(1 - u^2) * cos(theta)
  y <- sqrt(1 - u^2) * sin(theta)
  z <- u
  
  r_mag <- sqrt(x^2 + y^2 + z^2)
  
  angle1 <- atan2(y, x)
  angle2 <- asin(-u/(r_mag))
  
  angle1_deg <- angle1 * (180/pi)
  angle2_deg <- angle2 * (180/pi)
  
  
  # v <- runif(1)
  # theta <- 2 * pi * u
  # phi <- acos((2 * v) -1)
  
  # x_normal = x/(x^2 + y^2 + z^2)
  # y_normal = y/(x^2 + y^2 + z^2)
  # z_normal = z/(x^2 + y^2 + z^2)
  # 
  # x_ring = sphere_radius * x_normal
  # y_ring = sphere_radius * y_normal
  # z_ring = sphere_radius * z_normal
  
  ring <- a_entity(
    .tag = "ring",
    position = c(x, y, z),
    # rotation = c(angle1_deg, angle2_deg, 0),
    radius_outer = 0.04,
    radius_inner = 0.03,
    color = "#FF0000",
    side = "double",
    look_at = "[cursor]"
  )
  marker_i <- paste0("ring", i)
  list_of_children_entities[[initial_list_length + i]] <- assign(marker_i, ring)
}



box1 <- a_entity(
  .tag = "box",
  class = "box",
  position = c(1, 0, -4),
  color = "orange",
  cursor_listener = "",
  laser_controls="hand:right",
  btn_down = ""
)


### RENDER SCENE
# list_of_children_entities <- list(list_of_children_entities)

animals <- a_scene(
  .children = list_of_children_entities,
  .websocket = TRUE,
  .websocket_host = IPv4_ADDRESS,
  .template = "empty",
  button_controls = "debug: true;"
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