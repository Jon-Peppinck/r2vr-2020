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
  list(img = img_paths[1]),
  list(img = img_paths[2]),
  list(img = img_paths[3]),
  list(img = img_paths[4]),
  list(img = img_paths[5])
)

set_random_images(img_paths_and_points) # TODO: allow for img_paths w/o points (training)

## TODO: SET evaluation question and responses here
evaluation_questions <- list(
  list(question = "Did you enjoy this experiment?", answerOne = "Very much", answerTwo = "Yes", answerThree = "A little", answerFour = "No"),
  list(question = "On a scale of 1-4, how would you rate your experience?", answerOne = "1", answerTwo = "2", answerThree = "3", answerFour = "4")
)

## OPTIONAL: '?set_questions_and_responses'
set_questions_and_responses()