% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/go_to.R
\name{go_to}
\alias{go_to}
\title{Go to either the next image or navigate to a selected image by index}
\usage{
go_to(index = NA, image_paths = selected_image_paths_and_points)
}
\arguments{
\item{index}{Optional Integer to indicate which image to navigate to}

\item{image_paths}{List of Lists containing the img and the points for the annotation markers}
}
\description{
Go to either the next image or navigate to a selected image by index
}
\examples{
\donttest{
go_to()
go_to(1)
go_to(2)
go_to(3)
}

}
