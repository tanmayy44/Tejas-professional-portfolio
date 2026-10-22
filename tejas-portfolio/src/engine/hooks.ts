import { useEffect, useRef } from "react";
import { director, type SceneState } from "./director";

export function useScene(id: string, callback: (state: SceneState, y: number) => void) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  useEffect(() => { const unsub = director.subscribe((states, y) => {
    const state = states.find(s => s.id === id);
    if (state) callbackRef.current(state, y); }); return () => { unsub(); }; }, [id]);
}