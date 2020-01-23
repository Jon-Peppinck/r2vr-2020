#' Get data from database with API GET request
#'
#' @param url url for database
#'
#' @return
#' @export
read <- function(url){
  # Deserialize the payload so data can be read and converted from JSON to data frame
  data.df <<- jsonlite::fromJSON(httr::content(httr::GET(url), "text"), flatten = TRUE)
  
  return(data.df)
  
}