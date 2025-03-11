import type React from "react"

export const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault()

  // If it's an anchor link
  if (href.startsWith("#")) {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  } else {
    // For page navigation
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
}

