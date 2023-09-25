import { CheckCircle2 } from "lucide-react";
import RenderStars from "./stars";
import ReadMore from "./readmore";
import "./review.css";

/***
 * @param {Object} param0 
 * @param {int} param0.index 
 * @param {int} param0.rating 0-5 
 * @param {string} param0.title 
 * @param {string} param0.author
 * @param {string} param0.text
 */
export default async function ReviewCard({ index, rating, title, author, text }) {
    return (
        <div key={index} className="p-4 gap-y-2 flex flex-col border border-zinc-200 rounded-3xl">
            <RenderStars rating={rating} hideNumber={true}></RenderStars>
            <h3>{title}</h3>
            <span className="flex flex-row gap-x-1">
                <h4>{author}</h4>
                <CheckCircle2 fill="green" stroke="white"></CheckCircle2>
            </span>
            <p className="max-h-20 overflow-hidden transition-[max-height] duration-300 review-visible">{text}</p>
            {(text.length > 220) &&
                <ReadMore></ReadMore>
            }
        </div>
    )
}