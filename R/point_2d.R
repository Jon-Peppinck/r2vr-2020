Point2d <- R6::R6Class("Point2d",
  public = list(
    n = NA,
    x = NA,
    y = NA,
    
    initialize = function(n, x, y) {
      stopifnot(is.numeric(n))
      stopifnot(is.numeric(x) || is.numeric(y))

      self$x <- x
      self$y <- y
      self$n <- n
    }
  )
)