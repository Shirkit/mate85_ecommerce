import { theme } from "@/utils/tailwind"
import { Star, StarHalf } from "lucide-react"


function renderStars(rating) {
    const stars = []
    var i = rating

    while (i > 0) {
        if (i >= 1)
            stars.push(
                <Star fill={theme.colors.yellow[300]} stroke={theme.colors.yellow[400]}></Star>
            )
        else
            stars.push(
                <StarHalf fill={theme.colors.yellow[300]} stroke={theme.colors.yellow[400]} ></StarHalf>
            )
        i--
    }

    while (stars.length < 5)
        stars.push(
            <Star stroke={theme.colors.yellow[400]}></Star>
        )

    return (
        <div className="flex flex-row">
            {stars}
            <span className="ml-1">{rating.toFixed(1)} / 5</span>
        </div>
    )
}

export { renderStars }