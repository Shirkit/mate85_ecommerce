import { theme } from "@/utils/tailwind"
import { Star, StarHalf } from "lucide-react"


/***
 * @param {Object} param0 
 * @param {float} param0.rating 
 * @param {boolean=} param0.hideNumber 
 */
export default function RenderStars({rating, hideNumber}) {
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
            {(!hideNumber) &&
                <span className="ml-1">{rating.toFixed(1)}/ 5.0</span>
            }
        </div>
    )
}