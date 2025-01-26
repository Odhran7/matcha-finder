import React from "react";
import { useReviews } from "./hooks/useReviews";
import { useModal } from "@/app/contexts/Modal/ModalContext";
import AddReview from "./review/AddReview";

interface PlacepopupProps {
 id: string;
 name: string;
}

const PlacePopup = ({ id, name }: PlacepopupProps) => {
 const { openModal } = useModal();
 const reviews = useReviews({ id });

 return (
   <div>
     <h3>{name}</h3>

     {reviews.length === 0 ? (
       <p>No reviews yet</p>
     ) : (
       reviews.map((review, index) => (
         <p key={index}>{review.description}</p>
       ))
     )}

     <button className="bg-matchaGreen text-white p-2 rounded shadow-md cursor-pointer" onClick={() => openModal(<AddReview />)}>
       Add Review
     </button>
   </div>
 );
};

export default PlacePopup;
