library(r2vr)
library(RMySQL)
library(dbConnect)
library(httr)
library(jsonlite)

## Connect IP
IPv4_ADDRESS <- find_IP() 

## Set observer here
user <- "Jon"

## Change Number of points here
number_of_points <- 5

## Set marker radius
inner_radius = 0.08
outer_radius = inner_radius + 0.02

# ## Choose image (jpg) without extension here
# image_id_path <- "12026189701" # "tall-image" "wide-image" "large-image" "very-large-image"
# 
# # Selects file path. Note: extension can be changed if not jpg
# image_path_2d <- paste("./data/2D_images/", image_id_path, ".jpg", sep = "")
r2vr_pkg <- "https://cdn.jsdelivr.net/gh/milesmcbain/r2vr@master/inst"

# img_paths <- paste(r2vr_pkg,
#                    c("/ext/images/reef/100030039.jpg", 
#                      "/ext/images/reef/120261897.jpg", 
#                      "/ext/images/reef/130030287.jpg",
#                      "/ext/images/reef/130050093.jpg"),
#                    sep = "")

img_paths <- c(
                    "./2dimages/10003003901.jpg", 
                     "./2dimages/12026189701.jpg", 
                     "./2dimages/13003028701.jpg",
                     "./2dimages/130005009301.jpg"
)

# Create asset for image
# image_2d <- a_asset(
#   .tag = "image",
#   id = "reef2d",
#   src = image_path_2d
# )

for (i in 1:length(img_paths)) {
  image_number <- paste("image", i, sep = "")
  
  current_image <- a_asset(.tag = "image",
                           id = paste("img", i, sep = ""),
                           src = img_paths[i])
  
  assign(image_number, current_image)
}

# z-index positions 
canvas_z = -3
marker_z = -1
camera_z = 0

# Create a canvas for the image to be attached to
canvas_2d <- a_entity(
  .tag = "plane",
  .js_sources = list("./inst/js/coral_cover_2D.js"), # TODO: change to CDN
  .assets = list(image2, image3, image4),
  id = "canvas2d",
  src = image1,
  class = img_paths[1],
  height = 3,
  width = 3,
  position = c(0, 0, canvas_z)
)

# Create a cursor
cursor <- a_entity(
  .tag = "cursor",
  color = "#ff0000"
  # id = "fileID",
  # class = animal_class
)

# Position cursor in center of camera
camera <- a_entity(
  .tag = "camera",
  .children = list(cursor),
  position = c(0, 0, camera_z)
)

# Invisble entity to store user/observer in ID for client side JS
user <- a_entity(
  .tag = "circle",
  id = "user",
  class = user,
  opacity = 0,
  radius = 0
)

# Initial entities
list_of_children_entities <- list(canvas_2d, camera, user)
initial_list_length <- length(list_of_children_entities)
# Arbitrarily small value
epsilon = 0.00001
delta = 100*epsilon

