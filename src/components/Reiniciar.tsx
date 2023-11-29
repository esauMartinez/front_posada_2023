import '../assets/style/Tombola.scss';
import { useTombolaStore } from '../store/tombola';

const Reiniciar = () => {
  const reiniciarTodo = useTombolaStore((state) => state.reiniciarTodo);
  return (
    <>
      <div className="card mt-5 mb-5">
        <div className="card-body">
          <h5 className="card-title mb-3">Reiniciar rifa</h5>
          <div className="d-flex justify-content-center">
            <button className="btn-reset" onClick={() => reiniciarTodo()}>
              <i className="fa-solid fa-rotate-left"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reiniciar;
