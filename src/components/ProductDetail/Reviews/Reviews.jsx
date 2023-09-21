import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadReviews, createReview } from '../../../Redux/actions/actions_review';
import { getUserIdFromToken } from '../../../Redux/actions/actions_auth';
import { handleActiveReview } from '../../../Redux/actions/actions_softDelete'; // Importa la función handleActiveReview desde tu archivo

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
    if (userId) {
      dispatch(createReview(id, comment, rating, userId)); 
      setComment('');
      setRating(1);
      
      // Refrescar la página después de crear la reseña
      window.location.reload();
    }
  };

  const toggleReviewStatus = (reviewId, isActive) => {
    // Llama a tu función para cambiar el estado de la reseña
    handleActiveReview(reviewId, isActive)
      .then(() => {
        // Actualiza la lista de reseñas después de cambiar el estado
        dispatch(loadReviews(id));
      })
      .catch((error) => {
        console.error('Error al cambiar el estado de la reseña:', error);
      });
  };

  return (
    <div className="product-reviews">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <h3>Reseñas de los usuarios:</h3>
          <ul>

            {reviews
              .filter((review) => review.active) // Filtrar reseñas activas
              .map((review) => (
                <li key={review.id}>
                  <p>Comentario: {review.comment}</p>
                  <p>Calificación: {review.rating}</p>
                  {userId && (
                    <div>
                      <button onClick={() => toggleReviewStatus(review.id, !review.active)}>
                        {review.active ? 'Desactivar' : 'Activar'}
                      </button>
                    </div>
                  )}
                </li>
              ))}

            {reviews.map((review) => (
              <li key={review.id}>
                <p>Comentario: {review.comment}</p>
                <p>Calificación: {review.rating}</p>
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