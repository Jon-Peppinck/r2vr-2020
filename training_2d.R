library(r2vr)

IPv4_ADDRESS <- find_IP() # Note: If not on Windows, enter IP directly

# set_user("Firstname-Lastname") # default to be overridden
set_user("EXP-H")

## OPTIONAL: '?set_marker_and_props' shows configuration options
# i.e. Number of markers and size of markers, but keep "2d"
# e.g. set_marker_and_props("2d", 15, "small") 
# set_marker_and_props("2d")
set_marker_and_props("2d", 10, "small")


## OPTIONAL: '?set_colors'
# e.g. set_colors(coral = "#FFFF00", not_coral = "#FF00FF", evaluation_selection = "#0000FF")
set_colors()
# set_colors(coral = "#FFFF00", not_coral = "#FF00FF", evaluation_selection = "#0000FF")

## Note: images are 4000x3000 (px) i.e. 0 <= x <= 4000, 0 <= y <= 3000
# Where (0, 0) is top left corner, (4000, 3000) is bottom right corner
# 49001074001.jpeg
img1Points = list(
  list(id = 1, x = 3203, y = 173, isCoral = 0), # Not Coral - sand
  list(id = 2, x = 2335, y = 2755, isCoral = 0), # Not Coral - sand
  list(id = 3, x = 2291, y = 1086, isCoral = 0), # Not Coral - sand
  list(id = 4, x = 1013, y = 399 , isCoral = 1), # Coral - Hard corals
  list(id = 5, x = 1704, y = 570, isCoral = 1), # Coral - Hard corals
  list(id = 6, x = 2466, y = 1274, isCoral = 1), # Coral - Hard corals
  list(id = 7, x = 3768, y = 1413, isCoral = 1), # Coral - Hard corals
  list(id = 8, x =  1376, y = 1458, isCoral = 1), # Coral - Hard corals
  list(id = 9, x = 524, y = 1635, isCoral = 1), # Coral - Hard corals
  list(id = 10, x = 1448, y = 2156, isCoral = 1) # Coral - Hard corals
)
# 49002256001.jpeg
img2Points = list(
  list(id = 1, x = 3498, y = 354, isCoral = 0), # Not Coral - Algae
  list(id = 2, x = 234, y = 864, isCoral = 0), # Not Coral - Algae
  list(id = 3, x = 1132, y = 2709, isCoral = 0), # Not Coral - sand
  list(id = 4, x = 2386, y = 299, isCoral = 0), # Not Coral - sand
  list(id = 5, x = 1302, y = 442, isCoral = 0), # Not Coral - sand
  list(id = 6, x = 2773, y = 472, isCoral = 0), # Not Coral - sand
  list(id = 7, x = 318, y = 2503, isCoral = 0), # Not Coral - sand
  list(id = 8, x = 3722, y = 683, isCoral = 0), # Not Coral - sand
  list(id = 9, x = 1501, y = 1346, isCoral = 0), # Not Coral - sand
  list(id = 10, x = 3673, y = 2605, isCoral = 1) # Coral - Hard corals
)
# 51010026001.jpeg
img3Points = list(
  list(id = 1, x = 330, y = 2847, isCoral = 0), # Not Coral - Algae
  list(id = 2, x = 702, y = 1144, isCoral = 0), # Not Coral - Algae
  list(id = 3, x = 3737, y = 2312, isCoral = 0), # Not Coral - Algae
  list(id = 4, x = 2628, y = 343, isCoral = 0), # Not Coral - sand
  list(id = 5, x = 2043, y = 557, isCoral = 0), # Not Coral - sand
  list(id = 6, x = 3510, y = 966, isCoral = 0), # Not Coral - sand
  list(id = 7, x = 1413, y = 2503, isCoral = 0), # Not Coral - sand
  list(id = 8, x = 1541, y = 186, isCoral = 0), # Not Coral - sand
  list(id = 9, x = 2030, y = 2521, isCoral = 0), # Not Coral - sand
  list(id = 10, x = 3363, y = 2745, isCoral = 1) # Coral - Hard corals
)

R2VR_CDN <- "https://cdn.jsdelivr.net/gh/ACEMS/r2vr@master"

R2VR_2D_IMAGES <- paste0(R2VR_CDN, "/inst/ext/images/2d_training/")

# NOTE: If have other local images on PC can change img_paths to be a vector of relative file location for the current working directory
img_paths <- paste0(
  R2VR_2D_IMAGES,
  c("49001074001.jpeg",
    "49002256001.jpeg",
    "51010026001.jpeg")
)

img_paths_and_points <- list(
  # 2D image paths  4000x3000
  list(img = img_paths[1], img_points = img1Points),
  list(img = img_paths[2], img_points = img2Points),
  list(img = img_paths[3], img_points = img3Points)
)

set_random_images(img_paths_and_points)

animals <- shared_setup_scene("2d", "training") # DON'T CHANGE


# vignette("training_2d", package = "r2vr")

## COMMANDS - 2D TRAINING ##

# start()
# fixed_markers()
# go_to()
# go_to()
# check(1)
# check(2)
# check(3)
# end()
# training_2d.df <- read("https://r2vr.herokuapp.com/api/2d/training")
# rm(list=ls())