import { useEffect, useRef } from "react";

export function Odometer({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.textContent = value;
  }, [value]);
  return <span className="odometer" ref={ref}>{value}{suffix}</span>;
}