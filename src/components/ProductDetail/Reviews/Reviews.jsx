import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadReviews, createReview } from '../../../Redux/actions/actions_review';
import { getUserIdFromToken } from '../../../Redux/actions/actions_auth';

const Review = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review.reviews);
  const loading = useSelector((state) => state.review.loading);
  const userId = getUserIdFromToken();

  useEffect(() => {
    dispatch(loadReviews(id));
  }, [dispatch, id]);

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);

  const handleCreateReview = () => {
    const token = localStorage.getItem('accessToken');

    if (token && userId) {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const reviewData = {
        userId,
        comment,
        rating,
      };

      dispatch(createReview(id, comment, rating, userId, headers));
      setComment('');
      setRating(1);
    }
  };

  return (
    <div className="product-reviews">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <h3>Reseñas de los usuarios:</h3>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <p>Comentario: {review.comment}</p>
                <p>Calificación: {review.rating}</p>
                {/* Opciones de editar y eliminar a futuro*/}
              </li>
            ))}
          </ul>
          <h3>Deja tu reseña:</h3>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribe tu comentario..."
          ></textarea>
          <label>Calificación:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <button onClick={handleCreateReview}>Publicar reseña</button>
        </div>
      )}
    </div>
  );
};

export default Review;
