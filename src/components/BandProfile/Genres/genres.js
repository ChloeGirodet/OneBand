import PropTypes from 'prop-types';

const Genres = ({ genres }) => (

  <div className="grid grid-cols-2 w-full m-auto gap-2 pt-5 big-phone:w-1/2 tablet:grid-cols-3 laptop:w-full laptop:grid-cols-2 big-desktop:grid-cols-3">
    {genres ? genres.map((genre) => (
      <h2 key={genre.name} className="text-slate-200 text-xs p-2 border border-amber-300 rounded-md">{genre.name}</h2>
    ))
      : null
    }
  </div>
);

Genres.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  )
};

export default Genres;