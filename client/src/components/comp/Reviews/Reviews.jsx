import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from'yup';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews, addReview, updateReview, deleteReview } from '../../reducers/reviewsSlice';

function Reviews({bathroomId}) {
  const dispatch = useDispatch();
  const allReviews = useSelector((state) => state.reviews);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    dispatch(fetchReviews(bathroomId))
  }, [dispatch, bathroomId]);

  const reviewsForBathroom = allReviews.filter(review => review.bathroom_id === Number(bathroomId));

  const formSchema = yup.object().shape({
    reviewContent: yup.string().required('Review content is required')
  });

  const handleAddReview = (values, {resetForm}) => {
    const newReview = {
      content: values.reviewContent,
      bathroom_id: bathroomId
    };
    dispatch(addReview(newReview));
    resetForm();
  };

  const handleDelete = (reviewId) => {
    dispatch(deleteReview(reviewId))
  };

  const handleEdit = (reviewId) => {
    setEditingReviewId(reviewId)
  };

  const handleUpdateReview = (reviewId, values) => {
    dispatch(updateReview({id: reviewId, review: { content: values.content}}))
    setEditingReviewId(null)
  }


  return (
    <div className="review">
      <h3>REVIEWS:</h3>
      <Formik
              initialValues={{ reviewContent: ''}}
              validationSchema={formSchema}
              onSubmit={handleAddReview}
      >
        {({isSubmitting})=> (
          <Form className="review-form">
            <Field placeholder="add a review" name="reviewContent" className="form-control"/>
            <ErrorMessage name="reviewContent" component="div" />
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <ul className="review-list">
        {reviewsForBathroom.map((review) => (
          <li key={review.id} className="review-item">
            {editingReviewId === review.id ? (
              <Formik
              initialValues={{ reviewContent: review.content}}
              validationSchema={yup.object().shape({
                reviewContent: yup.string().required('Review content is required')
              })}
              onSubmit={(values) => handleUpdateReview(review.id, {
                content: values.reviewContent
              })}
              >
                {({isSubmitting})=> (
                  <Form>
                    <Field name="reviewContent" className="form-control"/>
                    <ErrorMessage name="reviewContent" component="div" />
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                    Save Changes
                    </button>
                    <button onClick={() => setEditingReviewId(allReviews)} className="btn btn-primary">
                    Cancel
                    </button>
                  </Form>
                )}
              </Formik>
            ):(
            <>
                 <p>{review.content}</p>
                <button onClick={() => handleEdit(review.id)} className="btn">
                Edit
                </button>
                <button onClick={() => handleDelete(review.id)} className="btn">
                Delete
                </button>
            </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reviews;