import '../assets/style/Fin.scss';

interface Props {
  estatus: number;
}

const Fin = ({ estatus }: Props) => {
  return (
    <>
      {estatus === 3 && (
        <section className="fin animate__animated animate__zoomIn">
          <p>La rifa ha finalizado, felicidades a todos los ganadores</p>
        </section>
      )}
    </>
  );
};

export default Fin;
