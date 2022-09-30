import { Link } from 'react-router-dom';

const Friends = ({ userFriends }) => (
  <>
    {userFriends.length > 0 && userFriends.map((username, imageName, id) => {
      return (
        <Link to={`/profil/${username.id}`}>
          <div className="text-center truncate h-30" key={username.id}>
            <img className="profil-relation-image border-4 border-amber-400 hover:rotate-12 duration-150"
              src={`http://lbrqt-server.eddi.cloud/projet-one-band-back/public/${username.imageName}`} alt="band-members" title={username.username}></img>
            <p className="text-sm m-2">{username.username}</p>
          </div>
        </Link>
      );
    })
    }
  </>
);

export default Friends;