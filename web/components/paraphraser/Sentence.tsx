import { useCallback, useState } from "react"
import {useFloating, useInteractions , useClick} from '@floating-ui/react-dom-interactions';

interface SentenceProps {
    texts: string[]
}
export default function Sentence ({texts}: SentenceProps) {
    const [index, setIndex] = useState(0)
    const [open, setOpen] = useState(false);
    const {context, x, y, reference, floating, strategy} = useFloating({
        open,
        onOpenChange: setOpen,
    });

    const {getReferenceProps, getFloatingProps, getItemProps} =
        useInteractions([
            useClick(context),
    ]);
    return <>
    <span className="hover:bg-green-200" ref={reference} {...getReferenceProps()}>{texts[index]} </span>
    {open && <div
        className="bg-yellow-100"
        ref={floating}
        style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
        }}
        {...getFloatingProps()}
    >
        {texts
            .filter((_, i) => i !== index)
            .map((t, i) => <p
                key={i}
                className="hover:bg-blue-200"
                onClick={() => {
                    setIndex((last) => i < last ? i : i + 1);
                }}
            >{t}</p>)}
    </div>}
    </>
}