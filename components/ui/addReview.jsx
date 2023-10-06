'use client'

import { useState } from "react";
import ClickableStars from "./clickableStars";
import { processReview } from "@/app/(website)/product/reviews";
import { toast } from "react-toastify";

export default function AddReview({ productId }) {

    const FORM_NAME = "addReview"

    async function onProcessReview(formData) {
        const res = await processReview(formData)
        if (res && res.message)
            toast.error(res.message)
    }

    function FloatLabel({ name, type, label, initialValue = "" }) {
        const [isActive, setIsActive] = useState(false);
        const [value, setValue] = useState(initialValue);

        function handleTextChange(text) {
            setValue(text);

            if (text !== '') {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        }

        return (
            <div id="float-label" className={(isActive ? "is-active" : "") + " group flex flex-col relative"}>
                <input form={FORM_NAME} type={type} value={value} id={name} name={name} onChange={(e) => handleTextChange(e.target.value)}
                    className="w-full outline-0 pb-0 pt-4 pr-4 pl-2 border border-solid border-zinc-300 rounded" />

                <label className={"h-0 pointer-events-none px-3 text-zinc-500 -translate-y-8 origin-top-left transition-all ease-out group-focus-within:-translate-y-10 group-focus-within:scale-75 group-[.is-active]:-translate-y-10 group-[.is-active]:scale-75 "} htmlFor={name}>
                    {label}
                </label>
            </div>
        )
    }

    return (
        <form id={FORM_NAME} className="flex flex-col min-w-[200px] max-w-md" action={onProcessReview}>
            <ClickableStars form={FORM_NAME} name="rating"></ClickableStars>
            <FloatLabel name="title" type="text" label="Título da avaliação"></FloatLabel>
            <textarea placeholder="Descreva sua experiência" className="w-full p-2 border-zinc-300 rounded border border-solid" id="text" name="text"></textarea>
            <input type="hidden" name="productId" value={productId} ></input>
            <button type="submit">Avaliar</button>
        </form>
    )



}