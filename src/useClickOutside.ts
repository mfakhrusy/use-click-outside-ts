import { RefObject, useEffect } from 'react';

export default function useClickOutside<T extends HTMLElement>(
  targetRef: RefObject<T>,
  fn: () => void,
): void {
  const handleClick = (e: MouseEvent) => {
    const evTarget = e.target;

    // targetRef.current can be null when the component is unmounted, check it first
    if (targetRef.current) {
      /**
       * if the target is not the targetRef, call the function
       * however, we need to "check" whether evTarget is the instance of Node
       * why? because evTarget has an inherent type of "EventTarget"
       * and we need to check whether it satisfies "Node" object
       * since the method "contains" takes in a "Node" object as its argument
       * see this for reference: https://github.com/facebook/flow/issues/4799#issuecomment-326992974
       * We can also cast EventTarget to Node too, in this case.
       * see this stackoverflow answer: https://stackoverflow.com/a/61164277/5835100
       */
      if (!(evTarget instanceof Node && targetRef.current.contains(evTarget))) {
        fn();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });
}
