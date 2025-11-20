// src/state/useFavorites.js
import { useEffect, useMemo, useState } from "react";

const KEYS = {
  courses: "FAV_COURSES",
  tutors: "FAV_TUTORS",
};

function read(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function write(key, set) {
  localStorage.setItem(key, JSON.stringify(Array.from(set)));
}

export function useFavorites(kind) {
  const storageKey = KEYS[kind]; // "courses" | "tutors"
  const [favSet, setFavSet] = useState(() => read(storageKey));

  useEffect(() => {
    // keep in sync across tabs/pages
    const onStorage = (e) => {
      if (e.key === storageKey) setFavSet(read(storageKey));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [storageKey]);

  const favIds = useMemo(() => Array.from(favSet), [favSet]);

  const isFav = (id) => favSet.has(id);

  const toggleFav = (id) => {
    setFavSet((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      write(storageKey, next);
      return next;
    });
  };

  const setMany = (ids) => {
    const next = new Set(ids || []);
    write(storageKey, next);
    setFavSet(next);
  };

  return { favIds, isFav, toggleFav, setMany };
}
