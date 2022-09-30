import Card from "../Card/card"

function CardList({ dataUser, dataBand }) {
    return (
        <div className="card-list-container">
            {
                dataUser.map((item) => {
                    return (
                        <Card key={item.id} id={item.id} name={item.username} location={item.location} img={item.imageName} genres={item.genres} instruments={item.instruments} />
                    )
                }
                )
            }
            {
                dataBand.map((item) => {
                    return (
                        <Card key={item.id} id={item.id} bandName={item.name} location={item.location} img={item.imageName} genres={item.genres} instruments={item.instruments} />
                    )
                })
            }
        </div>
    );
}

export default CardList;