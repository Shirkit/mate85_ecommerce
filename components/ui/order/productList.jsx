import Image from 'next/image'

const ProductList = ({ product, imageSrc, quantity }) => {
    return (
        <div className="flex flex-col">
            <div
                className="flex items-center justify-between p-4 border-b"
            >
                <Image
                    src={imageSrc}
                    width={100}
                    height={100}
                    alt={product.name}
                />

                <div className="text-lg font-semibold">{product.name}</div>

                <div className="flex flex-col items-end">
                    <div className="text-green-600">R$ {product.price.toFixed(2)}</div>
                    <div className="text-gray-500">Quantidade: {quantity}</div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;