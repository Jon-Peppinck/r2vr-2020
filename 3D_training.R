library(r2vr)

# Find the user's IP address as it is required for WebSocket connection
IPv4_ADDRESS <- find_IP() 

## 3D image paths
img_paths <- list(
  list(img = "./inst/ext/images/reef/1000030039.jpg"),
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
  color = "#ff0000"
)

# Position cursor in center of camera
camera <- a_entity(
  .tag = "camera",
  .children = list(cursor),
  position = c(0, 0, 0)
)

### RENDER SCENE
list_of_children_entities <- list(canvas_3d, camera)

animals <- a_scene(
  .children = list_of_children_entities,
  .websocket = TRUE,
  .websocket_host = IPv4_ADDRESS,
  .template = "empty",
  button_controls = "debug: true;",
  coral_cover_2d_buttons = "",
  intersection = ""
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