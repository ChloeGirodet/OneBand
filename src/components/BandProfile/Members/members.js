import { Link } from 'react-router-dom';

const Members = ({ bandsMembers }) => (

  <div className="friend-list p-5 grid grid-cols-3">
    {bandsMembers.length > 0 && bandsMembers.map((member, index) => {
      return (
        <div key={index}>
          {member.map((username, imageName, index) => {
            return (
              <Link to={`/profil/${username.id}`}>
                <div className="mb-2" key={index}>
                  <img className="profil-relation-image border-4 border-amber-400 hover:rotate-12 duration-150"
                    src={`http://lbrqt-server.eddi.cloud/projet-one-band-back/public/${username.imageName}`} alt="band-members" title={username.username}></img>
                  <p className="text-sm m-2 truncate">{username.username}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )
    })}
  </div>
);

export default Members;