const AddOnCart = ({ cart }) => {
    return (
        <>
            <h1 className="text-3xl text-white font-bold">Itens no carrinho</h1>
            {cart.length === 0 ? (
                <p className="my-70 font-extrabold text-4xl">Seu carrinho está vazio.</p>
            ) : (
                <div>
                    {cart.map((burger) => (
                        <div key={burger.id}>
                            <h2>{burger.name}</h2>
                            <p>{burger.price}</p>
                            <p>Quantidade: 1</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default AddOnCart