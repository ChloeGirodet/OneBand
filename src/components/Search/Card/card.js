import { Link } from "react-router-dom";

function Card({ id, name, location, genres, instruments, img, bandName }) {
    if (name) {
        return (
            <Link to={`/profil/${id}`}>
                <div className="card-container">
                    <div className="card-profil-info ">
                        <img className="card-image-user" src={`http://lbrqt-server.eddi.cloud/projet-one-band-back/public/${img}`} alt="card-img" />
                        <div className='text-center'>{name}</div>
                        <div className="card-sub">{location}</div>
                    </div>
                    <div className="card-sub-info">
                        <div className="overflow-y-auto"> <p> Genres : </p>
                            {genres.map((genre) => {
                                return (
                                    <span className="card-sub">{genre.name} </span>
                                )
                            })}
                        </div>
                        <div className="overflow-y-auto">
                            <p>Instruments :</p>
                            {instruments.map((instrument) => {
                                return (
                                    <span className="card-sub">{instrument.name} </span>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
    if (bandName) {
        return (
            <Link to={`/band/${id}`}>
                <div className="card-container">
                    <div className="card-profil-info">
                        <img className="card-image-band" src={`http://lbrqt-server.eddi.cloud/projet-one-band-back/public/${img}`} alt="card-img" />
                        <div className="text-center">{bandName}</div>
                        <div className="card-sub">{location}</div>
                    </div>
                    <div className="card-sub-info">
                        <div> <p> Genres : </p>
                            {genres.map((genre) => {
                                return (
                                    <span className="card-sub">{genre.name} </span>
                                )
                            })}
                        </div>
                        <div>
                            <p>Instruments :</p>
                            {instruments.map((instrument) => {
                                return (
                                    <span className="card-sub">{instrument.name} </span>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}

export default Card;