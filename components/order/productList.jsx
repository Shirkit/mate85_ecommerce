import Image from 'next/image'

const ProductList = ({ name, size = '', price, imageSrc, quantity }) => {
    return (
        <div className="flex flex-col">
            <div
                className="flex items-center justify-between p-4 border-b"
            >
                <Image
                    src={imageSrc}
                    width={100}
                    height={100}
                    alt={name}
                />

                <div className='flex flex-col items-center'>
                    <div className="text-lg font-semibold">{name}</div>
                    <div className="text-gray-500">Tamanho: {size}</div>
                </div>

                <div className="flex flex-col items-end">
                    <div className="text-green-600">R$ {price.toFixed(2)}</div>
                    <div className="text-gray-500">Quantidade: {quantity}</div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;