import { useEffect, useRef, useState } from "react";

export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  // tanpa IntersectionObserver (mis. di jsdom) konten langsung ditampilkan
  const [inView, setInView] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return { ref, inView };
}
