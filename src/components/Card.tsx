// import avatar from '../../public/defaul-avatar.png';

interface Props {
  nombre: string;
  departamento: string;
  regalo: number;
  tombola: boolean;
  idr: string;
}

const Card = ({ nombre, departamento, regalo, tombola, idr }: Props) => {
  return (
    <>
      <div className="card card-navidad">
        <div className="card-body">
          <img
            className="avatar"
            src={`https://www.tsmconnect.com/empleados_tsmconnect/${idr}.jpg`}
            alt="avatar"
            width="100%"
          ></img>
          <h5 className="card-title">{nombre.toUpperCase()}</h5>
          {!tombola && (
            <p className="card-text">
              {departamento} <br /> Regalo: {regalo}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
