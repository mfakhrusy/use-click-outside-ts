import { useRef, useState } from 'react';
import useClickOutside from './useClickOutside';
import './App.css'

function App(): JSX.Element {
  const [text, setText] = useState('Hello World');

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside<HTMLDivElement>(ref, () => {
    setText('Click Outside');
  });

  return (
    <main>
      <div
        ref={ref}
        onClick={() => setText('Click Inside')}
      >
        {text}
      </div>
    </main>
  )
}

export default App
