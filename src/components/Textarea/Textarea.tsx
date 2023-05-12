import React, { useMemo, useRef } from 'react';
import './Textarea.scss';

type TextareaProps = {
  value: string;
  numOfLines: number;
  onValueChange: (value: string) => void;
  placeholder: string;
  name?: string;
};

export const Textarea = ({
  value,
  numOfLines,
  onValueChange,
  placeholder,
  name,
}: TextareaProps) => {
  const lineCount = useMemo(() => value.split('\n').length, [value]);
  const linesArr = useMemo(
    () => Array.from({ length: Math.max(numOfLines, lineCount) }, (_, i) => i + 1),
    [lineCount, numOfLines]
  );

  const lineCounterRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onValueChange) {
      onValueChange(event.target.value);
    }
  };

  const handleTextareaScroll = () => {
    if (lineCounterRef.current && textareaRef.current) {
      lineCounterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <div className="textarea-wrapper">
      <div className="numbers" ref={lineCounterRef}>
        {linesArr.map((count) => (
          <div className="number" key={count}>
            {count}
          </div>
        ))}
      </div>
      <textarea
        className="textarea"
        name={name}
        onChange={handleTextareaChange}
        onScroll={handleTextareaScroll}
        placeholder={placeholder}
        ref={textareaRef}
        value={value}
        wrap="off"
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
};
