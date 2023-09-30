'use client'

import { useState } from "react"

export default function ReadMore() {
    const [toggle, setToggle] = useState(false)

    function Toggle() {
        setToggle(!toggle)
    }

    return (
        <a className="cursor-pointer underline" onClick={(e, b) => {
            const p = e.target.parentElement.querySelector("p")
            
            if (!toggle) {
                if (window.expandedPReview) {
                    window.expandedPReview.style.maxHeight = null
                    window.expandedPReviewT(false)
                    window.expandedPReview.classList.toggle("review-visible")
                }
                p.style.maxHeight = p.scrollHeight + "px"
                p.classList.toggle("review-visible")
                window.expandedPReview = p
                window.expandedPReviewT = setToggle
            }
            else {
                p.classList.toggle("review-visible")
                p.style.maxHeight = null
                window.expandedPReview = null
            }
            setToggle(!toggle)

        }}>{!toggle? "Leia mais" : "Recolher"}</a>
    )
}