# Generate markers
for (i in 1:number_of_points) {
  # Generation of points - distribution => Uniform (random)
  # Note: Canvas: -0.5 < x < 0.5, -0.5 < y < 0.5
  random_coordinate_x <- runif(1, -0.5 + outer_radius, 0.5 - outer_radius)
  random_coordinate_y <- runif(1, -0.5 + outer_radius, 0.5 - outer_radius) 
  
  # Invisible inner circle for client side events based on ID
  marker_inside <- a_entity(
    .tag = "circle",
    id= paste("marker", i, sep = ""),
    class = "marker",
    position = c(random_coordinate_x, random_coordinate_y, -1),
    color = "#ffffff",
    opacity = 0,
    radius = outer_radius
  )
  # Label for coral             
  coral_label <- a_label(
    text = "C",
    color = "#000000",
    font = "mozillavr",
    height = 0.5,
    width = 2,
    position = c(-0.15, 0.2, 0)
  )
  # Coral menu option
  menu_coral <- a_entity(
    .tag = "ring",
    .children = list(coral_label),
    id= paste("menuCoral", i, sep = ""),
    visible = FALSE,
    class = "menu-item",
    position = c(random_coordinate_x, random_coordinate_y, marker_z + delta),
    color = "#FF95BC",
    radius_inner = outer_radius,
    radius_outer = outer_radius + 0.2,
    theta_length = 90,
    theta_start = 90
  )
  # Label for not coral   
  not_coral_label <- a_label(
    text = "N",
    color = "#000000",
    font = "mozillavr",
    height = 0.5,
    width = 2,
    position = c(0.15, 0.2, 0)
  )
  # Not coral menu option
  menu_not_coral <- a_entity(
    .tag = "ring",
    .children = list(not_coral_label),
    id = paste("menuNotCoral", i, sep = ""),
    visible = FALSE,
    class = "menu-item",
    position = c(random_coordinate_x, random_coordinate_y, marker_z + delta),
    color = "#969696",
    radius_inner = outer_radius,
    radius_outer = outer_radius + 0.2,
    theta_length = 90
  )
  
  # Marker ring for annotation via selecting option
  marker_circumference <- a_entity(
    .tag = "ring",
    class = "marker-circumference",
    # = list(marker_inside, menu_coral, menu_not_coral),
    position = c(random_coordinate_x, random_coordinate_y, marker_z),
    color = "#ffffff",
    radius_inner = inner_radius,
    radius_outer = outer_radius
  )
  
  # Marker container to nest marker and menu options inside for apt z-indexing
  marker_container <- a_entity(
    .tag = "ring",
    class = "marker-container",
    .children = list(marker_circumference, marker_inside, menu_coral, menu_not_coral),
    position = c(random_coordinate_x, random_coordinate_y, marker_z),
    color = "#000000",
    opacity = 0,
    radius_inner = epsilon,
    radius_outer = epsilon,
  )
  
  # Add markers to the list of entities to be rendered
  marker_i <- paste("marker", i, sep = "")
  list_of_children_entities[[initial_list_length + i]] <- assign(marker_i, marker_container)
}

# Add difficulty label
estimated_cc_label <- a_label(
  id = "difficultyLabel",
  text = paste("Difficulty to classify: TBA"),
  color = "#000000",
  font = "mozillavr",
  height = 2,
  width = 4,
  position = c(1.3, 0.7, -1)
)
# Add difficulty label circle
list_of_children_entities[[length(list_of_children_entities) + 1]]  <- a_entity(
  .tag = "circle",
  .children = list(estimated_cc_label),
  id = "resetPage",
  position = c(-0.9, 1.25, -2),
  color = "#000000",
  radius = 0.1,
  opacity = 1
)

# Add deselect markers label
deselect_markers_label <- a_label(
  id = "deselectMarkersLabel",
  text = "Deselect markers",
  color = "#000000",
  font = "mozillavr",
  height = 2,
  width = 4,
  position = c(1.72, -0.52, -1)
)
# Deselect Button
list_of_children_entities[[length(list_of_children_entities) + 1]]  <- a_entity(
  .tag = "circle",
  id = "deselectMarkers",
  .children = list(deselect_markers_label),
  position = c(-0.9, -1.2, -2),
  color = "red",
  radius = 0.1,
  opacity = 1
)

# Add reset page label
reset_page_label <- a_label(
  id = "resetPageLabel",
  text = "Annotate again",
  color = "#000000",
  font = "mozillavr",
  height = 2,
  width = 4,
  position = c(1.8, -0.67, -1)
)

# Reset Button
# TODO: rename id from other element from resetPage to something apt
list_of_children_entities[[length(list_of_children_entities) + 1]]  <- a_entity(
  .tag = "circle",
  id = "reset",
  .children = list(reset_page_label),
  position = c(-0.9, -1.5, -2),
  color = "red",
  radius = 0.1,
  opacity = 1
)

# Render entities into scene
animals <- a_scene(
  .children = list_of_children_entities,
  .websocket = TRUE,
  .websocket_host = IPv4_ADDRESS,
  .template = "empty"
)

