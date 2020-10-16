library(r2vr)

IPv4_ADDRESS <- find_IP() # Note: If not on Windows, enter IP directly

## TODO: SET full name here
# set_user("Firstname-Lastname") # default to be overridden
set_user("Jon-Peppinck")

## OPTIONAL: '?set_marker_and_props' shows configuration options
# i.e. Number of markers and size of markers, but keep "2d"
set_marker_and_props("2d") 

## OPTIONAL: '?set_colors'
set_colors()

## TODO: SET the 'Gold Standard points' for the corresponding 'img_paths' (set below)
# Note: images are 4000x3000 (px) i.e. 0 <= x <= 4000, 0 <= y <= 3000
img1Points = list(
  list(id = 1, x = 3203, y = 173, isCoral = 0), ## sand (TODO)
  list(id = 2, x = 1726, y = 356, isCoral = 0),
  list(id = 3, x = 2291, y = 1086, isCoral = 0)
)

img2Points = list(
  list(id = 1, x = 1000, y = 1000, isCoral = 0),
  list(id = 2, x = 2000, y = 2000, isCoral = 0)
)

img3Points = list(
  list(id = 1, x = 0, y = 0, isCoral = 0),
  list(id = 2, x = 4000, y = 3000, isCoral = 0)
)

img4Points = list(
  list(id = 1, x = 0, y = 0, isCoral = 0),
  list(id = 2, x = 4000, y = 3000, isCoral = 0)
)

img5Points = list(
  list(id = 1, x = 0, y = 0, isCoral = 0),
  list(id = 2, x = 4000, y = 3000, isCoral = 0)
)

R2VR_CDN <- "https://cdn.jsdelivr.net/gh/ACEMS/r2vr@experiment" # NOTE: Subject to change

R2VR_2D_IMAGES <- paste0(R2VR_CDN, "/inst/ext/images/2d/")

# TODO: Select images (4000x3000px)
img_paths <- paste0(
  R2VR_2D_IMAGES,
  c("49001074001.jpeg",
    "49002256001.jpeg",
    "51010026001.jpeg",
    "49004035001.jpeg",
    "50003181001.jpeg")
)

img_paths_and_points <- list(
  # 2D image paths  4000x3000
  list(img = img_paths[1], img_points = img1Points),
  list(img = img_paths[2], img_points = img2Points),
  list(img = img_paths[3], img_points = img3Points),
  list(img = img_paths[4], img_points = img4Points),
  list(img = img_paths[5], img_points = img5Points)
)

set_random_images(img_paths_and_points)

shared_setup_scene("2d", "training") # DON'T CHANGE
