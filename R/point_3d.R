Point3d <- R6::R6Class("Point3d",
  inherit = Point2d,
  public = list(
    z = NA,
    
    initialize = function(n, x, y, z) {
      super$initialize(n, x, y)
      
      stopifnot(is.numeric(z))
      
      self$z <- z
    }
  )
)