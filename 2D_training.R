library(r2vr)

# Set meta data
META_DATA <- "2d/training"

# Set observer here
USER <- "Jon-Peppinck"

# Find the user's IP address as it is required for WebSocket connection
IPv4_ADDRESS <- find_IP() 

img_paths <- list(
  list(img = "./2dimages/latest/49001074001.jpeg"),
  list(img = "./2dimages/latest/49002256001.jpeg"),
  list(img = "./2dimages/latest/14017099802.jpeg")
)

# Colours
COLOR_MARKER <- "#FFFFFF"
COLOR_CORAL <- "#FF95BC"
COLOR_NOT_CORAL <- "#969696"
COLOR_TEXT <- "#000000"
COLOR_CAMERA_CURSOR <- "#FF0000"

# Randomly select 3 out of the 6 images (any order)
img_paths <- sample(img_paths, 3, replace=FALSE)

for (i in 1:length(img_paths)) {
  currentImgPath <- img_paths[[i]]$img # string
  
  # image1, ... , image<n>, s.t. n = index of last image path
  image_number <- paste0("image", i)
  image_path <- paste0("image", i, "Path")
  # Create image asset with id="img<i>" (to select DOM element)
  current_image <- a_asset(
    .tag = "image",
    id = paste0("img", i),
    src = currentImgPath
  )
  # Assign image<n> variable to its corresponding image asset
  assign(image_number, current_image)
  # Assign image<n>Path variable to its corresponding image path
  assign(image_path, currentImgPath)
}

# Create a canvas for the image to be attached to
canvas_2d <- a_entity(
  .tag = "plane",
  # TODO: change to CDN ?
  .js_sources = list(
    "https://cdn.jsdelivr.net/gh/ACEMS/r2vr@master/inst/js/button_controls.js",
    "./inst/js/training2d.js"
  ),
  .assets = list(image2, image3),
  id = "canvas",
  src = image1,
  class = img_paths[[1]]$img,
  height = 3,
  width = 4,
  position = c(0, 0, -3)
)

# Create a cursor
cursor <- a_entity(
  .tag = "cursor",
  camera = "",
  color = COLOR_CAMERA_CURSOR
)

# Position cursor in center of camera
camera <- a_entity(
  .tag = "camera",
  .children = list(cursor),
  cursor = "",
  position = c(0, 0, 0)
)

# Invisble entity to store user name for client side JS
user <- a_entity(
  .tag = "circle",
  id = "user",
  class = USER,
  opacity = 0,
  radius = 0
)

# Invisble entity to store meta data for client side JS
meta_data <- a_entity(
  .tag = "circle",
  id = "metaData",
  class = META_DATA,
  opacity = 0,
  radius = 0
)

# Markers
list_of_children_entities <- list(canvas_2d, camera, user, meta_data)

## RENDER SCENE
animals <- a_scene(
  .children = list_of_children_entities,
  .websocket = TRUE,
  .websocket_host = IPv4_ADDRESS,
  .template = "empty",
  button_controls = "debug: true;",
  # toggle_menu_listen = ""
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
  source('C:/r2vr2020/r2vr/2D_training.R', echo=TRUE)
  animals$serve(host = IPv4_ADDRESS)
}