import { Link } from 'react-router-dom';

const Friends = ({ userBands }) => (
  <>
    {userBands.length > 0 && userBands.map((name, imageName, id) => {
      return (
        <Link to={`/band/${name.id}`}>
          <div className="text-center truncate text-emerald-400" key={name.id}>
            <img className="profil-relation-image border-4 border-emerald-400 hover:rotate-12 duration-150"
              src={`http://lbrqt-server.eddi.cloud/projet-one-band-back/public/${name.imageName}`} alt="band-members" title={name.name}></img>
            <p className="text-sm m-2">{name.name}</p>
          </div>
        </Link>
      );
    })
    }
  </>
);

export default Friends;