#####

start(IPv4_ADDRESS)

# go(image_paths = img_paths, index = 1)
# go(image_paths = img_paths, index = 2)
# go(image_paths = img_paths, index = 3)
# go(image_paths = img_paths, index = 4)

go2 <- function(image_paths, index = NA){
  
  white <- "#ffffff"
  
  # Current image number
  if(is.na(index)) { CONTEXT_INDEX <- 1 }
  if(!is.na(index)){ CONTEXT_INDEX <- index }
  
  animal_contexts <- paste("img", seq(1,length(image_paths),1), sep="")
  
  # TODO: Refactor as an argument?
  context_rotations <- list(list(x = 0, y = 0, z = 0),
                            list(x = 0, y = 0, z = 0),
                            list(x = 0, y = 0, z = 0),
                            list(x = 0, y = 0, z = 0))
  
  if(is.na(index)) {
    CONTEXT_INDEX <<- ifelse(CONTEXT_INDEX > length(animal_contexts) - 1,
                             yes = 1,
                             no = CONTEXT_INDEX + 1)
  }
  
  next_image <- animal_contexts[[CONTEXT_INDEX]]
  print(next_image)
  
  
    setup_scene <- list(
      a_update(id = "canvas2d",
               component = "material",
               attributes = list(src = paste0("#",next_image))),
      a_update(id = "canvas2d",
               component = "src",
               attributes = paste0("#",next_image)),
      a_update(id = "canvas2d",
               component = "rotation",
               attributes = context_rotations[[CONTEXT_INDEX]]),
      a_update(id = "canvas2d",
               component = "class",
               attributes = img_paths[CONTEXT_INDEX])
    )
  
  for(jj in 1:length(setup_scene)){
    if(setup_scene[[jj]]$id == "canvas2d"){
      if(setup_scene[[jj]]$component == "material"){
        setup_scene[[jj]]$attributes <- list(src = paste0("#",next_image))
      }
      if(setup_scene[[jj]]$component == "src"){
        setup_scene[[jj]]$attributes <- paste0("#",next_image)
      }
      if(setup_scene[[jj]]$component == "rotation"){
        setup_scene[[jj]]$attributes <- context_rotations[[CONTEXT_INDEX]]
      }
      if(setup_scene[[jj]]$component == "class"){
        setup_scene[[jj]]$attributes <- image_paths[CONTEXT_INDEX]
      }
    }
  }
  
  # TODO: Consider passing this in as an argument as binary and multiple selections differ
  animals$send_messages(setup_scene)
} 

#####

# # Start the server
# start <- function(){
#   # get_db()
#   classify$serve(host = LOCAL_IP)
# }
# 
# # End the server
# end <- function(){
#   a_kill_all_scenes()
# }

# # Restart the server with file changes
# restart <- function(){
#   a_kill_all_scenes()
#   get_db()
#   source('C:/r2vr/r2vr/RDevDemos/2d_image.R', echo=TRUE)
#   classify$serve(host = LOCAL_IP)
# }
# 
# # Connect and retrieve infomation from database
# get_db <- function(){
#   # Connection details
# 
#   # Connect to MySQL database table
#   mysql = dbConnect(
#                     MySQL(), user = db_user, password = db_password,
#                     dbname = db_name, host = db_host
#                     )
#   # SQL query
#   query <- "SELECT * FROM annotated_image"
#   
#   # Store response in variable
#   dataBack <- dbGetQuery(mysql, query) 
#   # Write response to csv file
#   write.csv(dataBack,'data/annotated_images.csv')
#   
#   ### CREATE DATAFRAMES FROM DB
#   ## annotated_images, estimated_coral_cover, gold_standard, compare_coral_cover, image_difficulty
#   # NOTE: Assumed working directory "C:/r2vr/r2vr/RDevDemos"
#   source(paste(getwd(), '/data/db_data_to_files.R', sep=""))
# }