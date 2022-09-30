import PropTypes from 'prop-types';

const Instruments = ({ instruments }) => (

  <div className="grid grid-cols-2 w-full m-auto gap-2 pt-5 big-phone:w-1/2 tablet:grid-cols-3 laptop:w-full laptop:grid-cols-2 big-desktop:grid-cols-3">
    {instruments ? instruments.map((instrument) => (
      <h2 key={instrument.name} className="text-slate-200 p-2 border border-amber-300 rounded-md text-xs">{instrument.name}</h2>
    ))
      : null
    }
  </div>
);

Instruments.propTypes = {
  instruments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  )
};

export default Instruments;