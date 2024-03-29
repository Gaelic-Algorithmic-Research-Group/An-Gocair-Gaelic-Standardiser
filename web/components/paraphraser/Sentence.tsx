import { useCallback, useState } from "react";
import {
  useFloating,
  useInteractions,
  useClick,
} from "@floating-ui/react-dom-interactions";
import HideShow from "@/components/HideShow";
import ClickAwayListener from '@mui/material/ClickAwayListener';

interface SentenceProps {
  texts: string[];
}
export default function Sentence({ texts }: SentenceProps) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const handleClickAway = useCallback(() => setOpen(false), []);
  const { context, x, y, reference, floating, strategy } = useFloating({
    open,
    onOpenChange: setOpen,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions(
    [useClick(context)]
  );
  return (
    <>
      <HideShow show={texts[0] === "\n"}>
        <span className="hover:bg-green-200">
          <br></br>
        </span>
      </HideShow>
      <span
        className="hover:bg-green-200"
        ref={reference}
        {...getReferenceProps()}
      >
        {texts[index]}{" "}
      </span>
      {open && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <div
            className="bg-yellow-100 text-sm"
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
              .map((t, i) => (
                <p
                  key={i}
                  className="hover:bg-blue-200 text-sm"
                  onClick={() => {
                    setIndex((last) => (i < last ? i : i + 1));
                    setOpen(false); // added this line to close the floating box when a sentence is selected
                  }}
                >
                  {t}
                </p>
              ))}
          </div>
        </ClickAwayListener>
      )}
    </>
  );
}
