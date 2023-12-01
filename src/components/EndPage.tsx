import { useEffect, useRef } from 'react';
import { useTombolaStore } from '../store/tombola';

interface Props {
  show: boolean;
}

const EndPage = ({ show }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const nuevo_ganador = useTombolaStore((state) => state.nuevo_ganador);

  useEffect(() => {
    if (bottomRef.current && nuevo_ganador !== 0) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [nuevo_ganador]);

  const scrollDown = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  return (
    <>
      {show && (
        <button
          className="scroll-down animate__animated animate__bounce animate__infinite animate__slow"
          onClick={() => scrollDown()}
        >
          <i className="fa fa-arrow-down"></i>
        </button>
      )}
      <div ref={bottomRef} id="ref_to_down">
        .
      </div>
    </>
  );
};

export default EndPage;
