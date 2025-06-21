import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function ProductRating({ rating }) {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(<FaStar key={i} className="text-yellow-500" />);
        } else if (rating >= i - 0.5) {
            stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
        } else {
            stars.push(<FaRegStar key={i} className="text-yellow-500" />);
        }
    }

    return <div className="flex gap-1 text-sm text-gray-400">{stars}</div>;
}

export default ProductRating